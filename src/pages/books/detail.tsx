import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Separator } from "@/components/ui/separator";
import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import { useToast } from "@/components/ui/use-toast";

import { Book, getDetailBook } from "@/utils/apis/books";

const DetailBook = () => {
  const params = useParams();
  const { toast } = useToast();

  const [book, setBook] = useState<Partial<Book>>({});

  useEffect(() => {
    fetchData();
  }, [params]);

  async function fetchData() {
    try {
      const result = await getDetailBook(params.id_book!);
      setBook(result.payload);
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
      <div className="flex w-full h-full py-6 px-3 gap-5">
        <img
          className="object-contain aspect-[3/4]"
          src={book?.cover_image}
          alt={book?.title}
        />
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-2xl tracking-wide">{book?.title}</p>
            <p className="font-light text-sm">by {book?.author}</p>
            <Link className={`${badgeVariants()} w-fit`} to={"/"}>
              {book?.category}
            </Link>
          </div>
          <Separator className="my-4" />
          <div className="flex-grow">
            <p>{book?.description}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Borrow</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailBook;
