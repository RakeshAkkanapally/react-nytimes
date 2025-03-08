import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import useArticleDetails from "../../../hooks/useArticleDetails";
import ArticleList from "../ArticleList";

jest.mock("../../../hooks/useArticleDetails");

describe("ArticleList", () => {
  it("should show a loading spinner when articles are loading", () => {
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

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should display an error message if there's an error loading articles", () => {
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

    expect(screen.getByText(/Error loading articles/)).toBeInTheDocument();
  });

  it("should render the list of articles when data is available", async () => {
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

    await waitFor(() => screen.getByText(mockArticles[0].title));

    expect(screen.getByText(mockArticles[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockArticles[1].title)).toBeInTheDocument();
    expect(screen.getByText(mockArticles[2].title)).toBeInTheDocument();
  });

  it("should not render any articles when there are no articles", () => {
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

    expect(screen.queryByText(/Article/)).toBeNull();
  });
});
