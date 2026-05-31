import type { Dispatch, SetStateAction } from 'react';
import type { IFormState } from '../../types';
import { loadCar } from '../api/loadCar';
import { mapCarToForm } from '../form/mapCarToForm';

type TDeps = {
  setForm: Dispatch<SetStateAction<IFormState>>;
  setPreviewUrl: Dispatch<SetStateAction<string>>;
  setPreviewBroken: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export async function initCar(id: string | undefined, isNew: boolean, deps: TDeps): Promise<void> {
  if (isNew || !id) return;
  deps.setLoading(true);
  try {
    const car = await loadCar(Number(id));
    deps.setForm(mapCarToForm(car));
    if (car.thumbnail?.path) deps.setPreviewUrl(car.thumbnail.path);
    deps.setPreviewBroken(false);
  } finally {
    deps.setLoading(false);
  }
}
