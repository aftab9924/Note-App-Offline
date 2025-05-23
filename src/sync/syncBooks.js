import { db } from '../db';
import api from '../api';

export async function syncBooks() {
  try {
    
    const toDeleteBooks = await db.books.where('syncStatus').equals('ToDelete').toArray();
    for (const book of toDeleteBooks) {
      try {
        if (book.id) {
          await api.delete(`/books/${book.id}`);
        }
        await db.books.delete(book.id);
      } catch (err) {
        await db.books.put({ ...book, syncStatus: `Delete Error: ${err.message}` });
      }
    }

  
    const unsyncedBooks = await db.books.where('syncStatus').noneOf(['Synced', 'ToDelete']).toArray();

    
    const { data: remoteBooks } = await api.get('/books');
    const remoteIds = new Set(remoteBooks.map(book => book.id));

    
    for (const book of unsyncedBooks) {
      try {
        if (!book.id || !remoteIds.has(book.id)) {
        
          const response = await api.post('/books', {
            title: book.title,
            content: book.content,
            updatedAt: book.updatedAt,
          });

          await db.books.delete(book.id);
          await db.books.put({ ...response.data, syncStatus: 'Synced' });
        } else {
          await api.put(`/books/${book.id}`, {
            title: book.title,
            content: book.content,
            updatedAt: book.updatedAt,
          });

          await db.books.put({ ...book, syncStatus: 'Synced' });
        }
      } catch (err) {
        await db.books.put({ ...book, syncStatus: `Error: ${err.message}` });
      }
    }

    for (const remoteBook of remoteBooks) {
      const localBook = await db.books.get(remoteBook.id);

      if (!localBook) {
        await db.books.put({ ...remoteBook, syncStatus: 'Synced' });
      } else if (new Date(remoteBook.updatedAt) > new Date(localBook.updatedAt)) {
        await db.books.put({ ...remoteBook, syncStatus: 'Synced' });
      }
    }

    return true;
  } catch (error) {
    console.error('Sync failed:', error);
    return false;
  }
}
