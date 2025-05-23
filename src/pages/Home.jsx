import { useBooks } from '../hooks/useBooks';
import { useSyncOnReconnect } from '../hooks/useSyncOnReconnect';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export default function Home() {
  const {
    books,
    addBook,
    deleteBook,
    setSearchQuery,
    triggerSync,
    loading
  } = useBooks();

  const isOnline = useOnlineStatus();

  useSyncOnReconnect();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Notes Manager (Offline - First)</h1>

      <div
        className={`mb-4 p-2 text-center rounded ${
          isOnline ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
        }`}
      >
        {isOnline ? '🟢 You are ONLINE' : '🔴 You are OFFLINE'}
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search title or content..."
          className="w-full mr-2 p-2 border border-gray-300 rounded"
        />

        <button
          onClick={triggerSync}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      <BookForm onSave={addBook} />
      <BookList books={books} onDelete={deleteBook} />
    </div>
  );
}
