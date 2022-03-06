import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useFetchNote } from "../hooks/fetchNote";

export function NoteDetail() {
    const navigate = useNavigate();
    const { id = '1' } = useParams<{ id: string }>();
    const { note, fetchNote } = useFetchNote();

    if (isNaN(Number(id))) {
        navigate('not-found');
    }

    useEffect(() => {
        fetchNote(id);
    }, [fetchNote, id]);

    return (
        <div>
            <h1>{note.title}</h1>
            <p>{note.body}</p>
            <Link
                to={`/edit-note/${note.id}`}
                state={{ note }}
                className="btn btn-light">
                Edit
            </Link>
        </div>
    );
}
