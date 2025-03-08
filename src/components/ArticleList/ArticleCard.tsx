import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Article } from "../../types/types";

interface Props {
  article: Article;
}

const ArticleCard: React.FC<Props> = ({ article }) => {
  return (
    <Card className="shadow-lg rounded-lg">
      {article.imageUrl && (
        <CardMedia
          component="img"
          image={article.imageUrl}
          alt={article.title}
        />
      )}
      <CardContent>
        <Typography variant="h6" className="line-clamp-1">
          {article.title}
        </Typography>
        <Typography
          variant="body2"
          className="text-gray-600 line-clamp-1"
          noWrap
        >
          {article.abstract}
        </Typography>
        <Button
          component={Link}
          to={`/article/${article.id}`}
          variant="contained"
          className="mt-4"
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
