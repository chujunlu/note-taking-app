import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { NoteType } from "./useNotesContext";
import { getNote } from "../utils/api";

export function useFetchNote() {
    const navigate = useNavigate();
    const [note, setNote] = useState<NoteType>({
        id: NaN,
        title: '',
        body: ''
    });

    const fetchNote = useCallback(
        async (id: string) => {
            try {
                const note = await getNote(id);
                setNote(note);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error(error.message);
                } else {
                    console.error(`Failed to get note (${id})`);
                }

                navigate('not-found');
            }
        }, [navigate]
    );

    return {
        note,
        fetchNote
    }
}