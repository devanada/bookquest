import { Link } from "react-router-dom";

import { Books } from "@/utils/apis/books/types";

export interface BookCardProps {
  data: Books;
  navigate: string;
}

const BookCard = (props: BookCardProps) => {
  const { data, navigate } = props;
  return (
    <Link
      className="flex flex-col p-4 w-fit h-fit items-center gap-3"
      to={navigate}
    >
      <figure className="shadow-md shadow-neutral-300">
        <img
          className="aspect-[3/4] object-cover"
          src={data.cover_image}
          alt={data.title}
        />
      </figure>
      <p className="font-bold text-lg tracking-wide">{data.title}</p>
      <p className="text-neutral-400 text-sm">{data.author}</p>
    </Link>
  );
};

export default BookCard;
