import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Notes } from './components/Notes';
import { NoteDetail } from './components/NoteDetail';
import { NoteForm } from './components/NoteForm';
import { NotesProvider } from './hooks/useNotesContext'
import { NotFound } from './components/NotFound';

export function App() {
  return (
    <div className="App">
      <NotesProvider>
        <Routes>
          <Route path='/' element={<Notes />} />
          <Route path='/:page' element={<Notes />} />
          <Route path='/notes/:id' element={<NoteDetail />} />
          <Route path='/edit-note/:id' element={<NoteForm />} />
          <Route path='/create-note' element={<NoteForm />} />
          <Route path='not-found' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </NotesProvider>
    </div>
  );
}
