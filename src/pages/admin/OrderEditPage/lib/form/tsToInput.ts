import { MIN_VALID_MS } from '../../constants';

export function tsToInput(ts: number | string | null | undefined): string {
  const n = Number(ts);
  if (!n || Number.isNaN(n) || n <= 0) return '';
  const ms = n < MIN_VALID_MS ? n * 1000 : n;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime()) || d.getFullYear() < 2000) return '';
  const pad = (x: number) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
