import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm/ContactForm.jsx';
import ContactList from './components/ContactList/ContactList.jsx';
import './App.css'

const API = 'https://demand-xpress-assignment-backend1.onrender.com/contacts';

export default function App(){
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async (p = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(API, { params: { page: p, limit } });
      const data = res.data;
      setContacts(data.data || []);
      setPage(data.page || 1);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(1); }, []);

  const addContact = (contact) => {
    setContacts(prev => [contact, ...prev].slice(0, limit));
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setContacts(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const goPrev = () => { if (page > 1) fetchContacts(page -1); };
  const goNext = () => { if (page < totalPages) fetchContacts(page +1); };

  return (
    <div className="container">
  <h1>Contact Book</h1>
  <ContactForm onAdd={addContact} refreshList={() => fetchContacts(1)} />
  <div className="pagination-container">
    <div className="pagination-info">
      <div className="muted">Showing page {page} of {totalPages}</div>
      <div className="controls">
        <button onClick={goPrev} disabled={page <= 1} className="pagination-btn">Prev</button>
        <button onClick={goNext} disabled={page >= totalPages} className="pagination-btn">Next</button>
      </div>
    </div>
    <ContactList contacts={contacts} onDelete={deleteContact} loading={loading} />
  </div>
</div>

  );
}
