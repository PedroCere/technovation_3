import { Star, Trash2 } from 'lucide-react';
import { useState } from 'react';

const initialFavourites = [
  { id: 1, label: 'Redesign Website', type: 'Project' },
  { id: 2, label: 'Weekly Planning', type: 'Task' },
  { id: 3, label: 'Important Notes', type: 'Note' },
];

const FavouritesPanel = () => {
  const [favourites, setFavourites] = useState(initialFavourites);

  const removeFavourite = (id) => {
    setFavourites(favourites.filter(f => f.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl shadow space-y-6" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="flex items-center gap-2">
        <Star className="w-6 h-6" style={{ color: 'var(--primary-color)' }} />
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>Your Favourites</h2>
      </div>

      {favourites.length === 0 ? (
        <p className="text-sm text-center" style={{ color: 'var(--button-text)' }}>
          You haven’t added anything to favourites yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {favourites.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{
                backgroundColor: 'var(--button-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-color)'
              }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>{item.label}</p>
                <p className="text-xs" style={{ color: 'var(--button-text)' }}>{item.type}</p>
              </div>
              <button
                onClick={() => removeFavourite(item.id)}
                className="hover:text-red-500"
                title="Remove"
                style={{ color: 'var(--button-text)' }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouritesPanel;
