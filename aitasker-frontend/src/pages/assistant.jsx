import { useEffect, useState } from 'react';
import { FiMic, FiSend } from 'react-icons/fi';
import { getTasks } from '../services/taskService';
import {
  getOptimizationAdvice,
  getAntiProcrastinationAdvice
} from '../services/adviceService';

const Assistant = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { text: 'How can I help you today?', fromAI: true }
  ]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setMessages(prev => [
          ...prev,
          { text: 'Failed to load your tasks.', fromAI: true }
        ]);
      }
    };
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { text: query, fromAI: false };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');

    const normalizedQuery = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    try {
      if (normalizedQuery.includes('optimize') || normalizedQuery.includes('optimization')) {
        const response = await getOptimizationAdvice(tasks);
        setMessages(prev => [...prev, { text: response.advice, fromAI: true }]);
      } else if (normalizedQuery.includes('procrastinate') || normalizedQuery.includes('procrastination')) {
        const dummyRequest = {
          habits: {
            morningRoutine: {},
            phoneUsage: {}
          },
          freeTime: [
            { day: 'MONDAY', start: '18:00', end: '20:00' }
          ]
        };
        const response = await getAntiProcrastinationAdvice(dummyRequest);
        setMessages(prev => [...prev, { text: response.advice, fromAI: true }]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            text: "Sorry, I didn't understand. Try asking about optimization or anti-procrastination.",
            fromAI: true
          }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { text: 'Something went wrong. Please try again later.', fromAI: true }
      ]);
    }
  };

  return (
    <div className="rounded-lg shadow overflow-hidden h-full flex flex-col bg-[var(--bg-color)] text-[var(--text-color)] transition-colors">
      <div className="p-4 border-b border-[var(--border-color)]">
        <h3 className="font-medium">Productivity Assistant</h3>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-xs ${
              msg.fromAI
                ? 'bg-[var(--button-bg)] text-[var(--text-color)]'
                : 'bg-[var(--primary-color)] text-white ml-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[var(--border-color)]">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask something like 'Give me optimization tips'"
            className="flex-1 p-2 rounded-lg bg-[var(--input-bg)] text-[var(--text-color)] border border-[var(--input-border)] placeholder-opacity-70 focus:ring-2 focus:ring-[var(--primary-color)] outline-none transition"
          />
          <button
            type="button"
            className="p-2 text-[var(--text-color)]/60 hover:text-[var(--primary-color)]"
            title="Voice input (not implemented)"
          >
            <FiMic />
          </button>
          <button
            type="submit"
            className="p-2 text-[var(--primary-color)] hover:text-[var(--primary-color-hover)]"
            title="Send"
          >
            <FiSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Assistant;
