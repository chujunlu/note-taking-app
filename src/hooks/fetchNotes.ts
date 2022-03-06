import axios from "axios";

import { useCallback } from 'react'
import { useNotesContext } from './notesContext'
import { getNotes } from '../utils/api'
import { notesPerPage } from '../utils/constant';

export function useFetchNotes() {
    const [, dispatch] = useNotesContext();

    return useCallback(
        async (page, limit=notesPerPage.toString()): Promise<void> => {
            if (isNaN(Number(page))) {
                page = '1';
            }

            try {
                const { notes, total } = await getNotes(page, limit);
                dispatch({ notes, total });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error(error.message);
                } else {
                    console.error("Failed to get all notes");
                }
            }
        }, [dispatch]
    );
}
