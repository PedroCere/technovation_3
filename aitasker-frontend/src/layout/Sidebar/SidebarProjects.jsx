import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SidebarProjects = ({ primaryColor = 'var(--primary-color)' }) => {
  const navigate = useNavigate();
  const projects = [{ name: 'Mythings', count: 5 }];

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="mt-6 px-2">
      <div className={`flex items-center justify-between text-xs uppercase font-semibold mb-2 text-[${primaryColor}]`}>
        <span>My Projects</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[${primaryColor}]`} />
      </div>
      <ul>
        {projects.map((proj, i) => (
          <li
            key={i}
            onClick={() => handleClick('/mythings')}
            className={`flex justify-between items-center px-2 py-1.5 rounded-md hover:bg-[${primaryColor}33] cursor-pointer`}
          >
            <div className="flex items-center gap-2">
              <span className={`text-xs text-[${primaryColor}]`}>#</span>
              <span className="text-sm">{proj.name}</span>
            </div>
            <span className={`text-xs font-semibold text-[${primaryColor}]`}>{proj.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarProjects;
