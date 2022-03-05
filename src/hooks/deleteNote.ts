import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useNotesContext } from './notesContext'
import { deleteNote } from '../utils/api';
import { notesPerPage } from '../utils/constant'

export function useDeleteNote() {
    const navigate = useNavigate();
    const [{ total }] = useNotesContext();
    const lastPage = Math.ceil(total / notesPerPage);

    return useCallback(
        async (id, page) => {
            try {
                await deleteNote(id);
            } finally {
                // If the deleted node was the only note at last page,
                // go to a page before
                if (total % notesPerPage === 1 && page === lastPage) {
                    page--;
                    if (page === 0) {
                        page = 1;
                    }
                }
                navigate(`/${page}`);
            }
        }, [navigate, total, lastPage]
    );
}