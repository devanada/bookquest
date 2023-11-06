import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import { debounce } from "lodash";

import { useToast } from "@/components/ui/use-toast";
import Pagination from "@/components/pagination";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Alert from "@/components/alert";
import AddEditBook from "./add-edit-book";

import {
  Book,
  BookSchema,
  addBook,
  deleteBook,
  getBooks,
  updateBook,
} from "@/utils/apis/books";
import { Meta } from "@/utils/types/api";

const AdminBooks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  const [books, setBooks] = useState<Book[]>([]);
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

  const columns = useMemo<ColumnDef<Book>[]>(
    () => [
      {
        header: "No",
        accessorKey: "id",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 50,
      },
      {
        header: "Title",
        accessorKey: "title",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Author",
        accessorKey: "author",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Category",
        accessorKey: "category",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "ISBN",
        accessorKey: "isbn",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Featured",
        accessorKey: "featured",
        cell: (info) => String(info.getValue()),
        footer: (props) => props.column.id,
        size: 80,
      },
      {
        header: "",
        accessorKey: "actionEdit",
        cell: (info) => (
          <AddEditBook
            editData={info.row.original}
            onSubmit={(data) => onSubmit(data, info.row.original.id)}
          >
            <Edit2 />
          </AddEditBook>
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
            description={`This action cannot be undone. This will permanently delete "${info.row.original.title}".`}
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
    if (searchParams.get("tab") !== "borrows") {
      if (searchParams.has("query")) {
        setSearchValue(searchParams.get("query")!);
      }

      const query = Object.fromEntries(
        [...searchParams].filter((param) => param[0] !== "tab")
      );

      try {
        const result = await getBooks({ ...query });
        const { datas, ...rest } = result.payload;
        setBooks(datas);
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

  async function onSubmit(data: BookSchema, id_book?: number) {
    try {
      const result = id_book
        ? await updateBook(data, id_book)
        : await addBook(data);
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

  async function onDelete(id_book: number) {
    try {
      const result = await deleteBook(String(id_book));
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
          <AddEditBook onSubmit={(data) => onSubmit(data)}>
            <Button>Add</Button>
          </AddEditBook>
        </div>
      </div>
      <DataTable columns={columns} datas={books} />
      <Pagination
        meta={meta}
        onClickPrevious={() => handlePagination(meta?.currentPage! - 1)}
        onClickNext={() => handlePagination(meta?.currentPage! + 1)}
        onClickPage={(page) => handlePagination(page)}
      />
    </>
  );
};

export default AdminBooks;
