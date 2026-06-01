export type TAddColorResult = { ok: true; colors: string[] } | { ok: false; error: string } | null;

export function addColor(colorInput: string, existingColors: string[]): TAddColorResult {
  const color = colorInput.trim();
  if (!color || existingColors.includes(color)) return null;
  if (color.length > 150) return { ok: false, error: 'Не более 150 символов' };
  return { ok: true, colors: [...existingColors, color] };
}
