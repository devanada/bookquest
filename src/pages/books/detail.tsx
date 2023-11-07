import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import { useToast } from "@/components/ui/use-toast";

import { Book, getDetailBook } from "@/utils/apis/books";
import useCartStore from "@/utils/state";
import { useToken } from "@/utils/contexts/token";

const DetailBook = () => {
  const { user } = useToken();
  const carts = useCartStore((state) => state.cart);
  const addBook = useCartStore((state) => state.addBook);
  const params = useParams();
  const { toast } = useToast();

  const [book, setBook] = useState<Book>();

  const isInCart = useMemo(() => {
    const checkCart = carts.find((cart) => cart.id === +params.id_book!);

    if (checkCart) return true;

    return false;
  }, [carts]);

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

  function onClickBorrow() {
    toast({
      description: "Book has been added to cart.",
    });
    addBook(book!);
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row w-full h-full py-6 px-3 gap-5">
        <img
          className="object-contain aspect-[3/4]"
          src={book?.cover_image}
          alt={book?.title}
        />
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-2xl tracking-wide">{book?.title}</p>
            <p className="font-light text-sm text-muted-foreground">
              by {book?.author}
            </p>
            <Link className={`${badgeVariants()} w-fit`} to={"/"}>
              {book?.category}
            </Link>
          </div>
          <Separator className="my-4" />
          <div className="flex-grow">
            <p>{book?.description}</p>
          </div>
          {user.role === "user" && (
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onClickBorrow()}
                disabled={isInCart}
              >
                {isInCart ? "In Cart" : "Borrow"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DetailBook;
