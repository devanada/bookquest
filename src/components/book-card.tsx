import { Link } from "react-router-dom";

import { Book } from "@/utils/apis/books/types";

export interface BookCardProps {
  data: Book;
  navigate: string;
}

const BookCard = (props: BookCardProps) => {
  const { data, navigate } = props;
  return (
    <Link
      className="flex flex-col p-4 w-48 md:w-56 lg:w-64 h-fit items-center gap-3"
      to={navigate}
    >
      <figure className="overflow-hidden shadow-md shadow-neutral-300">
        <img
          className="h-auto w-auto object-cover aspect-[3/4]"
          src={data.cover_image}
          alt={data.title}
          width={250}
          height={330}
        />
      </figure>
      <p className="font-bold text-lg tracking-wide text-center">
        {data.title}
      </p>
      <p className="text-muted-foreground text-sm text-center">{data.author}</p>
    </Link>
  );
};

export default BookCard;
