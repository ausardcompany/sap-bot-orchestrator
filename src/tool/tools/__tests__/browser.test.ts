import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { ToolContext } from '../../index.js';
import {
  browserTool,
  _closeBrowser,
  _setPuppeteerImporter,
  _resetPuppeteerImporter,
} from '../browser.js';

// Mock puppeteer page and browser
const mockGoto = vi.fn();
const mockClick = vi.fn();
const mockMouseClick = vi.fn();
const mockKeyboardType = vi.fn();
const mockScreenshot = vi.fn();
const mockContent = vi.fn();
const mockUrl = vi.fn();
const mockTitle = vi.fn();
const mockPageClose = vi.fn();
const mockEvaluate = vi.fn();
const mockOn = vi.fn();

const mockPage = {
  goto: mockGoto,
  click: mockClick,
  mouse: { click: mockMouseClick },
  keyboard: { type: mockKeyboardType },
  screenshot: mockScreenshot,
  content: mockContent,
  url: mockUrl,
  title: mockTitle,
  close: mockPageClose,
  evaluate: mockEvaluate,
  on: mockOn,
};

const mockNewPage = vi.fn().mockResolvedValue(mockPage);
const mockBrowserClose = vi.fn();

const mockBrowser = {
  newPage: mockNewPage,
  close: mockBrowserClose,
};

const mockLaunch = vi.fn().mockResolvedValue(mockBrowser);

// Track if puppeteer should be available
let puppeteerInstalled = true;

// Mock puppeteer module
const mockPuppeteerModule = {
  default: {
    launch: mockLaunch,
  },
};

