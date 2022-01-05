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

export const getNotes = async (page?: string, limit?: string) => {
    try {
        const res = await api.get(`/notes?page=${page}&limit=${limit}`);
        const { _embedded: { notes }, total } = res.data;
        return { notes, total };
    } catch (err) {
        throw new Error();
    }
}

export const editNote = async (id: number, body: FormType) => {
    try {
        await api.patch(`/notes/${id}`, body);
    } catch (err) {
        throw new Error();
    }
}
