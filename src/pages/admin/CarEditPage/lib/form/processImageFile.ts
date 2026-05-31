import { fileToDataUrl, compressImageDataUrl } from '@/shared/lib/imageUtils';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];

export async function processImageFile(file: File): Promise<{ dataUrl: string; name: string; mime: string }> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Допустимые форматы: JPEG, PNG, GIF и BMP');
  }
  const sourceDataUrl = await fileToDataUrl(file);
  const compressed = await compressImageDataUrl(sourceDataUrl);
  return { dataUrl: compressed.dataUrl, name: file.name, mime: compressed.mime };
}
