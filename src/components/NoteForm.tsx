import React from "react"
import { useLocation } from "react-router-dom"

import { useNoteForm } from "../hooks/noteForm"
import { NoteType } from '../hooks/notesContext'

interface LocationState {
    note: NoteType
}

export function NoteForm() {
    const location = useLocation();

    let currentNote = undefined;
    if (location.state !== null) {
        const { note } = location.state as LocationState;
        currentNote = note;
    }

    const {
        formData: { title, body },
        onChange,
        onSubmit
    } = useNoteForm(currentNote);

    return (
        <div>
            <form className="form my-1" onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Add note title"
                    name="title"
                    value={title}
                    onChange={onChange}
                    required
                />
                <textarea
                    name="body"
                    cols={30}
                    rows={5}
                    placeholder="Add note body"
                    value={body}
                    onChange={onChange}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}
