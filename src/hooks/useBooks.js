import { useEffect, useState } from 'react';
import { db } from '../db';
import { syncBooks } from '../sync/syncBooks';

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchBooks() {
      const allBooks = await db.books.toArray();
      if (isMounted) {
        setBooks(allBooks);
        setLoading(false);
      }
    }

    fetchBooks();

    return () => { isMounted = false; };
  }, []);

  
  const filteredBooks = books.filter(book =>
    (book.title + ' ' + book.content).toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function addBook(book) {
  await upsertBook(book);
 }

  async function upsertBook(book) {
    const now = new Date().toISOString();

    const bookToSave = {
      ...book,
      updatedAt: now,
      syncStatus: 'Unsynced',
    };

    await db.books.put(bookToSave);
    const allBooks = await db.books.toArray();
    setBooks(allBooks);
  }

  async function deleteBook(id) {
    await db.books.delete(id);
    const allBooks = await db.books.toArray();
    setBooks(allBooks);
  }

  async function triggerSync() {
    setLoading(true);


    const unsyncedBooks = await db.books.where('syncStatus').notEqual('Synced').toArray();
    for (const book of unsyncedBooks) {
      await db.books.put({ ...book, syncStatus: 'Syncing...' });
    }
    setBooks(await db.books.toArray());

    await syncBooks();

  
    const allBooks = await db.books.toArray();
    setBooks(allBooks);
    setLoading(false);
  }

  return {
    books: filteredBooks,
    setSearchQuery,
    loading,
    upsertBook,
    deleteBook,
    triggerSync,
    addBook,
  };
}
