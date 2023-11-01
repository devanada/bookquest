import { Link } from "react-router-dom";

import BookCard from "@/components/book-card";
import Layout from "@/components/layout";

import { sampleBooks } from "@/utils/apis/books/sample-data";

const Home = () => {
  return (
    <Layout>
      <div className="min-h-[50vh] w-full bg-neutral-500">
        <p>Hero</p>
      </div>
      <div>
        <div className="flex justify-between my-9">
          <p>Popular</p>
          <Link to="/books?sort=Popular">Show all</Link>
        </div>
        <div className="flex gap-6">
          {sampleBooks.map((book) => (
            <BookCard
              key={book.id}
              data={book}
              navigate={`/books/${book.id}`}
            />
          ))}
        </div>
      </div>
      <div className="min-h-[40vh] w-full bg-neutral-500 my-9">
        <p>Featured book</p>
      </div>
      <div>
        <div className="flex justify-between my-9">
          <p>New Release Books</p>
          <Link to="/books?sort=New">Show all</Link>
        </div>
        <div className="flex gap-6">
          {sampleBooks.map((book) => (
            <BookCard
              key={book.id}
              data={book}
              navigate={`/books/${book.id}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Home;
