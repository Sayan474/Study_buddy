# Study_bot

AI Study Assistant with FastAPI backend + MongoDB persistence + React frontend.

## Features

- Separate user signup and login
- Each account receives a unique `user_id`
- Chat history is stored and retrieved per `user_id`
- Academic-focused assistant (study/science related responses)
- Modern responsive frontend with a science-inspired design

## Backend Setup (FastAPI)

1. Create and activate a Python virtual environment.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create `.env` in the project root:

```env
GROQ_API_KEY=your_groq_api_key
MONGODB_URI=your_mongodb_connection_string
```

4. Start backend:

```bash
uvicorn app:app --reload
```

Backend runs on `http://127.0.0.1:8000`.

## Frontend Setup (React + Vite)

1. Open a new terminal and go to frontend:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` from example:

```bash
cp .env.example .env
```

For Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

4. Start frontend:

```bash
npm run dev
```

Frontend runs on `http://127.0.0.1:5173` by default.

## API Endpoints

- `POST /auth/signup`
- `POST /auth/login`
- `GET /chat/history/{user_id}`
- `POST /chat`

## Project Structure

```text
Study_bot/
	app.py
	requirements.txt
	frontend/
		src/
			components/
			App.jsx
			api.js
			styles.css
```
