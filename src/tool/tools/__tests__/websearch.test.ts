import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { ToolContext } from '../../index.js';

// Mock duck-duck-scrape before importing the tool
vi.mock('duck-duck-scrape', () => ({
  search: vi.fn(),
  SafeSearchType: {
    MODERATE: 'moderate',
    OFF: 'off',
    STRICT: 'strict',
  },
}));

import { websearchTool } from '../websearch.js';
import { search } from 'duck-duck-scrape';

const mockSearch = vi.mocked(search);

describe('WebSearch Tool', () => {
  let context: ToolContext;

  beforeEach(() => {
    context = { workdir: '/test' };
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Successful search', () => {
    it('should return search results', async () => {
      mockSearch.mockResolvedValue({
        noResults: false,
        vqd: 'test-vqd',
        results: [
          {
            title: 'Test Result 1',
            url: 'https://example.com/1',
            description: 'This is the first result',
            rawDescription: 'This is the first result',
            hostname: 'example.com',
            icon: '',
            bang: undefined,
          },
          {
            title: 'Test Result 2',
            url: 'https://example.com/2',
            description: 'This is the second result',
            rawDescription: 'This is the second result',
            hostname: 'example.com',
            icon: '',
            bang: undefined,
          },
        ],
      });

      const result = await websearchTool.executeUnsafe({ query: 'test query' }, context);

      expect(result.success).toBe(true);
      expect(result.data?.query).toBe('test query');
      expect(result.data?.results).toHaveLength(2);
      expect(result.data?.results[0]).toEqual({
        title: 'Test Result 1',
        url: 'https://example.com/1',
        snippet: 'This is the first result',
      });
      expect(mockSearch).toHaveBeenCalledWith('test query', {
        safeSearch: 'moderate',
        locale: 'en-us',
      });
    });

    it('should use custom region', async () => {
      mockSearch.mockResolvedValue({
        noResults: false,
        vqd: 'test-vqd',
        results: [],
      });

      await websearchTool.executeUnsafe({ query: 'test query', region: 'ru-ru' }, context);

      expect(mockSearch).toHaveBeenCalledWith('test query', {
        safeSearch: 'moderate',
        locale: 'ru-ru',
      });
    });
  });

  describe('Limit parameter', () => {
    it('should limit results to default of 5', async () => {
      mockSearch.mockResolvedValue({
        noResults: false,
        vqd: 'test-vqd',
        results: Array(10)
          .fill(null)
          .map((_, i) => ({
            title: `Result ${i + 1}`,
            url: `https://example.com/${i + 1}`,
            description: `Description ${i + 1}`,
            rawDescription: `Description ${i + 1}`,
            hostname: 'example.com',
            icon: '',
            bang: undefined,
          })),
      });

      const result = await websearchTool.executeUnsafe({ query: 'test' }, context);

      expect(result.success).toBe(true);
      expect(result.data?.results).toHaveLength(5);
      expect(result.data?.totalResults).toBe(5);
    });

    it('should respect custom limit', async () => {
      mockSearch.mockResolvedValue({
        noResults: false,
        vqd: 'test-vqd',
        results: Array(10)
          .fill(null)
          .map((_, i) => ({
            title: `Result ${i + 1}`,
            url: `https://example.com/${i + 1}`,
            description: `Description ${i + 1}`,
            rawDescription: `Description ${i + 1}`,
            hostname: 'example.com',
            icon: '',
            bang: undefined,
          })),
      });

      const result = await websearchTool.executeUnsafe({ query: 'test', limit: 3 }, context);

      expect(result.success).toBe(true);
      expect(result.data?.results).toHaveLength(3);
    });

    it('should clamp limit to maximum of 10', async () => {
      mockSearch.mockResolvedValue({
        noResults: false,
        vqd: 'test-vqd',
        results: Array(15)
          .fill(null)
          .map((_, i) => ({
            title: `Result ${i + 1}`,
            url: `https://example.com/${i + 1}`,
            description: `Description ${i + 1}`,
            rawDescription: `Description ${i + 1}`,
            hostname: 'example.com',
            icon: '',
            bang: undefined,
          })),
      });

      const result = await websearchTool.executeUnsafe({ query: 'test', limit: 20 }, context);

      expect(result.success).toBe(true);
      expect(result.data?.results).toHaveLength(10);
    });

    it('should clamp limit to minimum of 1', async () => {
      mockSearch.mockResolvedValue({
        noResults: false,
        vqd: 'test-vqd',
        results: [
          {
            title: 'Result 1',
            url: 'https://example.com/1',
            description: 'Description 1',
            rawDescription: 'Description 1',
            hostname: 'example.com',
            icon: '',
            bang: undefined,
          },
        ],
      });

      const result = await websearchTool.executeUnsafe({ query: 'test', limit: 0 }, context);

      expect(result.success).toBe(true);
      expect(result.data?.results).toHaveLength(1);
    });
  });

  describe('Empty results', () => {
    it('should return empty array when no results found', async () => {
      mockSearch.mockResolvedValue({
        noResults: true,
        vqd: 'test-vqd',
        results: [],
      });

      const result = await websearchTool.executeUnsafe({ query: 'obscure query xyz123' }, context);

      expect(result.success).toBe(true);
      expect(result.data?.results).toEqual([]);
      expect(result.data?.totalResults).toBe(0);
    });
  });

  describe('Error handling', () => {
    it('should handle rate limiting errors', async () => {
      mockSearch.mockRejectedValue(new Error('Rate limit exceeded'));

      const result = await websearchTool.executeUnsafe({ query: 'test' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Search rate limited, please try again later');
    });

    it('should handle 429 status errors', async () => {
      mockSearch.mockRejectedValue(new Error('HTTP 429 Too Many Requests'));

      const result = await websearchTool.executeUnsafe({ query: 'test' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Search rate limited, please try again later');
    });

    it('should handle network errors', async () => {
      mockSearch.mockRejectedValue(new Error('Network error: ECONNREFUSED'));

      const result = await websearchTool.executeUnsafe({ query: 'test' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to search: Network error: ECONNREFUSED');
    });

    it('should handle ENOTFOUND errors', async () => {
      mockSearch.mockRejectedValue(new Error('getaddrinfo ENOTFOUND duckduckgo.com'));

      const result = await websearchTool.executeUnsafe({ query: 'test' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Failed to search:');
      expect(result.error).toContain('ENOTFOUND');
    });

    it('should handle generic errors', async () => {
      mockSearch.mockRejectedValue(new Error('Something went wrong'));

      const result = await websearchTool.executeUnsafe({ query: 'test' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to search: Something went wrong');
    });

    it('should handle non-Error throws', async () => {
      mockSearch.mockRejectedValue('String error');

      const result = await websearchTool.executeUnsafe({ query: 'test' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to search: String error');
    });
  });

  describe('Abort handling', () => {
    it('should return error when aborted', async () => {
      const abortController = new AbortController();
      abortController.abort();

      const result = await websearchTool.executeUnsafe(
        { query: 'test' },
        { ...context, signal: abortController.signal }
      );

      expect(result.success).toBe(false);
      // The framework catches abort in executeUnsafe before execute is called
      expect(result.error).toBe('Operation aborted');
    });
  });

  describe('Tool metadata', () => {
    it('should have correct name', () => {
      expect(websearchTool.name).toBe('websearch');
    });

    it('should have description', () => {
      expect(websearchTool.description).toContain('DuckDuckGo');
    });

    it('should generate function schema', () => {
      const schema = websearchTool.toFunctionSchema();

      expect(schema.name).toBe('websearch');
      expect(schema.parameters).toHaveProperty('properties');
      expect((schema.parameters as any).properties).toHaveProperty('query');
      expect((schema.parameters as any).properties).toHaveProperty('limit');
      expect((schema.parameters as any).properties).toHaveProperty('region');
    });
  });
});
