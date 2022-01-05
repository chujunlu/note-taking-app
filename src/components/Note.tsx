import React from "react";
import { Link } from "react-router-dom"

import { NoteType } from '../hooks/notesContext'

export function Note({ note } : { note: NoteType }) {
    const { title, body, id } = note;

    return (
        <div>
            <h3>{title}</h3>
            <p>{body}</p>
            {/* Is it possible to pass note object to the linked component */}
            <Link
                to={`/notes/${id}`}
                state={{ note }}
                className="btn btn-light">
                Edit
            </Link>
            <button className="btn btn-danger">Delete</button>
        </div>
    )
}
