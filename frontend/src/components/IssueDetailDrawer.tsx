import type { Issue } from "../utils/api";

export default function IssueDetailDrawer({ issue, onClose }: { issue: Issue; onClose: () => void }) {
    return (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-4 z-50">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium">Issue {issue.id}</h3>
                <button onClick={onClose} className="px-2 py-1 border rounded">Close</button>
            </div>
            <pre className="text-sm bg-gray-50 p-3 rounded overflow-auto">{JSON.stringify(issue, null, 2)}</pre>
        </div>
    );
}
