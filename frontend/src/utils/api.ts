import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export type Issue = {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority: string;
    assignee?: string | null;
    createdAt: string;
    updatedAt: string;
};


export type ListResponse = {
    items: Issue[];
    total: number;
    page: number;
    pageSize: number;
};


export const getIssues = (params: Record<string, any>) => API.get<ListResponse>("/issues", { params }).then(r => r.data);
export const getIssue = (id: string) => API.get<Issue>(`/issues/${id}`).then(r => r.data);
export const createIssue = (payload: Partial<Issue>) => API.post<Issue>(`/issues`, payload).then(r => r.data);
export const updateIssue = (id: string, payload: Partial<Issue>) => API.put<Issue>(`/issues/${id}`, payload).then(r => r.data);