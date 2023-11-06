import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import Pagination from "@/components/pagination";
import BookCard from "@/components/book-card";
import Layout from "@/components/layout";

import { Book, getBooks } from "@/utils/apis/books";
import { Meta } from "@/utils/types/api";

const AllBook = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  const [books, setBooks] = useState<Book[]>([]);
  const [meta, setMeta] = useState<Meta>();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  async function fetchData() {
    let query: { [key: string]: string } = {};
    for (const entry of searchParams.entries()) {
      query[entry[0]] = entry[1];
    }

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

  function handlePrevNextPage(page: string | number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
        {books.map((book) => (
          <BookCard key={book.id} data={book} navigate={`/books/${book.id}`} />
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
