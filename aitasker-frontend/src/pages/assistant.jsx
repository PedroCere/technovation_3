import { useEffect, useState } from 'react';
import { FiMic, FiSend } from 'react-icons/fi';
import { getTasks } from '../services/taskService';
import {
  getOptimizationAdvice,
  getAntiProcrastinationAdvice,
} from '../services/adviceService';
import { motion } from 'framer-motion';

const Assistant = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { text: 'How can I help you today?', fromAI: true },
  ]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { text: 'Failed to load your tasks.', fromAI: true },
        ]);
      }
    };
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { text: query, fromAI: false };
    setMessages((prev) => [...prev, userMessage]);
    setQuery('');

    const normalizedQuery = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    try {
      if (normalizedQuery.includes('optimize')) {
        const response = await getOptimizationAdvice(tasks);
        setMessages((prev) => [...prev, { text: response.advice, fromAI: true }]);
      } else if (normalizedQuery.includes('procrastination')) {
        const dummyRequest = {
          habits: { morningRoutine: {}, phoneUsage: {} },
          freeTime: [{ day: 'MONDAY', start: '18:00', end: '20:00' }],
        };
        const response = await getAntiProcrastinationAdvice(dummyRequest);
        setMessages((prev) => [...prev, { text: response.advice, fromAI: true }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text:
              "Sorry, I didn't understand. Try asking about optimization or anti-procrastination.",
            fromAI: true,
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: 'Something went wrong. Please try again later.', fromAI: true },
      ]);
    }
  };

  return (
    <motion.div
      className="min-h-screen px-6 py-8 font-sans transition-colors"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Productivity Assistant</h1>
          <p className="text-sm text-gray-400 mt-1">
            How can I help you today?
          </p>
        </div>

        <div className="bg-[var(--button-bg)] border border-[var(--border-color)] rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="flex-1 p-4 overflow-y-auto scrollbar-custom space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-full w-fit ${
                  msg.fromAI
                    ? 'bg-[var(--button-bg)] text-[var(--text-color)]'
                    : 'bg-[var(--primary-color)] text-white ml-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-color)]">
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
      </div>
    </motion.div>
  );
};

export default Assistant;
