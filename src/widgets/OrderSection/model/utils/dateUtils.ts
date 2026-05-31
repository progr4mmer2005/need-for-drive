export function toLocalDateTimeValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getDefaultDateRange(): { from: string; to: string } {
  const from = new Date();
  from.setSeconds(0, 0);
  const to = new Date(from);
  to.setDate(to.getDate() + 1);
  return { from: toLocalDateTimeValue(from), to: toLocalDateTimeValue(to) };
}

export function formatAvailableAt(value: string, notSelected: string): string {
  if (!value) return notSelected;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function formatDuration(dateFrom: string, dateTo: string, notSelected: string): string {
  if (!dateFrom || !dateTo) return notSelected;
  const from = new Date(dateFrom).getTime();
  const to = new Date(dateTo).getTime();
  if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from) return notSelected;
  const totalMinutes = Math.floor((to - from) / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return `${days}д ${hours}ч ${minutes}м`;
}
