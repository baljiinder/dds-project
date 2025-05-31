
import React, { useState } from 'react';
import axios from 'axios';

const ChatAssistant = () => {
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    const res = await axios.post('http://localhost:8000/chatbot-reply', { query });
    setReply(res.data.reply);
  };

  return (
    <div className="card border-0 shadow mb-4">
      <div className="card-body">
        <h4 className="card-title">Chat Assistant</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Ask me anything..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <button className="btn btn-primary">Send</button>
        </form>
        {reply && (
          <div className="mt-3 p-3 bg-light border rounded">
            <strong>Assistant:</strong> {reply}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatAssistant;
