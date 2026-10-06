import { useCallback, useEffect, useState } from 'react';
import type { Product } from '../data/products';
import { getCachedProducts, getProducts } from '../lib/products';

export type ProductsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; products: Product[] };

const initialState = (): ProductsState => {
  const cached = getCachedProducts();
  return cached ? { status: 'success', products: cached } : { status: 'loading' };
};

export function useProducts() {
  const [state, setState] = useState<ProductsState>(initialState);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    if (attempt > 0) setState({ status: 'loading' });
    getProducts({ refresh: attempt > 0 })
      .then((products) => !cancelled && setState({ status: 'success', products }))
      .catch((error: unknown) => {
        if (cancelled) return;
        const message = error instanceof Error ? error.message : 'Erro desconhecido';
        // Se a página já exibe produtos (snapshot do build), mantém a lista.
        setState((current) => (current.status === 'success' ? current : { status: 'error', message }));
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { state, retry };
}
