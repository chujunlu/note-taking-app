import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Notes } from './components/Notes'
import { NoteForm } from './components/NoteForm';
import { NotesProvider } from './hooks/notesContext'

export function App() {
  return (
    <div className="App">
      <NotesProvider>
        <Routes>
          <Route path='/' element={<Notes />} />
          <Route path='/:page' element={<Notes />} />
          <Route path='/notes/:id' element={<NoteForm />} />
          <Route path='/create-note' element={<NoteForm />} />
        </Routes>
      </NotesProvider>
    </div>
  );
}
