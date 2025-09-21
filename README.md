# Contact Book — Fullstack Assignment

## Overview
Simple responsive Contact Book web app with:
- React frontend (responsive form + contact list)
- Node.js + Express backend with SQLite database
- REST API with pagination
- Input validation (frontend + backend)

## Quick start

### Backend
1. `cd backend`
2. `npm install`
3. `node index.js`  (server starts on port 5000)

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start` (React dev server on port 3000)
- The frontend expects the backend at `http://localhost:5000`.
- In production, serve frontend build and point API requests to backend.

## Notes
- The backend uses SQLite (file `contacts.db`) — no external DB required.
- The GET /contacts endpoint supports pagination: `/contacts?page=1&limit=10`.
- To push to GitHub:
  ```
  git init
  git add .
  git commit -m "Initial Contact Book"
  gh repo create <your-repo-name> --public --source=. --remote=origin
  git push -u origin main
  ```
