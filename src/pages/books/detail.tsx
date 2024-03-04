import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import NotFound from "@/pages/404";
import { Separator } from "@/components/ui/separator";
import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import { useToast } from "@/components/ui/use-toast";

import { Book, getDetailBook } from "@/utils/apis/books";
import { useToken } from "@/utils/contexts/token";
import useCartStore from "@/utils/state";

const DetailBook = () => {
  const addBook = useCartStore((state) => state.addBook);
  const carts = useCartStore((state) => state.cart);
  const { toast } = useToast();
  const { user } = useToken();
  const params = useParams();

  const [book, setBook] = useState<Book>();
  const [isError, setIsError] = useState(false);

  const isInCart = useMemo(() => {
    const checkCart = carts.find((cart) => cart.id === +params.id_book!);

    if (checkCart) return true;

    return false;
  }, [carts]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { payload } = await getDetailBook(params.id_book!);
      setBook(payload);
    } catch (error) {
      setIsError(true);
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
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

  if (isError) {
    return <NotFound />;
  }
  return (
    <Layout>
      <div className="flex flex-col md:flex-row w-full h-full py-6 px-3 gap-5 items-center">
        <img
          className="object-contain aspect-[3/4] w-52 md:w-64 lg:w-96"
          src={book?.cover_image}
          alt={book?.title}
        />
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-2xl tracking-wide">{book?.title}</p>
            <p className="font-light text-sm text-muted-foreground">
              by {book?.author}
            </p>
            <Link
              className={`${badgeVariants()} w-fit`}
              to={"/"}
              data-testid={book?.category}
            >
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
                data-testid="btn-borrow"
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
