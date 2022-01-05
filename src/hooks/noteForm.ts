import {
    useState,
    useCallback,
    ChangeEvent, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { NoteType } from './notesContext'
import { editNote } from '../utils/api'

export function useNoteForm(note?: NoteType) {
    const [formData, setFormData] = useState({
        title: note?.title || '',
        body: note?.body || ''
    });

    const navigate = useNavigate();
    const isCreatingNote = note === undefined;

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
                // call create note
                // set title and body back to empty string
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
