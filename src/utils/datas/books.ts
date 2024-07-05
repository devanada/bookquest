import { IBook } from "@/utils/types/books";

export const sampleFeaturedBooks: IBook[] = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    featured: true,
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    category: "Fiction",
    description:
      "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It is a classic of modern American literature that has been widely read and acclaimed. The novel is set in the fictional Maycomb County in Alabama and tells the story of Scout Finch and her brother Jem growing up in the racially charged atmosphere of the American South during the 1930s.",
    cover_image:
      "http://res.cloudinary.com/hypeotesa/image/upload/v1699406533/kitchen-sink/jgpqif7vc5m5ko2niufi.jpg",
    createdAt: "2023-11-02T16:34:14.533Z",
    updatedAt: "2023-11-08T01:22:34.558Z",
    deletedAt: null,
  },
  {
    id: 3,
    title: "The Girl with the Dragon Tattoo",
    featured: true,
    author: "Stieg Larsson",
    isbn: "978-0-307-26911-7",
    category: "Mystery",
    description:
      "The Girl with the Dragon Tattoo is a psychological thriller novel by Swedish author and journalist Stieg Larsson. It is the first book in the Millennium series. The novel was published posthumously in 2005, after Larsson's death. The book features two main characters: Mikael Blomkvist, a journalist, and Lisbeth Salander, a hacker and investigator.",
    cover_image:
      "http://res.cloudinary.com/hypeotesa/image/upload/v1699407264/kitchen-sink/gzacqdrjmzym5tyankjc.jpg",
    createdAt: "2023-11-03T05:16:49.090Z",
    updatedAt: "2023-11-08T01:34:45.663Z",
    deletedAt: null,
  },
  {
    id: 5,
    title: "A Brief History of Time",
    featured: true,
    author: "Stephen Hawking",
    isbn: "978-0-553-10953-5",
    category: "Science",
    description:
      "A Brief History of Time is a popular science book by British physicist Stephen Hawking. The book is a concise, accessible exploration of some of the most profound questions about the universe, including the Big Bang, black holes, and the nature of time itself. It was first published in 1988 and has since become a best-seller and a landmark in the popular science genre.",
    cover_image:
      "http://res.cloudinary.com/hypeotesa/image/upload/v1699407819/kitchen-sink/mf8y2bnqy0lhmwnzj4p2.jpg",
    createdAt: "2023-11-03T05:17:44.344Z",
    updatedAt: "2023-11-08T01:44:00.990Z",
    deletedAt: null,
  },
];

export const sampleBooks: IBook[] = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    featured: true,
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    category: "Fiction",
    description:
      "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It is a classic of modern American literature that has been widely read and acclaimed. The novel is set in the fictional Maycomb County in Alabama and tells the story of Scout Finch and her brother Jem growing up in the racially charged atmosphere of the American South during the 1930s.",
    cover_image:
      "http://res.cloudinary.com/hypeotesa/image/upload/v1699406533/kitchen-sink/jgpqif7vc5m5ko2niufi.jpg",
    createdAt: "2023-11-02T16:34:14.533Z",
    updatedAt: "2023-11-08T01:22:34.558Z",
    deletedAt: null,
  },
  {
    id: 2,
    title: "The Hobbit",
    featured: false,
    author: "J.R.R. Tolkien",
    isbn: "978-0-261-10225-4",
    category: "Fantasy",
    description:
      "The Hobbit, or There and Back Again, is a fantasy novel by J.R.R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in children's literature.",
    cover_image:
      "http://res.cloudinary.com/hypeotesa/image/upload/v1699406709/kitchen-sink/o96epw2gdsxvm04co8gn.jpg",
    createdAt: "2023-11-03T05:12:20.926Z",
    updatedAt: "2023-11-08T01:25:34.168Z",
    deletedAt: null,
  },
  {
    id: 3,
    title: "The Girl with the Dragon Tattoo",
    featured: true,
    author: "Stieg Larsson",
    isbn: "978-0-307-26911-7",
    category: "Mystery",
    description:
      "The Girl with the Dragon Tattoo is a psychological thriller novel by Swedish author and journalist Stieg Larsson. It is the first book in the Millennium series. The novel was published posthumously in 2005, after Larsson's death. The book features two main characters: Mikael Blomkvist, a journalist, and Lisbeth Salander, a hacker and investigator.",
    cover_image:
      "http://res.cloudinary.com/hypeotesa/image/upload/v1699407264/kitchen-sink/gzacqdrjmzym5tyankjc.jpg",
    createdAt: "2023-11-03T05:16:49.090Z",
    updatedAt: "2023-11-08T01:34:45.663Z",
    deletedAt: null,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    featured: false,
    author: "Jane Austen",
    isbn: "978-0-486-48434-4",
    category: "Romance",
    description:
      "Pride and Prejudice is a romantic novel by Jane Austen. It was first published in 1813 as 'First Impressions' and later revised and published as 'Pride and Prejudice.' The novel follows the emotional development of the protagonist, Elizabeth Bennet, who learns the error of making hasty judgments and comes to appreciate the difference between the superficial and the essential.",
    cover_image:
      "http://res.cloudinary.com/hypeotesa/image/upload/v1699407633/kitchen-sink/zf6tni54zvyhp4qxn5vm.jpg",
    createdAt: "2023-11-03T05:17:15.829Z",
    updatedAt: "2023-11-08T01:40:54.618Z",
    deletedAt: null,
  },
  {
    id: 5,
    title: "A Brief History of Time",
    featured: true,
    author: "Stephen Hawking",
    isbn: "978-0-553-10953-5",
    category: "Science",
    description:
      "A Brief History of Time is a popular science book by British physicist Stephen Hawking. The book is a concise, accessible exploration of some of the most profound questions about the universe, including the Big Bang, black holes, and the nature of time itself. It was first published in 1988 and has since become a best-seller and a landmark in the popular science genre.",
    cover_image:
      "http://res.cloudinary.com/hypeotesa/image/upload/v1699407819/kitchen-sink/mf8y2bnqy0lhmwnzj4p2.jpg",
    createdAt: "2023-11-03T05:17:44.344Z",
    updatedAt: "2023-11-08T01:44:00.990Z",
    deletedAt: null,
  },
];
