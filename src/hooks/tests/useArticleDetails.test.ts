import { renderHook } from '@testing-library/react-hooks';
import { useParams } from 'react-router-dom';
import { Article } from '../../types/types';
import { useGetArticlesQuery } from '../../api/articlesApi';
import useArticleDetails from '../useArticleDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../../api/articlesApi', () => ({
  useGetArticlesQuery: jest.fn(),
}));

describe('useArticleDetails', () => {
  const mockArticles: Article[] = [
    { id: 1, title: 'Article 1', abstract: 'Content of Article 1', url: '', imageUrl:''},
    { id: 2, title: 'Article 2', abstract: 'Content of Article 2', url: '', imageUrl:'' },
  ];

  it('should return articles and a single article when ID is provided', () => {
    (useParams as jest.Mock).mockReturnValueOnce({ id: '1' });
    (useGetArticlesQuery as jest.Mock).mockReturnValueOnce({ data: { articles: mockArticles }, isLoading: false, error: null });

    const { result } = renderHook(() => useArticleDetails());

    expect(result.current.articles).toEqual(mockArticles);

    expect(result.current.article).toEqual(mockArticles[0]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should return null for article when no ID is provided', () => {
    (useParams as jest.Mock).mockReturnValueOnce({ id: undefined });
    (useGetArticlesQuery as jest.Mock).mockReturnValueOnce({ data: { articles: mockArticles }, isLoading: false, error: null });

    const { result } = renderHook(() => useArticleDetails());

    expect(result.current.articles).toEqual(mockArticles);

    expect(result.current.article).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle loading state correctly', () => {
    (useParams as jest.Mock).mockReturnValueOnce({ id: '1' });
    (useGetArticlesQuery as jest.Mock).mockReturnValueOnce({ data: undefined, isLoading: true, error: null });

    const { result } = renderHook(() => useArticleDetails());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.article).not.toBeDefined();
    expect(result.current.error).toBeNull();
  });

  it('should handle error state correctly', () => {
    (useParams as jest.Mock).mockReturnValueOnce({ id: '1' });
    (useGetArticlesQuery as jest.Mock).mockReturnValueOnce({ data: undefined, isLoading: false, error: 'Error fetching articles' });

    const { result } = renderHook(() => useArticleDetails());

    expect(result.current.error).toBe('Error fetching articles');
    expect(result.current.article).not.toBeDefined();
  });
});
