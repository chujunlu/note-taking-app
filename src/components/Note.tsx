import React from "react";

import { NoteType } from '../hooks/notesContext'

export function Note({ note: { title, body} } : { note: NoteType }) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{body}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}
