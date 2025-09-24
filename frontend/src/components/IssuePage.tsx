import { useEffect, useState } from "react";
import { createIssue, getIssues, updateIssue, type Issue } from "../utils/api";
import IssueForm from "./IssueForm";
import IssueDetailDrawer from "./IssueDetailDrawer";

export default function IssuesPage() {
    const [items, setItems] = useState<Issue[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [assignee, setAssignee] = useState("");
    const [sortBy, setSortBy] = useState("updatedAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const [showCreate, setShowCreate] = useState(false);
    const [editing, setEditing] = useState<Issue | null>(null);
    const [selected, setSelected] = useState<Issue | null>(null);

    const fetch = async () => {
        const data = await getIssues({ search, status, priority, assignee, sortBy, sortOrder, page, pageSize });
        setItems(data.items);
        setTotal(data.total);
    };

    useEffect(() => { fetch(); }, [search, status, priority, assignee, sortBy, sortOrder, page, pageSize]);

    const onCreate = async (payload: Partial<Issue>) => {
        await createIssue(payload);
        setShowCreate(false);
        fetch();
    };

    const onEdit = async (id: string, payload: Partial<Issue>) => {
        await updateIssue(id, payload);
        setEditing(null);
        fetch();
    };

    const toggleSort = (field: string) => {
        if (sortBy === field) setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
        else { setSortBy(field); setSortOrder("asc"); }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Issue Tracker</h1>
                <button onClick={() => setShowCreate(true)} className="bg-blue-600 text-white px-3 py-1 rounded">Create Issue</button>
            </div>

            <div className="flex gap-2 mb-4 items-center">
                <input className="border rounded px-2 py-1" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search title/desc" />
                <select className="border rounded px-2 py-1" value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="">All status</option>
                    <option value="open">open</option>
                    <option value="in-progress">in-progress</option>
                    <option value="closed">closed</option>
                </select>
                <select className="border rounded px-2 py-1" value={priority} onChange={e => setPriority(e.target.value)}>
                    <option value="">All priority</option>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>
                <input className="border rounded px-2 py-1" value={assignee} onChange={e => setAssignee(e.target.value)} placeholder="Assignee" />
            </div>

            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead className="table-header">
                        <tr>
                            <th className="px-3 py-2 text-left cursor-pointer" onClick={() => toggleSort("id")}>id</th>
                            <th className="px-3 py-2 text-left cursor-pointer" onClick={() => toggleSort("title")}>title</th>
                            <th className="px-3 py-2 text-left cursor-pointer" onClick={() => toggleSort("status")}>status</th>
                            <th className="px-3 py-2 text-left cursor-pointer" onClick={() => toggleSort("priority")}>priority</th>
                            <th className="px-3 py-2 text-left cursor-pointer" onClick={() => toggleSort("assignee")}>assignee</th>
                            <th className="px-3 py-2 text-left cursor-pointer" onClick={() => toggleSort("updatedAt")}>updatedAt</th>
                            <th className="px-3 py-2">actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(it => (
                            <tr key={it.id} className="border-t hover:bg-gray-50" onClick={(e) => { if ((e.target as HTMLElement).tagName !== 'BUTTON') setSelected(it); }} style={{ cursor: 'pointer' }}>
                                <td className="px-3 py-2">{it.id}</td>
                                <td className="px-3 py-2">{it.title}</td>
                                <td className="px-3 py-2">{it.status}</td>
                                <td className="px-3 py-2">{it.priority}</td>
                                <td className="px-3 py-2">{it.assignee}</td>
                                <td className="px-3 py-2">{new Date(it.updatedAt).toLocaleString()}</td>
                                <td className="px-3 py-2"><button onClick={(e) => { e.stopPropagation(); setEditing(it); }} className="px-2 py-1 bg-gray-200 rounded">Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center gap-3">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-2 py-1 border rounded">Prev</button>
                <div>Page {page}</div>
                <button onClick={() => setPage(p => p + 1)} className="px-2 py-1 border rounded">Next</button>
                <select className="border rounded px-2 py-1" value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
                <div>Total: {total}</div>
            </div>

            {showCreate && <IssueForm onClose={() => setShowCreate(false)} onSubmit={onCreate} />}
            {editing && <IssueForm initial={editing} onClose={() => setEditing(null)} onSubmit={(p) => onEdit(editing!.id, p)} />}
            {selected && <IssueDetailDrawer issue={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}
