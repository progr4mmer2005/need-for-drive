import { useCallback, useEffect, useRef, useState } from 'react';

export type TAdminToast = {
  message: string;
  type: 'success' | 'error';
};

export function useAdminToast(durationMs = 5000) {
  const [toast, setToast] = useState<TAdminToast | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const closeToast = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback(
    (message: string, type: TAdminToast['type']) => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      setToast({ message, type });
      timeoutRef.current = window.setTimeout(() => {
        setToast(null);
        timeoutRef.current = null;
      }, durationMs);
    },
    [durationMs]
  );

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  return { toast, showToast, closeToast };
}
