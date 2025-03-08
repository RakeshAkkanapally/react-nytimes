import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticleResponse, NormalizedArticleResponse } from "../types/types";

const NYTIMES_API_KEY = "kir26BlZfiFoLIrebLck2gSo1xWEDAee";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.nytimes.com/svc/mostpopular/v2/" }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => `viewed/7.json?api-key=${NYTIMES_API_KEY}`,
      
      transformResponse: (response: ArticleResponse | null): NormalizedArticleResponse => {
        // Ensure response is not null and contains `results`
        if (!response || !Array.isArray(response.results)) {
          return { articles: [] };  // Return an empty array instead of throwing an error
        }

        return {
          articles: response.results.map((article) => ({
            id: article.id,
            title: article.title,
            abstract: article.abstract,
            url: article.url,
            imageUrl: article.media?.[0]?.["media-metadata"]?.[2]?.url || "",
          })),
        };
      },
    }),
  }),
});

export const { useGetArticlesQuery } = articlesApi;
