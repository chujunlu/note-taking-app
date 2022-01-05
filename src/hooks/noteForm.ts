import {
    useState,
    useCallback,
    ChangeEvent, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { NoteType, useNotesContext } from './notesContext'
import { createNote, editNote } from '../utils/api'
import { notesPerPage } from '../utils/constant'

export function useNoteForm(note?: NoteType) {
    const [formData, setFormData] = useState({
        title: note?.title || '',
        body: note?.body || ''
    });

    const navigate = useNavigate();
    const isCreatingNote = note === undefined;

    const [{ total }, _] = useNotesContext();
    const lastPage = total % notesPerPage === 0
        ? total / notesPerPage + 1
        : Math.ceil(total / notesPerPage);

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
                try {
                    await createNote(formData);
                } catch (err) {
                    console.log(err);
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
                } catch (err) {
                    console.log(err);
                } finally {
                    // Todo: Can I go back to where I was before the edit page?
                    navigate('/');
                }
            }
        },
        [formData, isCreatingNote, navigate, note],
    )

    return {
        formData,
        onChange,
        onSubmit
    }
}
