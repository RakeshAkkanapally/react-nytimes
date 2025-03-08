import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter for testing
import App from "../App";
import "@testing-library/jest-dom";


// Mocking components for testing purposes
jest.mock("../components/ArticleList/ArticleList", () => {
  return {
    __esModule: true,
    default: () => <div>Article List Component</div>,
  };
});

jest.mock("../components/ArticleDetail/ArticleDetail", () => {
  return {
    __esModule: true,
    default: () => <div>Article Detail Component</div>,
  };
});

// Helper function to render the App component with MemoryRouter
const renderApp = (initialPath: string) => {
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  );
};

describe("App component", () => {
  it("should render ArticleList at the root route", () => {
    renderApp("/");  // Initial path is "/"

    expect(screen.getByText("Article List Component")).toBeInTheDocument();
  });

  it("should render ArticleDetail when navigating to /article/:id", () => {
    renderApp("/article/1");  // Simulate the path "/article/1"

    expect(screen.getByText(/Article Detail Component/i)).toBeInTheDocument();
  });
});
