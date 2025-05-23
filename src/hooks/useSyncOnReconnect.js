import { useEffect } from 'react';
import { syncBooks } from '../sync/syncBooks';

export function useSyncOnReconnect() {
  useEffect(() => {
    async function handleOnline() {
      console.log('[Sync] Back online. Triggering sync...');
      await syncBooks();
    }

    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);
}
