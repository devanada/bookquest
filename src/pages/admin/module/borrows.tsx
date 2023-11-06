import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import { debounce } from "lodash";
import { format, parseISO } from "date-fns";

import { useToast } from "@/components/ui/use-toast";
import Pagination from "@/components/pagination";
import DataTable from "@/components/data-table";
import { Input } from "@/components/ui/input";
import Alert from "@/components/alert";
import AddEditBorrow from "./edit-borrow";

import {
  getBorrows,
  updateBorrow,
  deleteBorrow,
  Borrow,
  BorrowPayload,
} from "@/utils/apis/borrows";
import { Meta } from "@/utils/types/api";

const AdminBorrows = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [meta, setMeta] = useState<Meta>();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const getSuggestions = useCallback(
    async function (query: string) {
      if (!query) {
        searchParams.delete("query");
      } else {
        searchParams.set("query", query);
        searchParams.delete("page");
      }
      setSearchParams(searchParams);
    },
    [searchParams]
  );

  const columns = useMemo<ColumnDef<Borrow>[]>(
    () => [
      {
        header: "No",
        accessorKey: "id",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 50,
      },
      {
        header: "User",
        accessorKey: "user.full_name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Book",
        accessorKey: "book.title",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Borrow Date",
        accessorKey: "borrow_date",
        cell: (info) =>
          format(parseISO(info.getValue() as string), "iii, dd MMM yyyy"),
        footer: (props) => props.column.id,
      },
      {
        header: "Due Date",
        accessorKey: "due_date",
        cell: (info) =>
          format(parseISO(info.getValue() as string), "iii, dd MMM yyyy"),
        footer: (props) => props.column.id,
      },
      {
        header: "Return Date",
        accessorKey: "return_date",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "",
        accessorKey: "actionEdit",
        cell: (info) => (
          <AddEditBorrow
            editData={info.row.original}
            onSubmit={(data) => onSubmit(data, info.row.original.id)}
          >
            <Edit2 />
          </AddEditBorrow>
        ),
        footer: (props) => props.column.id,
        size: 50,
      },
      {
        header: "",
        accessorKey: "actionDelete",
        cell: (info) => (
          <Alert
            title="Are you sure?"
            description={`This action cannot be undone. This will permanently delete the borrow data.`}
            onAction={() => onDelete(info.row.original.id)}
          >
            <Trash2 />
          </Alert>
        ),
        footer: (props) => props.column.id,
        size: 50,
      },
    ],
    []
  );

  const getSuggestionsDebounce = useMemo(
    () => debounce(getSuggestions, 1000),
    [getSuggestions]
  );

  async function fetchData() {
    if (searchParams.get("tab") !== "books") {
      if (searchParams.has("query")) {
        setSearchValue(searchParams.get("query")!);
      }

      const query = Object.fromEntries(
        [...searchParams].filter((param) => param[0] !== "tab")
      );

      try {
        const result = await getBorrows({ ...query });
        const { datas, ...rest } = result.payload;
        setBorrows(datas);
        setMeta(rest);
      } catch (error: any) {
        toast({
          title: "Oops! Something went wrong.",
          description: error.toString(),
          variant: "destructive",
        });
      }
    }
  }

  async function onSubmit(data: BorrowPayload, id_borrow: number) {
    try {
      const result = await updateBorrow(data, id_borrow);
      toast({
        description: result.message,
      });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }

  async function onDelete(id_borrow: number) {
    try {
      const result = await deleteBorrow(String(id_borrow));
      toast({
        description: result.message,
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }

  function onInputChange(newValue: string) {
    setSearchValue(newValue);
    getSuggestionsDebounce(newValue);
  }

  function handlePagination(page: string | number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return (
    <>
      <div className="w-full flex justify-end">
        <div className="flex w-full max-w-sm space-x-2">
          <Input
            placeholder="Search"
            type="search"
            value={searchValue}
            onChange={(e) => onInputChange(e.currentTarget.value)}
          />
        </div>
      </div>
      <DataTable columns={columns} datas={borrows} />
      <Pagination
        meta={meta}
        onClickPrevious={() => handlePagination(meta?.currentPage! - 1)}
        onClickNext={() => handlePagination(meta?.currentPage! + 1)}
        onClickPage={(page) => handlePagination(page)}
      />
    </>
  );
};

export default AdminBorrows;
