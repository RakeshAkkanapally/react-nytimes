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
    <div className="shadow-lg rounded-lg">
    <Card sx={{ height: '460px' }}>
      {article.imageUrl && (
        <CardMedia
          component="img"
          image={article.imageUrl}
          alt={article.title}
        />
      )}
      <CardContent className="flex flex-col w-full h-screen p-4">
        <Typography variant="h6" >
          <p className="line-clamp-2">{article.title}
            </p>
        </Typography>
        <Typography
          variant="body2"
        >
          <p className="text-gray-600 line-clamp-3"
          >{article.abstract}
          </p>
        </Typography>
        <Button
          component={Link}
          to={`/article/${article.id}`}
          variant="contained"
        >
          Read More
        </Button>
      </CardContent>
    </Card>
    </div>
  );
};

export default ArticleCard;
