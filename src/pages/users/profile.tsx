import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import BookCard from "@/components/book-card";
import Layout from "@/components/layout";
import { toast } from "@/components/ui/use-toast";

import { Book, getBooks } from "@/utils/apis/books";
import { useToken } from "@/utils/contexts/token";

const Profile = () => {
  const { user } = useToken();
  const [recentlyBorrow, setRecentlyBorrow] = useState<Book[]>([]);

  useEffect(() => {
    user.role === "user" && fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getBooks();
      setRecentlyBorrow(result.payload.datas);
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
      <div className="flex flex-col gap-4 items-center">
        <div className="w-60 h-60">
          <img
            className="aspect-square rounded-full object-cover"
            src={user.profile_picture}
            alt={`${user.full_name}'s profile picture`}
          />
        </div>
        <p className="font-bold text-2xl">{user.full_name}</p>
        <Button asChild>
          <Link to="/edit-profile">Edit Profile</Link>
        </Button>
      </div>
      <div className="flex justify-between my-9 w-full items-center">
        <p className="font-semibold text-lg tracking-wider">
          Recently Borrowed Book
        </p>
        <Link className="text-sm tracking-wide" to="/history-borrow">
          See more
        </Link>
      </div>
      <div className="flex gap-6">
        {recentlyBorrow.map((book) => (
          <BookCard key={book.id} data={book} navigate={`/books/${book.id}`} />
        ))}
      </div>
    </Layout>
  );
};

export default Profile;
