import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SidebarProjects = () => {
  const navigate = useNavigate();
  const projects = [{ name: 'Mythings', count: 5 }];

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="mt-6 px-2">
      <div className="flex items-center justify-between text-xs text-gray-500 uppercase font-semibold mb-2">
        <span>My Projects</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </div>
      <ul>
        {projects.map((proj, i) => (
          <li
            key={i}
            onClick={() => handleClick('/mythings')}
            className="flex justify-between items-center px-2 py-1.5 rounded-md hover:bg-red-100 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">#</span>
              <span className="text-sm">{proj.name}</span>
            </div>
            <span className="text-xs font-semibold text-gray-500">{proj.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarProjects;
