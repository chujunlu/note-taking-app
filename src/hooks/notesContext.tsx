import React, {
    createContext,
    useContext,
    useReducer,
    Dispatch
} from "react"

export type NoteType = {
    id: number,
    title: string,
    body: string
}

type NotesState = {
    notes: NoteType[],
    total: number
}

type NotesContextType = [
    NotesState,
    Dispatch<NotesState>
]

type Props = {
    children?: React.ReactNode
}

const NotesContext = createContext<NotesContextType | null>(null);

function notesReducer(state: NotesState, newState: NotesState): NotesState {
    return {...state, ...newState};
}

export function NotesProvider(props: Props) {
    const { children } = props;
    const [state, dispatch] = useReducer(notesReducer, { notes: [], total: 0 });

    return (
        <NotesContext.Provider value={[state, dispatch]} >
            {children}
        </NotesContext.Provider>
    );
}

export function useNotesContext() {
    const context = useContext(NotesContext);

    if (!context) {
        throw new Error('Missing provider');
    }
    return context;
}
