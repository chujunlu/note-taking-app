import { useCallback } from 'react'
import { useNotesContext } from './notesContext'
import { getNotes } from '../utils/api'
import { notesPerPage } from '../utils/constant';

export function useFetchNotes() {
    const [, dispatch] = useNotesContext();

    return useCallback(
        async (page='1', limit=notesPerPage.toString()) => {
            const { notes, total } = await getNotes(page, limit);
            dispatch({ notes, total });
        }, [dispatch]
    );
}
