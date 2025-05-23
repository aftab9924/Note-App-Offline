function SyncStatusBadge({ status }) {
  let color;
  switch (status) {
    case 'Synced':
      color = 'green';
      break;
    case 'Syncing...':
      color = 'blue';
      break;
    case 'Unsynced':
      color = 'orange';
      break;
    default:
      color = 'red'; 
  }

  return (
    <span style={{
      padding: '2px 6px',
      borderRadius: '4px',
      backgroundColor: color,
      color: 'white',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      marginLeft: '10px',
    }}>
      {status}
    </span>
  );
}

export default function BookList({ books, onDelete }) {
  return (
    <div>
      {books.map(book => (
        <div key={book.id} style={{ marginBottom: '12px', borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
          <h3>{book.title} <SyncStatusBadge status={book.syncStatus} /></h3>
          <p>{book.content}</p>
          <button onClick={() => onDelete(book.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
