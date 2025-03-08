import { Container, Typography, Button, Card, CardContent, CardMedia, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import useArticleDetails from "../../hooks/useArticleDetails";

const ArticleDetail = () => {
  const { article, isLoading, error } = useArticleDetails();

   if (isLoading)
      return (
        <Box className="flex justify-center items-center h-screen">
          <CircularProgress />
        </Box>
      );  
  if (error) return <Typography variant="h5" color="error">Error loading article.</Typography>;
  if (!article) return <Typography variant="h5">Article not found.</Typography>;

  return (
    <Container className="mt-10">
      <Card className="mx-auto shadow-lg rounded-lg">
        {article.imageUrl && <CardMedia component="img" 
        image={article.imageUrl} />}
        <CardContent>
          <Typography variant="h4">{article.title}</Typography>
          <Typography variant="body1" className="text-gray-600 mt-2">{article.abstract}</Typography>
          <Button variant="contained" href={article.url} target="_blank" className="mt-4">
            Read Full Article
          </Button>
          <Button variant="outlined" component={Link} to="/" className="py-8">
            Back to List
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ArticleDetail;
