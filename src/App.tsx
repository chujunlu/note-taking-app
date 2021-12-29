import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Notes } from './components/Notes'
import { NotesProvider } from './hooks/notesContext'

export function App() {
  return (
    <div className="App">
      <NotesProvider>
        <Routes>
          <Route path='/' element={<Notes />} />
          <Route path='/:page' element={<Notes />} />
        </Routes>
      </NotesProvider>
    </div>
  );
}
