const MAX_IMAGE_SIDE = 1024;
const MAX_IMAGE_BYTES = 85 * 1024;

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
    reader.readAsDataURL(file);
  });
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Не удалось загрузить изображение'));
    img.src = src;
  });
}

function base64SizeBytes(base64: string): number {
  const payload = base64.split(',')[1] || '';
  return Math.ceil((payload.length * 3) / 4);
}

export async function compressImageDataUrl(
  sourceDataUrl: string
): Promise<{ dataUrl: string; mime: string }> {
  const image = await loadImage(sourceDataUrl);
  let ratio = Math.min(MAX_IMAGE_SIDE / image.width, MAX_IMAGE_SIDE / image.height, 1);

  const renderPng = (targetRatio: number) => {
    const width = Math.max(1, Math.round(image.width * targetRatio));
    const height = Math.max(1, Math.round(image.height * targetRatio));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Не удалось подготовить изображение');
    ctx.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL('image/png');
  };

  let dataUrl = renderPng(ratio);

  while (base64SizeBytes(dataUrl) > MAX_IMAGE_BYTES && ratio > 0.08) {
    ratio *= 0.86;
    dataUrl = renderPng(ratio);
  }

  if (base64SizeBytes(dataUrl) > MAX_IMAGE_BYTES) {
    throw new Error('Изображение слишком большое. Возьми файл поменьше.');
  }

  return { dataUrl, mime: 'image/png' };
}
