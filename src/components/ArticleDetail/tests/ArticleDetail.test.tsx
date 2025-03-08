import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // For testing react-router
import useArticleDetails from "../../../hooks/useArticleDetails";
import ArticleDetail from "../ArticleDetail";
import "@testing-library/jest-dom";


// Mock the custom hook to control the returned values for the tests
jest.mock("../../../hooks/useArticleDetails");

describe("ArticleDetail", () => {
  it("should display a loading spinner while data is loading", () => {
    // Mock the hook to return loading state
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

    // Expect to find the CircularProgress component (spinner)
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should display an error message if there is an error loading the article", () => {
    // Mock the hook to return error state
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

    // Expect to find the error message
    expect(screen.getByText(/Error loading article/)).toBeInTheDocument();
  });

  it("should display 'Article not found' if no article is available", () => {
    // Mock the hook to return no article
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

    // Expect to find the 'Article not found' message
    expect(screen.getByText(/Article not found/)).toBeInTheDocument();
  });

  it("should display the article details when the article is available", async () => {
    const mockArticle = {
      title: "Test Article",
      abstract: "This is a test article.",
      imageUrl: "https://example.com/image.jpg",
      url: "https://example.com",
    };

    // Mock the hook to return a valid article
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

    // Expect to find the article title, abstract, and buttons
    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();

    // Check if the Read Full Article button is present and has the correct href
    expect(screen.getByRole("link", { name: /Read Full Article/ })).toHaveAttribute(
      "href",
      mockArticle.url
    );

    // Check if the Back to List button is present
    expect(screen.getByText("Back to List")).toBeInTheDocument();
  });

  it("should display the image if an imageUrl is provided", async () => {
    const mockArticle = {
      title: "Test Article",
      abstract: "This is a test article.",
      imageUrl: "https://example.com/image.jpg",
      url: "https://example.com",
    };

    // Mock the hook to return a valid article
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

    // Expect to find the image with the correct src
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockArticle.imageUrl);
  });
});
