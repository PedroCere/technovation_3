
import { useState } from 'react';
import { FiMic, FiSend } from 'react-icons/fi';
import IARecommendations from '../features/ai/IARecommendations';

const Assistant = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { text: '¿En qué puedo ayudarte hoy?', fromAI: true }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setMessages([...messages, { text: query, fromAI: false }]);
    setQuery('');
    
   
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: `He analizado tu consulta sobre "${query}". Aquí tienes algunas recomendaciones:`, 
        fromAI: true 
      }]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-medium">Asistente de Productividad</h3>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`p-3 rounded-lg ${msg.fromAI ? 'bg-gray-50' : 'bg-blue-50 text-blue-800 ml-auto max-w-xs'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pregunta algo al asistente..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <button 
            type="button" 
            className="p-2 text-gray-500 hover:text-red-500"
          >
            <FiMic />
          </button>
          <button 
            type="submit" 
            className="p-2 text-red-500 hover:text-red-600"
          >
            <FiSend />
          </button>
        </form>
      </div>

      <div className="p-4 border-t">
        <IARecommendations />
      </div>
    </div>
  );
};

export default Assistant;