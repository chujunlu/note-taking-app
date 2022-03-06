import React from "react"
import { useLocation } from "react-router-dom"

import { NoteState } from './Note'
import { useNoteForm } from "../hooks/useNoteForm"

export function NoteForm() {
    const location = useLocation();

    let currentNote;
    let currentPage;

    if (location.state !== null) {
        const { note, page } = location.state as NoteState;
        currentNote = note;
        currentPage = page;
    }

    const {
        title,
        body,
        onTitleChange,
        onBodyChange,
        onSubmit
    } = useNoteForm(currentNote, currentPage);

    return (
        <div>
            <form className="form-group my-1" onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Add note title"
                    name="title"
                    value={title}
                    onChange={onTitleChange}
                    required
                />
                <textarea
                    name="body"
                    cols={30}
                    rows={5}
                    placeholder="Add note body"
                    value={body}
                    onChange={onBodyChange}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}
