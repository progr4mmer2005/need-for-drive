import type { ReactNode } from 'react';

export type TCx = { editLink: string };

export type TAdminListLayoutProps<T> = {
  title: string;
  addLink?: string;
  loading: boolean;
  items: T[];
  emptyText: string;
  columns: string[];
  renderRow: (item: T, cx: TCx) => ReactNode;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
