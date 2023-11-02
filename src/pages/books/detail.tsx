import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "@/components/layout";
import { useToast } from "@/components/ui/use-toast";

import { Books, getDetailBook } from "@/utils/apis/books";

const DetailBook = () => {
  const params = useParams();
  const { toast } = useToast();

  const [book, setBook] = useState<Partial<Books>>({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getDetailBook({ path: params.id_book as string });
      setBook(result);
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
      <p>Detail Book</p>
      <p>{book?.title}</p>
    </Layout>
  );
};

export default DetailBook;
