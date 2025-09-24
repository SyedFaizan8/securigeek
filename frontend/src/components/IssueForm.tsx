import React, { useState } from "react";
import type { Issue } from "../utils/api";

export default function IssueForm({ initial, onClose, onSubmit }:
    { initial?: Issue | null; onClose: () => void; onSubmit: (payload: any) => Promise<void>; }) {
    const [title, setTitle] = useState(initial?.title || "");
    const [description, setDescription] = useState(initial?.description || "");
    const [status, setStatus] = useState(initial?.status || "open");
    const [priority, setPriority] = useState(initial?.priority || "medium");
    const [assignee, setAssignee] = useState(initial?.assignee || "");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({ title, description, status, priority, assignee });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <form onSubmit={submit} className="bg-white p-6 rounded shadow w-96">
                <h3 className="text-lg font-medium mb-3">{initial ? 'Edit Issue' : 'Create Issue'}</h3>
                <div className="mb-2">
                    <label className="block text-sm">Title</label>
                    <input className="w-full border rounded px-2 py-1" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="mb-2">
                    <label className="block text-sm">Description</label>
                    <textarea className="w-full border rounded px-2 py-1" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label className="block text-sm">Status</label>
                    <select className="w-full border rounded px-2 py-1" value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="open">open</option>
                        <option value="in-progress">in-progress</option>
                        <option value="closed">closed</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block text-sm">Priority</label>
                    <select className="w-full border rounded px-2 py-1" value={priority} onChange={e => setPriority(e.target.value)}>
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="block text-sm">Assignee</label>
                    <input className="w-full border rounded px-2 py-1" value={assignee || ''} onChange={e => setAssignee(e.target.value)} />
                </div>
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
                    <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                </div>
            </form>
        </div>
    );
}
