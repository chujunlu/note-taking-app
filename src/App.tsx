import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Notes } from './components/Notes'
import { NoteForm } from './components/NoteForm';
import { NotesProvider } from './hooks/notesContext'
import { NotFound } from './components/NotFound';

export function App() {
  return (
    <div className="App">
      <NotesProvider>
        <Routes>
          <Route path='/' element={<Notes />} />
          <Route path='/:page(\\d+)' element={<Notes />} />
          <Route path='/notes/:id(\\d+)' element={<NoteForm />} />
          <Route path='/create-note' element={<NoteForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </NotesProvider>
    </div>
  );
}
