import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Pagination from "@/components/pagination";
import { BookCard, BookCardLoading } from "@/components/book-card";
import Layout from "@/components/layout";

import { Book, getBooks } from "@/utils/apis/books";
import { Meta } from "@/utils/types/api";

const AllBook = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [meta, setMeta] = useState<Meta>();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  async function fetchData() {
    setIsLoadingBooks(true);
    let query: { [key: string]: string } = {};
    for (const entry of searchParams.entries()) {
      query[entry[0]] = entry[1];
    }

    try {
      const result = await getBooks({ ...query });
      const { datas, ...rest } = result.payload;
      setBooks(datas);
      setMeta(rest);
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingBooks(false);
    }
  }

  function handlePrevNextPage(page: string | number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  function handleChangeSort(value: string) {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  }

  return (
    <Layout>
      <div className="flex justify-end">
        <Select
          onValueChange={(value) => handleChangeSort(value)}
          data-testid="sort-by"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="default">Default</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center"
        data-testid="books-container"
      >
        {isLoadingBooks
          ? [...Array(10).keys()].map((key) => <BookCardLoading key={key} />)
          : books.map((book) => (
              <BookCard
                key={book.id}
                data={book}
                navigate={`/books/${book.id}`}
                data-testid="detail-book"
              />
            ))}
      </div>
      <Pagination
        meta={meta}
        onClickPrevious={() => handlePrevNextPage(meta?.currentPage! - 1)}
        onClickNext={() => handlePrevNextPage(meta?.currentPage! + 1)}
        onClickPage={(page) => handlePrevNextPage(page)}
      />
    </Layout>
  );
};

export default AllBook;
