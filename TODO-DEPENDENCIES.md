# TODO: Add Required Dependencies

## Encoding Support Dependencies

The following dependencies are required for full encoding preservation support in the file I/O tools:

```bash
npm install iconv-lite@^0.6.3 jschardet@^3.1.0
```

Or add to package.json:

```json
{
  "dependencies": {
    "iconv-lite": "^0.6.3",
    "jschardet": "^3.1.0"
  }
}
```

## Why These Are Needed

- **iconv-lite**: Provides encoding/decoding for legacy encodings (Shift-JIS, Windows-1252, etc.)
- **jschardet**: Detects character encoding for files without BOM markers

## Current Fallback Behavior

Until these dependencies are added, the encoding utilities will:
- Use Node.js built-in encodings (UTF-8, UTF-16LE)
- Fall back to UTF-8 for unknown encodings
- Still preserve BOM markers correctly
- Detect binary files (UTF-16 with BOM)

This provides basic encoding preservation while maintaining backward compatibility.
