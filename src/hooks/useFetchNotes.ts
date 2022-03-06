import axios from "axios";

import { useCallback } from 'react'
import { useNavigate } from "react-router-dom";

import { useNotesContext } from './useNotesContext'
import { getNotes } from '../utils/api'
import { notesPerPage } from '../utils/constant';

export function useFetchNotes() {
    const navigate = useNavigate();
    const [, dispatch] = useNotesContext();

    return useCallback(
        async (page, limit=notesPerPage.toString()): Promise<void> => {
            if (isNaN(Number(page))) {
                navigate('not-found');
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
        }, [navigate, dispatch]
    );
}
