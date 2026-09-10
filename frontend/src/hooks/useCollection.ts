import { useCallback, useEffect, useState } from 'react';
export default function useCollection<T>(fetchItems: () => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const retry = useCallback(() => setRevision(value => value + 1), []);
  useEffect(() => {
    let current = true;
    setLoading(true); setError('');
    fetchItems().then(data => {
      if (!Array.isArray(data)) throw new Error('Invalid collection response');
      if (current) setItems(data);
    }).catch(() => { if (current) setError('This information could not be loaded.'); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, [fetchItems, revision]);
  return { items, loading, error, retry };
}
