import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Note } from './Note';
import { Pagination } from './Pagination';
import { useFetchNotes } from '../hooks/useFetchNotes'
import { useNotesContext } from '../hooks/useNotesContext';

export function Notes() {
    const { page = '1' } = useParams<{ page: string }>();
    const fetchNotes = useFetchNotes();
    const [{ notes, total }] = useNotesContext();

    useEffect(() => {
        fetchNotes(page);
    }, [fetchNotes, page]);

    return (
        <div className='container mt-5'>
            <div>
                <Link to='/create-note' className="btn btn-primary my-1">
                    Create new note
                </Link>
            </div>
            <div>
                {notes.map(note => (
                    <Note key={note.id} note={note} page={Number(page)} />
                ))}
            </div>
            <Pagination total={total} />
        </div>
    )
}
