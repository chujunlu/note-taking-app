import React from "react";
import { Link } from "react-router-dom"

import { NoteType } from '../hooks/notesContext'
import { useDeleteNote } from '../hooks/deleteNote'

export interface NoteState {
    note: NoteType
    page: number
}

export function Note({ note, page } : NoteState) {
    const { title, body, id } = note;
    const deleteNote = useDeleteNote();

    return (
        <div>
            <h3>{title}</h3>
            <p>{body}</p>
            <Link
                to={`/notes/${id}`}
                state={{ note, page }}
                className="btn btn-light">
                Edit
            </Link>
            <button
                className="btn btn-danger"
                onClick={() => deleteNote(id, page)}>
                    Delete
            </button>
        </div>
    )
}
