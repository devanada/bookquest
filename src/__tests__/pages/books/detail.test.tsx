import "@testing-library/jest-dom";
import { Mocked, vi } from "vitest";

import { render, screen, within, act } from "@/__tests__/test-utils";

import App from "@/pages/books/detail";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { sampleBooks } from "@/utils/apis/books";
import { RoleType } from "@/utils/apis/users";
import * as token from "@/utils/contexts/token";

vi.mock("@/utils/apis/axiosWithConfig");
vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual("react-router-dom")) as object;
  return {
    ...actual,
    useParams: () => ({
      id: "1",
    }),
    useRouteMatch: () => ({ url: "/books/1" }),
  };
});

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;
const detailBook = sampleBooks[0];
const userData = {
  id: 3,
  full_name: "Test",
  email: "test@mail.com",
  role: "user" as RoleType,
  profile_picture: "image_url",
  address: "test",
  phone_number: "6282222222222",
};
const tokenData = {
  token: "accessToken",
  user: userData,
  changeToken: vi.fn(),
};

describe("Detail Page", () => {
  it("should render page and show data inside document when data fetch is resolved", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        message: "Book found.",
        payload: detailBook,
      },
    });

    await act(async () => {
      render(<App />);
    });

    const contentContainer = await screen.findByTestId("content-container");

    expect(
      within(contentContainer).queryByText(detailBook.title)
    ).toBeInTheDocument();
    expect(
      within(contentContainer).queryByText(`by ${detailBook.author}`)
    ).toBeInTheDocument();
    expect(
      within(contentContainer).queryByText(detailBook.category)
    ).toBeInTheDocument();
    expect(
      within(contentContainer).queryByText(detailBook.description)
    ).toBeInTheDocument();
  });

  it("should render 404 page when data fetch is rejected", async () => {
    mockedAxios.get.mockRejectedValueOnce({
      data: {
        message: "No book found.",
      },
    });

    await act(async () => {
      render(<App />);
    });

    const contentContainer = await screen.findByTestId("content-container");

    expect(
      within(contentContainer).queryByText(
        "Sorry, we were unable to find that page"
      )
    ).toBeInTheDocument();
  });

  describe("Action on Detail Page", async () => {
    beforeEach(async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          message: "Book found.",
          payload: detailBook,
        },
      });
    });

    it("should render borrow button when logged in", async () => {
      vi.spyOn(token, "useToken").mockReturnValue(tokenData);

      await act(async () => {
        render(<App />);
      });

      expect(screen.getByTestId("btn-borrow")).toBeInTheDocument();
    });

    it("should not render borrow button when not logged in", async () => {
      const emptyToken = { token: "", user: {}, changeToken: vi.fn() };
      vi.spyOn(token, "useToken").mockReturnValue(emptyToken);

      await act(async () => {
        render(<App />);
      });

      expect(screen.queryByTestId("btn-borrow")).not.toBeInTheDocument();
    });

    it("should not render borrow button when role is admin", async () => {
      const emptyToken = {
        token: "accessToken",
        user: { ...userData, role: "admin" as RoleType },
        changeToken: vi.fn(),
      };
      vi.spyOn(token, "useToken").mockReturnValue(emptyToken);

      await act(async () => {
        render(<App />);
      });

      expect(screen.queryByTestId("btn-borrow")).not.toBeInTheDocument();
    });
  });
});
