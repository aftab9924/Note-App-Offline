import { useState } from 'react';

export default function BookForm({ onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Button save is working')
    if (!title.trim()) return;
    onSave({ title, content });
    setTitle('');
    setContent('');
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4 bg-white shadow">
      <h2 className="text-lg font-semibold mb-2">Add a Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full mb-2 p-2 border rounded h-24"
      />
      <button
        type="submit"
       
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Note
      </button>
    </form>
  );
}
