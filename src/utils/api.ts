import axios from "axios";

const api = axios.create({
    baseURL: 'http://note.dev.cloud.lightform.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

type FormType = {
    title: string,
    body: string
}

export const getNotes = async (page?: number, limit?: string) => {
    // Typescript is expecting this function to return { nodes, total}
    // If catch error here, the return type is undefined. Take care of
    // error catching in the component.
    const res = await api.get(`/notes?page=${page}&limit=${limit}`);
    const { _embedded: { notes }, total } = res.data;
    return { notes, total };
}

export const createNote = async (body: FormType) => {
    try {
        await api.post("/notes", body);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message);
        } else {
            console.error("Failed to create note");
        }
    }
}

export const editNote = async (id: number, body: FormType) => {
    try {
        await api.patch(`/notes/${id}`, body);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message);
        } else {
            console.error("Failed to edit note");
        }
    }
}

export const deleteNote = async (id: number) => {
    try {
        await api.delete(`/notes/${id}`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message);
        } else {
            console.error("Failed to delete note");
        }
    }
}
