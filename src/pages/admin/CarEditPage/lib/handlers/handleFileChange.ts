import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { IFormState } from '../../types';
import { processImageFile } from '../form/processImageFile';

type TDeps = {
  setPreviewUrl: Dispatch<SetStateAction<string>>;
  setPreviewBroken: Dispatch<SetStateAction<boolean>>;
  setForm: Dispatch<SetStateAction<IFormState>>;
  showToast: (message: string, type: 'success' | 'error') => void;
};

export async function handleFileChange(
  event: ChangeEvent<HTMLInputElement>,
  deps: TDeps
): Promise<void> {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const { dataUrl, name, mime } = await processImageFile(file);
    deps.setPreviewUrl(dataUrl);
    deps.setPreviewBroken(false);
    deps.setForm((prev) => ({
      ...prev,
      thumbnailPath: dataUrl,
      thumbnailName: name,
      thumbnailMime: mime,
    }));
  } catch (error) {
    deps.showToast(error instanceof Error ? error.message : 'Не удалось обработать файл', 'error');
  }
}
