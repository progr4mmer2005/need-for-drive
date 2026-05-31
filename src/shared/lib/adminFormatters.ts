export function formatDate(ts: number | string | null | undefined): string {
  const n = Number(ts);
  if (!n || isNaN(n) || n <= 0) return '—';
  const d = new Date(n);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export function formatPrice(price: number | string | null | undefined): string {
  const n = Number(price);
  return n ? `${n.toLocaleString('ru-RU')} ₽` : '—';
}
