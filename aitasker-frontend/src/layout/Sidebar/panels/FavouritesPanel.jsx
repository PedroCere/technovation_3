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
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-6">
      <div className="flex items-center gap-2">
        <Star className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Your Favourites</h2>
      </div>

      {favourites.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          You haven’t added anything to favourites yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {favourites.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">{item.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.type}</p>
              </div>
              <button
                onClick={() => removeFavourite(item.id)}
                className="text-gray-400 hover:text-red-500"
                title="Remove"
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
