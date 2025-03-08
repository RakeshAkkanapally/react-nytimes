import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import useArticleDetails from "../../../hooks/useArticleDetails";
import ArticleList from "../ArticleList";

// Mock the useArticleDetails hook
jest.mock("../../../hooks/useArticleDetails");

describe("ArticleList", () => {
  it("should show a loading spinner when articles are loading", () => {
    // Mock the hook to return isLoading as true
    (useArticleDetails as jest.Mock).mockReturnValue({
      articles: [],
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <ArticleList />
      </MemoryRouter>
    );

    // Expect CircularProgress to be rendered
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should display an error message if there's an error loading articles", () => {
    // Mock the hook to return an error
    (useArticleDetails as jest.Mock).mockReturnValue({
      articles: [],
      isLoading: false,
      error: "Error loading articles.",
    });

    render(
      <MemoryRouter>
        <ArticleList />
      </MemoryRouter>
    );

    // Expect error message to be displayed
    expect(screen.getByText(/Error loading articles/)).toBeInTheDocument();
  });

  it("should render the list of articles when data is available", async () => {
    // Mock the hook to return some articles
    const mockArticles = [
      { id: 1, title: "Article 1", abstract: "Abstract 1" },
      { id: 2, title: "Article 2", abstract: "Abstract 2" },
      { id: 3, title: "Article 3", abstract: "Abstract 3" },
    ];

    (useArticleDetails as jest.Mock).mockReturnValue({
      articles: mockArticles,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <ArticleList />
      </MemoryRouter>
    );

    // Wait for articles to be rendered
    await waitFor(() => screen.getByText(mockArticles[0].title));

    // Check that all articles are rendered
    expect(screen.getByText(mockArticles[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockArticles[1].title)).toBeInTheDocument();
    expect(screen.getByText(mockArticles[2].title)).toBeInTheDocument();
  });

  it("should not render any articles when there are no articles", () => {
    // Mock the hook to return an empty list of articles
    (useArticleDetails as jest.Mock).mockReturnValue({
      articles: [],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <ArticleList />
      </MemoryRouter>
    );

    // Check that no articles are rendered
    expect(screen.queryByText(/Article/)).toBeNull();
  });
});
