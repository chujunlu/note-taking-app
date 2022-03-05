import {
    useState,
    useCallback,
    ChangeEvent, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { NoteType, useNotesContext } from './notesContext'
import { createNote, editNote } from '../utils/api'
import { notesPerPage } from '../utils/constant'

export function useNoteForm(note?: NoteType, page?: number) {
    const [formData, setFormData] = useState<{ title: string, body: string }>({
        title: note?.title || '',
        body: note?.body || ''
    });

    const navigate = useNavigate();
    const isCreatingNote = note === undefined;
    const [{ total }] = useNotesContext();

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
    }, [formData]);

    const onSubmit = useCallback(
        async (e: SyntheticEvent) => {
            e.preventDefault();

            if (isCreatingNote) {
                // Calculate the last page after creating a note
                const lastPage = total % notesPerPage === 0
                ? total / notesPerPage + 1
                : Math.ceil(total / notesPerPage);

                try {
                    await createNote(formData);
                } finally {
                    setFormData({
                        ...formData,
                        title: '',
                        body: ''
                    })
                    // Go to the last page since newly created note is at the end
                    navigate(`/${lastPage}`);
                }
            } else {
                try {
                    await editNote(note.id, formData);
                } finally {
                    navigate(`/${page}`);
                }
            }
        },
        [formData, isCreatingNote, navigate, note, page, total],
    )

    return {
        formData,
        onChange,
        onSubmit
    }
}
