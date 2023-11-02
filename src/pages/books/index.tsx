import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import BookCard from "@/components/book-card";
import Layout from "@/components/layout";

import { Book, getBooks } from "@/utils/apis/books";

const AllBook = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    console.log(searchParams.get("sort"));
    try {
      const result = await getBooks({});
      setBooks(result);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <div className="grid grid-cols-5 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} data={book} navigate={`/books/${book.id}`} />
        ))}
      </div>
    </Layout>
  );
};

export default AllBook;
