import sharp from 'sharp';

export const REPLY_AVATAR_COORDINATES = [
  [153, 195],
  [345, 83],
  [680, 125],
  [646, 291],
  [556, 417],
  [214, 434],
];

export const SHARE_AVATAR_COORDINATES = [
  [
    [306, 366],
    [425, 127],
    [545, 366],
  ],
  [
    [278, 275],
    [425, 127],
    [573, 275],
    [425, 423],
  ],
  [
    [306, 366],
    [210, 233],
    [425, 127],
    [640, 233],
    [545, 366],
  ],
  [
    [222, 365],
    [306, 187],
    [425, 56],
    [545, 187],
    [628, 367],
    [425, 426],
  ],
];

export const FOLLOW_AVATAR_COORDINATES = {
  SENDER: [123, 357],
  RECEIVER: [707, 357],
};

export const REPLY_TEMPLATE_COORDINATES = {
  RECEIVER: [407, 257],
  TOKEN_LOGO: [465, 315],
};

export const SENDER_PFP_SIZE = 50;
export const RECEIVER_PFP_SIZE = 86;
export const TOKEN_LOGO_SIZE = 28;
export const FOLLOW_AVATAR_SIZE = 70;

const FETCH_TIMEOUT_MS = 10000;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_DIMENSION = 4096;
const SHARP_TIMEOUT_MS = 5000;
const ALLOWED_FORMATS = ['jpeg', 'png', 'webp', 'gif'];

// Magic bytes for image formats
const IMAGE_SIGNATURES: Record<string, number[]> = {
  jpeg: [0xff, 0xd8, 0xff],
  png: [0x89, 0x50, 0x4e, 0x47],
  gif: [0x47, 0x49, 0x46],
  webp: [0x52, 0x49, 0x46, 0x46], // RIFF (WebP starts with RIFF....WEBP)
};

function detectImageFormat(buffer: Buffer): string | null {
  for (const [format, signature] of Object.entries(IMAGE_SIGNATURES)) {
    if (signature.every((byte, i) => buffer[i] === byte)) {
      // Extra check for WebP (bytes 8-11 should be "WEBP")
      if (format === 'webp') {
        const webpMarker = buffer.slice(8, 12).toString('ascii');
        if (webpMarker !== 'WEBP') return null;
      }
      return format;
    }
  }
  return null;
}

export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  operation: string
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(`${operation} timed out after ${ms}ms`)),
        ms
      )
    ),
  ]);
}

async function fetchWithLimits(url: string): Promise<Buffer> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // Check Content-Length if available (don't trust it completely)
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_FILE_SIZE) {
      throw new Error(`File too large: ${contentLength} bytes`);
    }

    // Stream with size limit
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const chunks: Uint8Array[] = [];
    let totalSize = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalSize += value.length;
      if (totalSize > MAX_FILE_SIZE) {
        reader.cancel();
        throw new Error(`File exceeded ${MAX_FILE_SIZE} bytes during download`);
      }

      chunks.push(value);
    }

    return Buffer.concat(chunks);
  } finally {
    clearTimeout(timeout);
  }
}

async function validateImage(buffer: Buffer): Promise<void> {
  // Check magic bytes
  const detectedFormat = detectImageFormat(buffer);
  if (!detectedFormat) {
    throw new Error('Unrecognized image format (invalid magic bytes)');
  }

  // Use Sharp to validate and check dimensions
  const metadata = await withTimeout(
    sharp(buffer).metadata(),
    SHARP_TIMEOUT_MS,
    'Metadata extraction'
  );

  if (!metadata.format || !ALLOWED_FORMATS.includes(metadata.format)) {
    throw new Error(`Disallowed format: ${metadata.format}`);
  }

  if (!metadata.width || !metadata.height) {
    throw new Error('Could not determine image dimensions');
  }

  if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
    throw new Error(
      `Image too large: ${metadata.width}x${metadata.height} (max ${MAX_DIMENSION})`
    );
  }

  // Check for decompression bombs (small file, huge dimensions)
  const pixelCount = metadata.width * metadata.height;
  const bytesPerPixel = buffer.length / pixelCount;
  if (bytesPerPixel < 0.01) {
    // Suspiciously high compression ratio
    throw new Error(
      'Suspicious compression ratio (possible decompression bomb)'
    );
  }
}

function createFallbackImage(pfpSize: number): Promise<Buffer> {
  return sharp({
    create: {
      width: pfpSize,
      height: pfpSize,
      channels: 4,
      background: { r: 50, g: 50, b: 50, alpha: 1 },
    },
  })
    .png()
    .toBuffer();
}

export const bufferPfp = async (
  url: string,
  pfpSize: number
): Promise<Buffer> => {
  if (!url) {
    return createFallbackImage(pfpSize);
  }

  let buffer: Buffer;

  try {
    // Fetch with timeout and size limit
    buffer = await fetchWithLimits(url);
  } catch (err) {
    console.error(`Failed to fetch image from ${url}:`, err);
    return createFallbackImage(pfpSize);
  }

  try {
    // Validate before processing
    await validateImage(buffer);
  } catch (err) {
    console.error(`Image validation failed for ${url}:`, err);
    return createFallbackImage(pfpSize);
  }

  // Process with timeout
  const circleMask = Buffer.from(
    `<svg><circle cx="${pfpSize / 2}" cy="${pfpSize / 2}" r="${pfpSize / 2}" fill="white"/></svg>`
  );

  try {
    return await withTimeout(
      sharp(buffer)
        .resize(pfpSize, pfpSize)
        .composite([{ input: circleMask, blend: 'dest-in' }])
        .png()
        .toBuffer(),
      SHARP_TIMEOUT_MS,
      'Image processing'
    );
  } catch (err) {
    console.error(`Image processing failed for ${url}:`, err);
    return createFallbackImage(pfpSize);
  }
};
