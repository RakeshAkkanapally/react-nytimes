import { articlesApi } from "../articlesApi";
import { renderHook, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { Provider } from "react-redux";
import type { ReactNode } from "react";
import { configureStore } from "@reduxjs/toolkit";

const createTestStore = () =>
  configureStore({
    reducer: { [articlesApi.reducerPath]: articlesApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(articlesApi.middleware),
  });

describe("articlesApi", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    fetchMock.mockClear();
  });


  it("fetches and transforms articles successfully", async () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          title: "Mocked Article",
          abstract: "Test description.",
          url: "https://example.com",
          media: [
            {
              "media-metadata": [{}, {}, { url: "https://example.com/image.jpg" }],
            },
          ],
        },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const store = createTestStore();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => articlesApi.useGetArticlesQuery({}), { wrapper });

    expect(result.current.isLoading).toBe(true);
    
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(result.current.data).toEqual({
      articles: [
        {
          id: 1,
          title: "Mocked Article",
          abstract: "Test description.",
          url: "https://example.com",
          imageUrl: "https://example.com/image.jpg",
        },
      ],
    });
  });

  it("handles API failure correctly", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    const store = createTestStore();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => articlesApi.useGetArticlesQuery({}), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(result.current.error).toBeDefined();
    expect(result.current.error).toHaveProperty("status", 500);
  });

  it("handles missing media correctly", async () => {
    const mockResponseWithoutMedia = {
      results: [
        {
          id: 2,
          title: "Article Without Media",
          abstract: "No image available.",
          url: "https://example.com/article",
          media: [],
        },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponseWithoutMedia));

    const store = createTestStore();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => articlesApi.useGetArticlesQuery({}), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      articles: [
        {
          id: 2,
          title: "Article Without Media",
          abstract: "No image available.",
          url: "https://example.com/article",
          imageUrl: "",
        },
      ],
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("handles missing results array in response", async () => {
    const mockResponseWithoutResults = { results: undefined }; 
  
    fetchMock.mockResponseOnce(JSON.stringify(mockResponseWithoutResults));
  
    const store = createTestStore();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );
  
    const { result } = renderHook(() => articlesApi.useGetArticlesQuery({}), { wrapper });
  
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
    expect(result.current.data).toEqual({
      articles: [], 
    });
  
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("handles missing media field in API response", async () => {
    const mockResponseWithoutMedia = {
      results: [
        {
          id: "1",
          title: "Article without media",
          abstract: "No media present",
          url: "https://example.com",
        },
      ],
    };
  
    fetchMock.mockResponseOnce(JSON.stringify(mockResponseWithoutMedia));
  
    const store = createTestStore();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );
  
    const { result } = renderHook(() => articlesApi.useGetArticlesQuery({}), { wrapper });
  
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
    expect(result?.current?.data?.articles[0].imageUrl).toBe(""); 
  });
  
});
