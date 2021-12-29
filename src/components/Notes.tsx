import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Note } from './Note';
import { useFetchNotes } from '../hooks/fetchNotes'
import { useNotesContext } from '../hooks/notesContext';

export function Notes() {
    const { page=1 } = useParams();
    const fetchNotes = useFetchNotes();
    const [{ notes, total}, dispatch] = useNotesContext();

    useEffect(() => {
        fetchNotes(page);
    }, [fetchNotes, page]);

    return (
        <>
            <div>
                {notes.map(note => (
                    <Note key={note.id} note={note} />
                ))}
            </div>
        </>
    )
}
