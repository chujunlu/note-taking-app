import {
    useState,
    useCallback,
    ChangeEvent, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { NoteType, useNotesContext } from './useNotesContext'
import { createNote, editNote } from '../utils/api'
import { notesPerPage } from '../utils/constant'

export function useNoteForm(note?: NoteType, page?: number) {
    const [title, setTitle] = useState<string>(note?.title || '');
    const [body, setBody] = useState<string>(note?.body || '');

    const navigate = useNavigate();
    const isCreatingNote = note === undefined;
    const [{ total }] = useNotesContext();

    const onTitleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>): void => {
            setTitle(e.target.value);
        }, []
    );

    const onBodyChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>): void => {
            setBody(e.target.value);
        }, []
    );

    const onSubmit = useCallback(
        async (e: SyntheticEvent) => {
            e.preventDefault();

            if (isCreatingNote) {
                // Calculate the last page after creating a note
                const lastPage = total % notesPerPage === 0
                ? total / notesPerPage + 1
                : Math.ceil(total / notesPerPage);

                try {
                    await createNote({ title, body });
                } finally {
                    setTitle('');
                    setBody('');
                    // Go to the last page since newly created note is at the end
                    navigate(`/${lastPage}`);
                }
            } else {
                try {
                    await editNote(note.id, { title, body });
                } finally {
                    if (page) {
                        navigate(`/${page}`);
                    } else {
                        // Click edit from a note detail page. Go back to detail page
                        // after editing
                        navigate(-1);
                    }
                    
                }
            }
        },
        [title, body, isCreatingNote, navigate, note, page, total],
    )

    return {
        title,
        onTitleChange,
        body,
        onBodyChange,
        onSubmit
    }
}
