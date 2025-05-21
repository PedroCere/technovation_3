import React from 'react';
import { FaPenFancy } from 'react-icons/fa';

function StatBox({ title, value, change, isPositive }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {change > 0 ? '+' : ''}
        {change}%
      </p>
    </div>
  );
}

export default function Dashboard() {
  const articles = [];
  const highlights = [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 relative text-gray-900 dark:text-gray-100">
      
      <div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatBox title="Total artículos" value={3} change={15} isPositive={true} />
          <StatBox title="Total palabras" value={1500} change={-5} isPositive={false} />
          <StatBox title="Última edición" value={'N/A'} change={0} isPositive={true} />
        </div>

        <h2 className="text-2xl font-serif font-semibold text-gray-800 dark:text-gray-200 mb-4">Trabajos recientes</h2>
        {articles.length === 0 ? (
          <div>No articles available</div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.id}>{article.title}</div>
            ))}
          </div>
        )}
      </div>

      
      <aside className="hidden lg:block space-y-8">
        <section>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Blogs de la comunidad</h3>
          <div className="space-y-4">
            {highlights.map((item, idx) => (
              <div key={idx}>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.author} • {item.date}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 dark:bg-gray-800 rounded-xl p-5 shadow">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Escribe en GenAirate</h4>
          </div>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li><FaPenFancy className="inline mr-2 text-gray-500 dark:text-gray-400" /> Guía de nuevos escritores</li>
            <li><FaPenFancy className="inline mr-2 text-gray-500 dark:text-gray-400" /> Consejos para escribir</li>
            <li><FaPenFancy className="inline mr-2 text-gray-500 dark:text-gray-400" /> Cómo ampliar tu audiencia</li>
          </ul>
          <button className="mt-4 w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-300 transition text-sm">
            Empezar a escribir
          </button>
        </section>
      </aside>

   
      <button className="fixed bottom-6 right-6 bg-black dark:bg-white text-white dark:text-black px-5 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-300 transition z-10">
        + Nueva Ta
      </button>
    </div>
  );
}
