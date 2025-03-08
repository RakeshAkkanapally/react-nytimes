export interface Article {
  id: number;
  title: string;
  abstract: string;
  url: string;
  imageUrl: string;
}

export interface ArticleResponse {
  results: {
    id: number;
    title: string;
    abstract: string;
    url: string;
    media?: { "media-metadata": { url: string }[] }[];
  }[];
}

export interface NormalizedArticleResponse {
  articles: Article[];
}
