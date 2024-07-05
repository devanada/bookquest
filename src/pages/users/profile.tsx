import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BookCard, BookCardLoading } from "@/components/book-card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import { toast } from "@/components/ui/use-toast";

import { getBorrows } from "@/utils/apis/borrows";
import { useToken } from "@/utils/contexts/token";
import { IBorrow } from "@/utils/types/borrows";

const Profile = () => {
  const { user } = useToken();

  const [recentlyBorrow, setRecentlyBorrow] = useState<IBorrow[]>([]);
  const [isLoadingBorrows, setIsLoadingBorrows] = useState(true);

  useEffect(() => {
    user?.role === "user" && fetchData();
  }, [user]);

  async function fetchData() {
    setIsLoadingBorrows(true);
    try {
      const result = await getBorrows({ limit: 5 });
      setRecentlyBorrow(result.payload.datas);
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingBorrows(false);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col gap-4 items-center">
        <div className="w-60 h-60">
          <img
            className="aspect-square rounded-full object-cover"
            src={user?.profile_picture}
            alt={`${user?.full_name}'s profile picture`}
          />
        </div>
        <p className="font-bold text-2xl">{user?.full_name}</p>
        <Button asChild>
          <Link to="/edit-profile">Edit Profile</Link>
        </Button>
      </div>
      {user?.role === "user" ? (
        <>
          <div className="flex justify-between my-9 w-full items-center">
            <p className="font-semibold text-lg tracking-wider">
              Recently Borrowed Book
            </p>
            <Link className="text-sm tracking-wide" to="/history-borrow">
              See more
            </Link>
          </div>
          <div className="relative">
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {isLoadingBorrows
                  ? [...Array(5).keys()].map((key) => (
                      <BookCardLoading key={key} />
                    ))
                  : recentlyBorrow.map((borrow) => (
                      <BookCard
                        key={borrow.id}
                        data={borrow.book}
                        navigate={`/books/${borrow.book.id}`}
                      />
                    ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default Profile;
