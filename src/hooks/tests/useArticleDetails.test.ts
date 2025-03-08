import { renderHook } from '@testing-library/react-hooks';
import { useParams } from 'react-router-dom';
import { Article } from '../../types/types';
import { useGetArticlesQuery } from '../../api/articlesApi';
import useArticleDetails from '../useArticleDetails';

// Mock the dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../../api/articlesApi', () => ({
  useGetArticlesQuery: jest.fn(),
}));

describe('useArticleDetails', () => {
  // Mock articles data
  const mockArticles: Article[] = [
    { id: 1, title: 'Article 1', abstract: 'Content of Article 1', url: '', imageUrl:''},
    { id: 2, title: 'Article 2', abstract: 'Content of Article 2', url: '', imageUrl:'' },
  ];

  it('should return articles and a single article when ID is provided', () => {
    // Set up mocks
    (useParams as jest.Mock).mockReturnValueOnce({ id: '1' });
    (useGetArticlesQuery as jest.Mock).mockReturnValueOnce({ data: { articles: mockArticles }, isLoading: false, error: null });

    const { result } = renderHook(() => useArticleDetails());

    // Test that all articles are returned correctly
    expect(result.current.articles).toEqual(mockArticles);

    // Test that the article with the specified ID is selected correctly
    expect(result.current.article).toEqual(mockArticles[0]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should return null for article when no ID is provided', () => {
    // Set up mocks
    (useParams as jest.Mock).mockReturnValueOnce({ id: undefined });
    (useGetArticlesQuery as jest.Mock).mockReturnValueOnce({ data: { articles: mockArticles }, isLoading: false, error: null });

    const { result } = renderHook(() => useArticleDetails());

    // Test that all articles are returned correctly
    expect(result.current.articles).toEqual(mockArticles);

    // Test that no article is selected when ID is not provided
    expect(result.current.article).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle loading state correctly', () => {
    // Set up mocks for loading state
    (useParams as jest.Mock).mockReturnValueOnce({ id: '1' });
    (useGetArticlesQuery as jest.Mock).mockReturnValueOnce({ data: undefined, isLoading: true, error: null });

    const { result } = renderHook(() => useArticleDetails());

    // Test that isLoading is true while the data is loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.article).not.toBeDefined();
    expect(result.current.error).toBeNull();
  });

  it('should handle error state correctly', () => {
    // Set up mocks for error state
    (useParams as jest.Mock).mockReturnValueOnce({ id: '1' });
    (useGetArticlesQuery as jest.Mock).mockReturnValueOnce({ data: undefined, isLoading: false, error: 'Error fetching articles' });

    const { result } = renderHook(() => useArticleDetails());

    // Test that error is handled correctly
    expect(result.current.error).toBe('Error fetching articles');
    expect(result.current.article).not.toBeDefined();
  });
});
