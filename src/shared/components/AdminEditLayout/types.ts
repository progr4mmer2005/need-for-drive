import type { ReactNode } from 'react';
import type { TAdminToast } from '@/shared/lib/useAdminToast';

export type TAdminEditLayoutProps = {
  title: string;
  cardTitle: string;
  isNew: boolean;
  loading: boolean;
  saving: boolean;
  cancelPath: string;
  onSave: () => void;
  onDelete: () => void;
  toast: TAdminToast | null;
  onCloseToast: () => void;
  children: ReactNode;
};
