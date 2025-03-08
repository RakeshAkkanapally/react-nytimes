import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // For testing react-router
import useArticleDetails from "../../../hooks/useArticleDetails";
import ArticleDetail from "../ArticleDetail";
import "@testing-library/jest-dom";


jest.mock("../../../hooks/useArticleDetails");

describe("ArticleDetail", () => {
  it("should display a loading spinner while data is loading", () => {
    (useArticleDetails as jest.Mock).mockReturnValue({
      article: null,
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <ArticleDetail />
      </MemoryRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should display an error message if there is an error loading the article", () => {
    (useArticleDetails as jest.Mock).mockReturnValue({
      article: null,
      isLoading: false,
      error: "Error loading article.",
    });

    render(
      <MemoryRouter>
        <ArticleDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(/Error loading article/)).toBeInTheDocument();
  });

  it("should display 'Article not found' if no article is available", () => {
    (useArticleDetails as jest.Mock).mockReturnValue({
      article: null,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <ArticleDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(/Article not found/)).toBeInTheDocument();
  });

  it("should display the article details when the article is available", async () => {
    const mockArticle = {
      title: "Test Article",
      abstract: "This is a test article.",
      imageUrl: "https://example.com/image.jpg",
      url: "https://example.com",
    };

    (useArticleDetails as jest.Mock).mockReturnValue({
      article: mockArticle,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <ArticleDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Read Full Article/ })).toHaveAttribute(
      "href",
      mockArticle.url
    );

    expect(screen.getByText("Back to List")).toBeInTheDocument();
  });

  it("should display the image if an imageUrl is provided", async () => {
    const mockArticle = {
      title: "Test Article",
      abstract: "This is a test article.",
      imageUrl: "https://example.com/image.jpg",
      url: "https://example.com",
    };

    (useArticleDetails as jest.Mock).mockReturnValue({
      article: mockArticle,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <ArticleDetail />
      </MemoryRouter>
    );

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockArticle.imageUrl);
  });
});
