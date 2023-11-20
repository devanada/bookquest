import { ReactNode, useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { postBorrow } from "@/utils/apis/borrows";
import useCartStore from "@/utils/state";

interface Props {
  children: ReactNode;
}

const Cart = (props: Props) => {
  const { children } = props;
  const carts = useCartStore((state) => state.cart);
  const deleteBook = useCartStore((state) => state.deleteBook);
  const removeCart = useCartStore((state) => state.removeCart);
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleTabClose = (event: BeforeUnloadEvent) => {
      if (carts.length > 0) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [carts]);

  async function onBorrow() {
    try {
      const body = {
        bookId: carts.map((cart) => cart.id),
        borrow_date: new Date().toISOString(),
      };

      const result = await postBorrow(body);
      toast({
        description: result.message,
      });
      removeCart();
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Due date is 7 days after you click borrow.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4 w-full overflow-auto">
          {carts.map((cart) => (
            <div className="flex gap-2 items-center" key={cart.id}>
              <img
                className="object-contain w-1/4 "
                src={cart.cover_image}
                alt={cart.title}
              />
              <p className="flex-grow">{cart.title}</p>
              <Trash2 onClick={() => deleteBook(cart)} />
            </div>
          ))}
          <Separator />
        </div>
        <SheetFooter>
          <Button
            onClick={() => onBorrow()}
            disabled={carts.length === 0}
            aria-disabled={carts.length === 0}
          >
            Borrow
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
