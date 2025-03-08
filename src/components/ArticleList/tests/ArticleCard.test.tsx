import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ArticleCard from "../ArticleCard";
import { Article } from "../../../types/types";
import "@testing-library/jest-dom";


const mockArticle: Article = {
  id: 1,
  title: "Test Article Title",
  abstract: "This is an abstract of the test article.",
  imageUrl: "https://via.placeholder.com/150", 
  url: "https://example.com", 
};

describe("ArticleCard", () => {
  it("should render the article's title and abstract", () => {
    render(
      <MemoryRouter>
        <ArticleCard article={mockArticle} />
      </MemoryRouter>
    );

    // Check that title and abstract are displayed
    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();
  });

  it("should display the article's image if imageUrl exists", () => {
    render(
      <MemoryRouter>
        <ArticleCard article={mockArticle} />
      </MemoryRouter>
    );

    // Check if the image is rendered
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockArticle.imageUrl);
    expect(image).toHaveAttribute("alt", mockArticle.title);
  });

  it("should not render an image if imageUrl is not provided", () => {
    // Create an article without an imageUrl
    const articleWithoutImage: Article = {
      ...mockArticle,
      imageUrl: "",
    };

    render(
      <MemoryRouter>
        <ArticleCard article={articleWithoutImage} />
      </MemoryRouter>
    );

    // Check that the image element is not in the document
    const image = screen.queryByRole("img");
    expect(image).not.toBeInTheDocument();
  });

  it("should render a link to the article page when 'Read More' is clicked", () => {
    render(
      <MemoryRouter>
        <ArticleCard article={mockArticle} />
      </MemoryRouter>
    );

    // Check that the "Read More" button has the correct link
    const readMoreButton = screen.getByRole("link", {
      name: /read more/i,
    });
    expect(readMoreButton).toHaveAttribute("href", `/article/${mockArticle.id}`);
  });
  
});
