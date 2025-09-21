import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css'

const API = 'http://localhost:5000/contacts';

export default function ContactForm({ onAdd, refreshList }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  function validEmail(e){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }
  function validPhone(p){
    return /^\d{10}$/.test(p);
  }

  const submit = async (ev) => {
    ev.preventDefault();
    setError('');
    if (!name.trim()) return setError('Name is required');
    if (!validEmail(email)) return setError('Invalid email');
    if (!validPhone(phone)) return setError('Phone must be 10 digits');

    try {
      const res = await axios.post(API, { name, email, phone });
      const created = res.data;
      onAdd(created);
      setName(''); setEmail(''); setPhone('');
      if (refreshList) refreshList();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Network error');
    }
  };

  return (
    <form onSubmit={submit} className="grid-form">
  <div className="form-group">
    <label className="muted">Name</label>
    <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" />
  </div>
  <div className="form-group">
    <label className="muted">Email</label>
    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="example@mail.com" />
  </div>
  <div className="form-group">
    <label className="muted">Phone</label>
    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="10 digits" />
  </div>
  <div className="form-group form-submit">
    <label className="muted">Submit</label>
    <button type="submit">Add</button>
  </div>
  {error && <div className="error">{error}</div>}
</form>

  );
}