describe('Browser Tool', () => {
  let context: ToolContext;

  beforeEach(async () => {
    context = { workdir: '/test' };
    vi.clearAllMocks();
    puppeteerInstalled = true;

    // Reset mock implementations
    mockUrl.mockReturnValue('https://example.com');
    mockTitle.mockResolvedValue('Example Page');
    mockGoto.mockResolvedValue(undefined);
    mockClick.mockResolvedValue(undefined);
    mockMouseClick.mockResolvedValue(undefined);
    mockKeyboardType.mockResolvedValue(undefined);
    mockScreenshot.mockResolvedValue('base64screenshot');
    mockContent.mockResolvedValue('<html><body>Test</body></html>');
    mockEvaluate.mockResolvedValue(undefined);
    mockPageClose.mockResolvedValue(undefined);
    mockBrowserClose.mockResolvedValue(undefined);
    mockNewPage.mockResolvedValue(mockPage);
    mockLaunch.mockResolvedValue(mockBrowser);

    // Set up the mock puppeteer importer
    _setPuppeteerImporter(async () => {
      if (!puppeteerInstalled) {
        throw new Error('Cannot find module puppeteer');
      }
      return mockPuppeteerModule;
    });

    // Clean up any existing browser session
    await _closeBrowser();
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    // Clean up browser instance after each test
    await _closeBrowser();
    // Reset the importer
    _resetPuppeteerImporter();
  });

  describe('Puppeteer not installed', () => {
    it('should return helpful error when puppeteer is not installed', async () => {
      puppeteerInstalled = false;

      const result = await browserTool.executeUnsafe(
        { action: 'launch', url: 'https://example.com' },
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('Puppeteer not installed. Run: npm install puppeteer');
    });
  });

  describe('Launch action', () => {
    it('should launch browser and navigate to URL', async () => {
      const result = await browserTool.executeUnsafe(
        { action: 'launch', url: 'https://example.com' },
        context
      );

      expect(result.success).toBe(true);
      expect(result.data?.action).toBe('launch');
      expect(result.data?.success).toBe(true);
      expect(result.data?.url).toBe('https://example.com');
      expect(result.data?.title).toBe('Example Page');
      expect(mockLaunch).toHaveBeenCalledWith({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      expect(mockGoto).toHaveBeenCalledWith('https://example.com', {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
    });

    it('should return error when URL is missing', async () => {
      const result = await browserTool.executeUnsafe({ action: 'launch' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe("URL required for 'launch' action");
    });

    it('should handle navigation timeout', async () => {
      const timeoutError = new Error('Navigation timeout');
      timeoutError.name = 'TimeoutError';
      mockGoto.mockRejectedValue(timeoutError);

      const result = await browserTool.executeUnsafe(
        { action: 'launch', url: 'https://slow-site.com' },
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('Navigation timeout for URL: https://slow-site.com');
    });
  });

  describe('Goto action', () => {
    it('should navigate to URL when browser is open', async () => {
      // First launch
      await browserTool.executeUnsafe({ action: 'launch', url: 'https://example.com' }, context);

      mockUrl.mockReturnValue('https://another.com');
      mockTitle.mockResolvedValue('Another Page');

      const result = await browserTool.executeUnsafe(
        { action: 'goto', url: 'https://another.com' },
        context
      );

      expect(result.success).toBe(true);
      expect(result.data?.action).toBe('goto');
      expect(result.data?.url).toBe('https://another.com');
    });

    it('should return error when no browser session', async () => {
      const result = await browserTool.executeUnsafe(
        { action: 'goto', url: 'https://example.com' },
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe("No browser session. Use action='launch' first");
    });

    it('should return error when URL is missing', async () => {
      // First launch
      await browserTool.executeUnsafe({ action: 'launch', url: 'https://example.com' }, context);

      const result = await browserTool.executeUnsafe({ action: 'goto' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe("URL required for 'goto' action");
    });
  });

  describe('Click action', () => {
    beforeEach(async () => {
      // Launch browser first
      await browserTool.executeUnsafe({ action: 'launch', url: 'https://example.com' }, context);
    });

    it('should click element by selector', async () => {
      const result = await browserTool.executeUnsafe(
        { action: 'click', selector: '#submit-button' },
        context
      );

      expect(result.success).toBe(true);
      expect(result.data?.action).toBe('click');
      expect(mockClick).toHaveBeenCalledWith('#submit-button');
    });

    it('should click by coordinates', async () => {
      const result = await browserTool.executeUnsafe({ action: 'click', x: 100, y: 200 }, context);

      expect(result.success).toBe(true);
      expect(result.data?.action).toBe('click');
      expect(mockMouseClick).toHaveBeenCalledWith(100, 200);
    });

    it('should return error when element not found', async () => {
      mockClick.mockRejectedValue(new Error('No element found for selector: #nonexistent'));

      const result = await browserTool.executeUnsafe(
        { action: 'click', selector: '#nonexistent' },
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('Element not found: #nonexistent');
    });

    it('should return error when neither selector nor coordinates provided', async () => {
      const result = await browserTool.executeUnsafe({ action: 'click' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe("Either 'selector' or 'x' and 'y' coordinates required for click");
    });

    it('should return error when no browser session', async () => {
      await _closeBrowser();

      const result = await browserTool.executeUnsafe(
        { action: 'click', selector: '#button' },
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe("No browser session. Use action='launch' first");
    });
  });

  describe('Type action', () => {
    beforeEach(async () => {
      await browserTool.executeUnsafe({ action: 'launch', url: 'https://example.com' }, context);
    });

    it('should type text', async () => {
      const result = await browserTool.executeUnsafe(
        { action: 'type', text: 'Hello World' },
        context
      );

      expect(result.success).toBe(true);
      expect(result.data?.action).toBe('type');
      expect(mockKeyboardType).toHaveBeenCalledWith('Hello World');
    });

    it('should return error when text is missing', async () => {
      const result = await browserTool.executeUnsafe({ action: 'type' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe("Text required for 'type' action");
    });

    it('should return error when no browser session', async () => {
      await _closeBrowser();

      const result = await browserTool.executeUnsafe({ action: 'type', text: 'Hello' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe("No browser session. Use action='launch' first");
    });
  });

  describe('Screenshot action', () => {
    beforeEach(async () => {
      await browserTool.executeUnsafe({ action: 'launch', url: 'https://example.com' }, context);
    });

    it('should capture screenshot', async () => {
      const result = await browserTool.executeUnsafe({ action: 'screenshot' }, context);

      expect(result.success).toBe(true);
      expect(result.data?.action).toBe('screenshot');
      expect(result.data?.screenshot).toBe('base64screenshot');
      expect(mockScreenshot).toHaveBeenCalledWith({
        encoding: 'base64',
        fullPage: false,
      });
    });

    it('should capture full page screenshot', async () => {
      const result = await browserTool.executeUnsafe(
        { action: 'screenshot', fullPage: true },
        context
      );

      expect(result.success).toBe(true);
      expect(mockScreenshot).toHaveBeenCalledWith({
        encoding: 'base64',
        fullPage: true,
      });
    });

    it('should return error when no browser session', async () => {
      await _closeBrowser();

      const result = await browserTool.executeUnsafe({ action: 'screenshot' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe("No browser session. Use action='launch' first");
    });
  });

  describe('Scroll action', () => {
    beforeEach(async () => {
      await browserTool.executeUnsafe({ action: 'launch', url: 'https://example.com' }, context);
    });

    it('should scroll down by default', async () => {
      const result = await browserTool.executeUnsafe({ action: 'scroll' }, context);

      expect(result.success).toBe(true);
      expect(result.data?.action).toBe('scroll');
      expect(mockEvaluate).toHaveBeenCalled();
      // Check that the scroll amount is positive (down)
      const evaluateCall = mockEvaluate.mock.calls[0];
      expect(evaluateCall[1]).toBe(500); // default amount
    });

    it('should scroll up', async () => {
      const result = await browserTool.executeUnsafe(
        { action: 'scroll', direction: 'up' },
        context
      );

      expect(result.success).toBe(true);
      const evaluateCall = mockEvaluate.mock.calls[0];
      expect(evaluateCall[1]).toBe(-500); // negative for up
    });

    it('should scroll with custom amount', async () => {
      const result = await browserTool.executeUnsafe(
        { action: 'scroll', direction: 'down', amount: 1000 },
        context
      );

      expect(result.success).toBe(true);
      const evaluateCall = mockEvaluate.mock.calls[0];
      expect(evaluateCall[1]).toBe(1000);
    });

    it('should return error when no browser session', async () => {
      await _closeBrowser();

      const result = await browserTool.executeUnsafe({ action: 'scroll' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe("No browser session. Use action='launch' first");
    });
  });

  describe('Content action', () => {
    beforeEach(async () => {
      await browserTool.executeUnsafe({ action: 'launch', url: 'https://example.com' }, context);
    });

    it('should return page content', async () => {
      const result = await browserTool.executeUnsafe({ action: 'content' }, context);

      expect(result.success).toBe(true);
      expect(result.data?.action).toBe('content');
      expect(result.data?.content).toBe('<html><body>Test</body></html>');
    });

    it('should truncate large content', async () => {
      const largeContent = 'x'.repeat(60000); // Exceeds MAX_BYTES
      mockContent.mockResolvedValue(largeContent);

      const result = await browserTool.executeUnsafe({ action: 'content' }, context);

      expect(result.success).toBe(true);
      expect(result.truncated).toBe(true);
      expect(result.hint).toBe('Content truncated due to size.');
    });

    it('should return error when no browser session', async () => {
      await _closeBrowser();

      const result = await browserTool.executeUnsafe({ action: 'content' }, context);

      expect(result.success).toBe(false);
      expect(result.error).toBe("No browser session. Use action='launch' first");
    });
  });

  describe('Close action', () => {
    it('should close browser', async () => {
      await browserTool.executeUnsafe({ action: 'launch', url: 'https://example.com' }, context);

      const result = await browserTool.executeUnsafe({ action: 'close' }, context);

      expect(result.success).toBe(true);
      expect(result.data?.action).toBe('close');
      expect(mockPageClose).toHaveBeenCalled();
      expect(mockBrowserClose).toHaveBeenCalled();
    });

    it('should succeed even without browser open', async () => {
      const result = await browserTool.executeUnsafe({ action: 'close' }, context);

      expect(result.success).toBe(true);
      expect(result.data?.action).toBe('close');
    });
  });

  describe('Tool metadata', () => {
    it('should have correct name', () => {
      expect(browserTool.name).toBe('browser');
    });

    it('should have description', () => {
      expect(browserTool.description).toContain('Puppeteer');
      expect(browserTool.description).toContain('launch');
      expect(browserTool.description).toContain('screenshot');
    });

    it('should generate function schema', () => {
      const schema = browserTool.toFunctionSchema();

      expect(schema.name).toBe('browser');
      expect(schema.parameters).toHaveProperty('properties');
      expect(
        (schema.parameters as { properties: Record<string, unknown> }).properties
      ).toHaveProperty('action');
      expect(
        (schema.parameters as { properties: Record<string, unknown> }).properties
      ).toHaveProperty('url');
      expect(
        (schema.parameters as { properties: Record<string, unknown> }).properties
      ).toHaveProperty('selector');
    });
  });

  describe('Console logs', () => {
    it('should collect console logs', async () => {
      await browserTool.executeUnsafe({ action: 'launch', url: 'https://example.com' }, context);

      // The on handler should have been registered
      expect(mockOn).toHaveBeenCalledWith('console', expect.any(Function));
    });
  });
});
