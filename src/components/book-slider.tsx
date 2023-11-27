import { Link } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";

import { Book } from "@/utils/apis/books";

interface Props {
  book: Book;
  "data-testid"?: string;
}

export const BookSlider = (props: Props) => {
  const { book } = props;
  return (
    <Link
      className={`min-w-full min-h-full flex items-center md:p-3 snap-start md:bg-gradient-to-r md:dark:bg-gradient-to-r md:from-neutral-50 md:dark:from-neutral-800 md:from-5% md:via-white md:dark:via-black md:to-neutral-50 md:dark:to-neutral-800 md:to-95% bg-[url(${book.cover_image})] bg-no-repeat bg-cover bg-center gap-3`}
      to={`/books/${book.id}`}
      data-testid={props["data-testid"]}
    >
      <img
        className="object-contain aspect-[3/4] hidden md:block w-48 md:w-56 lg:w-64"
        src={book.cover_image}
        alt={book.title}
      />
      <div className="w-full h-full flex flex-col justify-center gap-1 p-3 md:p-0 bg-white/50 dark:bg-black/50 md:bg-transparent md:dark:bg-transparent">
        <p className="font-bold text-lg tracking-wide text-center md:text-left">
          {book.title}
        </p>
        <p className="text-muted-foreground text-sm text-center md:text-left">
          by {book.author}
        </p>
      </div>
    </Link>
  );
};

export const BookSliderLoading = () => {
  return (
    <div className="min-w-full min-h-full flex items-center md:p-3 snap-start md:bg-gradient-to-r md:dark:bg-gradient-to-r md:from-neutral-50 md:dark:from-neutral-800 md:from-5% md:via-white md:dark:via-black md:to-neutral-50 md:dark:to-neutral-800 md:to-95% gap-3">
      <Skeleton className="w-48 md:w-56 lg:w-64 h-[17rem]" />
      <div className="w-full h-full flex flex-col justify-center gap-1 p-3 md:p-0 bg-white/50 dark:bg-black/50 md:bg-transparent md:dark:bg-transparent">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-64" />
      </div>
    </div>
  );
};
