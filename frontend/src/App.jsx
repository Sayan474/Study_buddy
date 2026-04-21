import { useEffect, useState } from "react";
import { fetchHistory } from "./api";
import AuthPanel from "./components/AuthPanel";
import ChatShell from "./components/ChatShell";

const SESSION_KEY = "study_bot_user";

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [messages, setMessages] = useState([]);
  const [historyError, setHistoryError] = useState("");

  useEffect(() => {
    if (!user?.user_id) {
      setMessages([]);
      return;
    }

    async function loadHistory() {
      setHistoryError("");
      try {
        const response = await fetchHistory(user.user_id); 
        setMessages(response.history || []);
      } catch (error) {
        const message = error.message || "Unable to load chat history";
        if (message.toLowerCase().includes("user not found")) {
          handleLogout();
          setHistoryError("Session expired. Please login again.");
          return;
        }
        setHistoryError(message);
      }
    }

    loadHistory();
  }, [user]);

  function handleAuthSuccess(nextUser) {
    setUser(nextUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
  }

  function handleLogout() {
    setUser(null);
    setMessages([]);
    localStorage.removeItem(SESSION_KEY);
  }

  return (
    <main className="app-bg">
      <div className="bg-orbit bg-orbit-1" aria-hidden="true" />
      <div className="bg-orbit bg-orbit-2" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <div className="app-frame">
        {!user ? (
          <AuthPanel onAuthSuccess={handleAuthSuccess} />
        ) : (
          <>
            {historyError && <p className="form-error top-error">{historyError}</p>}
            <ChatShell
              user={user}
              messages={messages}
              setMessages={setMessages}
              onLogout={handleLogout}
            />
          </>
        )}
      </div>
    </main>
  );
}
