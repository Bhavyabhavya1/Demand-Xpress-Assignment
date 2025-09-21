import React from 'react';

export default function ContactList({ contacts, onDelete, loading }){
  if (loading) return <div style={{marginTop:12}}>Loading...</div>;
  if (!contacts || contacts.length === 0) return <div style={{marginTop:12}} className="muted">No contacts yet.</div>;

  return (
    <div className="list">
  {contacts.map(c => (
    <div key={c.id} className="contact-card">
      <div className="contact-info">
        <div className="contact-name">{c.name}</div>
        <div className="contact-details">{c.email} • {c.phone}</div>
      </div>
      <div className="contact-actions">
        <button onClick={() => onDelete(c.id)} className="delete-button">Delete</button>
      </div>
    </div>
  ))}
</div>

  );
}
