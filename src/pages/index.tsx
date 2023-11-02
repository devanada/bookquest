import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BookCard from "@/components/book-card";
import Layout from "@/components/layout";
import { toast } from "@/components/ui/use-toast";

import { Book, getBooks } from "@/utils/apis/books";

const Home = () => {
  const [popularBooks, setPopularBooks] = useState<Book[]>([]);
  const [newBooks, setNewBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchPopularBooks();
    fetchNewBooks();
  }, []);

  async function fetchPopularBooks() {
    try {
      const result = await getBooks({});
      setPopularBooks(result);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  async function fetchNewBooks() {
    try {
      const result = await getBooks({});
      setNewBooks(result);
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
      <div className="min-h-[50vh] w-full bg-neutral-500">
        <p>Hero</p>
      </div>
      <div className="flex justify-between my-9 w-full items-center">
        <p className="font-semibold text-lg tracking-wider">Popular</p>
        <Link className="text-sm tracking-wide" to="/books?sort=Popular">
          Show all
        </Link>
      </div>
      <div className="flex gap-6">
        {popularBooks.map((book) => (
          <BookCard key={book.id} data={book} navigate={`/books/${book.id}`} />
        ))}
      </div>
      <div className="min-h-[40vh] w-full bg-neutral-500 my-9">
        <p>Featured book</p>
      </div>
      <div className="flex justify-between my-9 w-full">
        <p className="font-semibold text-lg tracking-wider">
          New Release Books
        </p>
        <Link className="text-sm tracking-wide" to="/books?sort=New">
          Show all
        </Link>
      </div>
      <div className="flex gap-6">
        {newBooks.map((book) => (
          <BookCard key={book.id} data={book} navigate={`/books/${book.id}`} />
        ))}
      </div>
    </Layout>
  );
};
export default Home;
