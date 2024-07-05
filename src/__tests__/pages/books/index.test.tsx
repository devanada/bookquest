import "@testing-library/jest-dom";
import { Mocked, vi } from "vitest";

import { render, screen, within, act } from "@/__tests__/test-utils";

import App from "@/pages/books";
import axiosWithConfig from "@/utils/apis/axios-with-config";
import { sampleBooks } from "@/utils/datas/books";

vi.mock("@/utils/apis/axiosWithConfig");

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;

describe("Index Page", () => {
  describe("Render page", () => {
    it("should render page and show list of books when fetch is resolved", async () => {
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

      expect(
        within(screen.getByTestId("books-container")).getAllByTestId(
          "detail-book"
        )
      ).toHaveLength(sampleBooks.length);
    });

    it("should render page and show error toast when fetch is rejected", async () => {
      mockedAxios.get.mockRejectedValueOnce({
        data: {
          message: "No books found.",
        },
      });

      await act(async () => {
        render(<App />);
      });

      expect(
        within(screen.getByTestId("books-container")).queryByTestId(
          "detail-book"
        )
      ).not.toBeInTheDocument();
    });
  });
});
