import { Grid, CircularProgress, Box } from "@mui/material";
import ArticleCard from "./ArticleCard";
import { Article } from "../../types/types";
import useArticleDetails from "../../hooks/useArticleDetails";

const ArticleList = () => {
  const { articles, isLoading, error } = useArticleDetails();

  if (isLoading)
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );

  if (error) return <p className="text-center text-red-500">Error loading articles.</p>;

  return (
    <Grid container spacing={4} className="mt-6">
      {articles.map((article: Article) => (
        <Grid item xs={12} sm={6} md={4} key={article.id}>
          <ArticleCard article={article} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ArticleList;
