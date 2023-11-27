import "@testing-library/jest-dom";
import { Mocked, vi } from "vitest";

import { render, screen, within, fireEvent, act } from "@/__tests__/test-utils";

import App from "@/pages/index";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { sampleBooks, sampleFeaturedBooks } from "@/utils/apis/books";

vi.mock("@/utils/apis/axiosWithConfig");

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;

describe("Index Page", () => {
  describe("Renders the page", () => {
    it("should render the books when fetch call is resolved", async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          message: "Books found.",
          payload: {
            totalItems: 5,
            datas: sampleBooks,
            totalPages: 1,
            currentPage: 1,
          },
        },
      });
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          message: "Books found.",
          payload: {
            totalItems: 3,
            datas: sampleFeaturedBooks,
            totalPages: 1,
            currentPage: 1,
          },
        },
      });
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          message: "Books found.",
          payload: {
            totalItems: 5,
            datas: sampleBooks,
            totalPages: 1,
            currentPage: 1,
          },
        },
      });

      await act(async () => {
        render(<App />);
      });

      const newSection = screen.getByTestId("new-books");
      const featuredSection = screen.getByTestId("featured-books");
      const otherSection = screen.getByTestId("other-books");

      expect(within(newSection).getAllByTestId("detail-new-book")).toHaveLength(
        sampleBooks.length
      );
      expect(
        within(featuredSection).getAllByTestId("detail-featured-book")
      ).toHaveLength(sampleFeaturedBooks.length);
      expect(
        within(otherSection).getAllByTestId("detail-other-book")
      ).toHaveLength(sampleBooks.length);
    });

    it("should failed to render the books when fetch call is rejected", async () => {
      mockedAxios.get.mockRejectedValueOnce({
        data: {
          message: "Book not found.",
        },
      });
      mockedAxios.get.mockRejectedValueOnce({
        data: {
          message: "Book not found.",
        },
      });
      mockedAxios.get.mockRejectedValueOnce({
        data: {
          message: "Book not found.",
        },
      });

      await act(async () => {
        render(<App />);
      });

      const newSection = screen.getByTestId("new-books");
      const featuredSection = screen.getByTestId("featured-books");
      const otherSection = screen.getByTestId("other-books");

      expect(
        within(newSection).queryAllByTestId("detail-new-book")
      ).toHaveLength(0);
      expect(
        within(featuredSection).queryAllByTestId("detail-featured-book")
      ).toHaveLength(0);
      expect(
        within(otherSection).queryAllByTestId("detail-other-book")
      ).toHaveLength(0);
    });
  });

  describe("Detail Book", () => {
    beforeEach(async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          message: "Books found.",
          payload: {
            totalItems: 5,
            datas: sampleBooks,
            totalPages: 1,
            currentPage: 1,
          },
        },
      });
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          message: "Books found.",
          payload: {
            totalItems: 3,
            datas: sampleFeaturedBooks,
            totalPages: 1,
            currentPage: 1,
          },
        },
      });
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          message: "Books found.",
          payload: {
            totalItems: 5,
            datas: sampleBooks,
            totalPages: 1,
            currentPage: 1,
          },
        },
      });

      await act(async () => {
        render(<App />);
      });
    });

    it("should navigate to selected book on new/other section when clicked", async () => {
      const newSection = screen.getByTestId("new-books");
      const selectedBook =
        within(newSection).getAllByTestId("detail-new-book")[0];

      expect(selectedBook).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(selectedBook);
      });
    });

    it("should navigate to selected book on featured section when clicked", async () => {
      const newSection = screen.getByTestId("featured-books");
      const selectedBook = within(newSection).getAllByTestId(
        "detail-featured-book"
      )[0];

      expect(selectedBook).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(selectedBook);
      });
    });
  });
});
