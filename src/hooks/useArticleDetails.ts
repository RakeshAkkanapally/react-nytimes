import { useParams } from "react-router-dom";
import { useGetArticlesQuery } from "../api/articlesApi";
import { useMemo } from "react";
import { Article } from "../types/types";


const useArticleDetails = () => {
  const { data, isLoading, error } = useGetArticlesQuery({});
  const { id } = useParams<{ id: string }>();

  // Ensure articles exist before filtering
  const articles: Article[] = useMemo(() => data?.articles ?? [], [data]);

  // Find a single article if an ID is provided
  const article = useMemo(() => {
    return id ? articles.find((a) => a.id.toString() === id) : null;
  }, [articles, id]);

  return { articles, article, isLoading, error };
};

export default useArticleDetails;
