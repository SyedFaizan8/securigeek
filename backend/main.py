from fastapi import FastAPI, HTTPException, Query, Path
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime, timezone
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Small Issue Tracker")

# Allow local dev origins (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class IssueBase(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = ""
    status: str = "open"          # open, in-progress, closed
    priority: str = "medium"      # low, medium, high
    assignee: Optional[str] = None

class IssueCreate(IssueBase):
    pass

class IssueUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    status: Optional[str]
    priority: Optional[str]
    assignee: Optional[str]

class Issue(IssueBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

# In-memory store (for demo)
_issues: Dict[str, Dict[str, Any]] = {}
_next_id = 0

def now_utc():
    return datetime.now(timezone.utc)

def seed():
    global _next_id
    sample = [
        {"title": "Login page error", "description": "Fails on invalid token", "status": "open", "priority": "high", "assignee": "Alice"},
        {"title": "Add dark mode", "description": "Many users requested this", "status": "in-progress", "priority": "medium", "assignee": "Bob"},
        {"title": "Typo in footer", "description": "Small copy fix", "status": "closed", "priority": "low", "assignee": None},
    ]
    for s in sample:
        _next_id += 1
        sid = str(_next_id)
        t = now_utc()
        _issues[sid] = {**s, "id": sid, "createdAt": t, "updatedAt": t}

seed()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/issues")
def list_issues(
    search: Optional[str] = Query(None, description="search in title or description"),
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    assignee: Optional[str] = Query(None),
    sortBy: str = Query("updatedAt"),
    sortOrder: str = Query("desc"),  # asc or desc
    page: int = Query(1, ge=1),
    pageSize: int = Query(10, ge=1, le=100),
):
    items = list(_issues.values())

    if search:
        s = search.lower()
        items = [it for it in items if s in (it.get("title","").lower() + " " + (it.get("description") or "").lower())]

    if status:
        items = [it for it in items if (it.get("status") or "").lower() == status.lower()]
    if priority:
        items = [it for it in items if (it.get("priority") or "").lower() == priority.lower()]
    if assignee:
        items = [it for it in items if (it.get("assignee") or "") == assignee]

    reverse = sortOrder.lower() != "asc"
    if sortBy not in {"id","title","status","priority","assignee","createdAt","updatedAt"}:
        sortBy = "updatedAt"

    def sort_key(x):
        val = x.get(sortBy)
        return val if val is not None else ""

    items.sort(key=sort_key, reverse=reverse)

    total = len(items)
    start = (page - 1) * pageSize
    page_items = items[start:start+pageSize]

    return {"items": page_items, "total": total, "page": page, "pageSize": pageSize}

@app.get("/issues/{issue_id}")
def get_issue(issue_id: str = Path(...)):
    it = _issues.get(issue_id)
    if not it:
        raise HTTPException(status_code=404, detail="Issue not found")
    return it

@app.post("/issues", status_code=201)
def create_issue(payload: IssueCreate):
    global _next_id
    _next_id += 1
    sid = str(_next_id)
    t = now_utc()
    obj = payload.dict()
    obj.update({"id": sid, "createdAt": t, "updatedAt": t})
    _issues[sid] = obj
    return obj

@app.put("/issues/{issue_id}")
def update_issue(payload: IssueUpdate, issue_id: str = Path(...)):
    it = _issues.get(issue_id)
    if not it:
        raise HTTPException(status_code=404, detail="Issue not found")
    data = payload.dict(exclude_unset=True)
    for k,v in data.items():
        it[k] = v
    it["updatedAt"] = now_utc()
    _issues[issue_id] = it
    return it

# Allow direct `python main.py` for quick dev convenience
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
