import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { buttonVariants } from "@/components/ui/button";
import BookCard from "@/components/book-card";
import Layout from "@/components/layout";
import { toast } from "@/components/ui/use-toast";

import { Book, getBooks } from "@/utils/apis/books";
import RiveWrapper from "@/components/rive";

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [popularBooks, setPopularBooks] = useState<Book[]>([]);
  const [newBooks, setNewBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchPopularBooks();
    fetchNewBooks();
    fetchFeaturedBooks();
  }, []);

  async function fetchNewBooks() {
    try {
      const result = await getBooks({ sort: "new", limit: 5 });
      setNewBooks(result.payload.datas);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  async function fetchFeaturedBooks() {
    try {
      const result = await getBooks({ filter: "featured", limit: 5 });
      setFeaturedBooks(result.payload.datas);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  async function fetchPopularBooks() {
    try {
      const result = await getBooks({ limit: 5 });
      setPopularBooks(result.payload.datas);
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
      <section className="w-full py-12 h-[50vh] px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
        <div className="w-full h-full flex flex-col justify-center space-y-4 order-1 md:order-none">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Welcome to BookQuest
            </h1>
            <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400">
              Discover and borrow thousands of books at your fingertips.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link className={buttonVariants()} to="/books">
              Get Started
            </Link>
          </div>
        </div>
        <div className="w-full h-full hidden md:block">
          <RiveWrapper />
        </div>
      </section>
      <div className="flex justify-between my-9 w-full h-fit items-center">
        <p className="font-semibold text-lg tracking-wider">
          New Release Books
        </p>
        <Link className="text-sm tracking-wide" to="/books?sort=new">
          Show all
        </Link>
      </div>
      <div className="relative w-full h-fit">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {newBooks.map((book) => (
              <BookCard
                key={book.id}
                data={book}
                navigate={`/books/${book.id}`}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="relative min-h-[40vh] w-full my-9 overflow-auto">
        <div className="flex w-full h-full snap-x relative snap-mandatory overflow-x-auto">
          {featuredBooks.map((book) => (
            <Link
              key={book.id}
              className={`min-w-full min-h-full flex items-center md:p-3 snap-start md:bg-gradient-to-r md:dark:bg-gradient-to-r md:from-neutral-50 md:dark:from-neutral-800 md:from-5% md:via-white md:dark:via-black md:to-neutral-50 md:dark:to-neutral-800 md:to-95% bg-[url(${book.cover_image})] bg-no-repeat bg-cover bg-center`}
              to={`/books/${book.id}`}
            >
              <img
                className="object-contain aspect-[3/4] hidden md:block"
                src={book.cover_image}
                alt={book.title}
              />
              <div className="w-full h-full flex flex-col justify-center gap-1 p-3 md:p-0 bg-white/50 dark:bg-black/50 md:bg-transparent md:dark:bg-transparent">
                <p className="font-bold text-lg tracking-wide text-center md:text-left">
                  {book.title}
                </p>
                <p className="text-muted-foreground text-sm text-center md:text-left">
                  by {book.author}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-between my-9 w-full h-fit items-center">
        <p className="font-semibold text-lg tracking-wider">Others</p>
        <Link className="text-sm tracking-wide" to="/books">
          Show all
        </Link>
      </div>
      <div className="relative w-full h-fit">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {popularBooks.map((book) => (
              <BookCard
                key={book.id}
                data={book}
                navigate={`/books/${book.id}`}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </Layout>
  );
};
export default Home;
