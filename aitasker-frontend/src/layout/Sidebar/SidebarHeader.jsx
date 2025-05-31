// SidebarHeader.jsx
import { User, Bell, Layout } from 'lucide-react';
import SidebarUserMenu from './SidebarUserMenu';

const SidebarHeader = ({ collapsed, onToggleSidebar }) => {
  return (
    <div className="flex items-center justify-between p-4 relative text-[var(--text-color)]">
      {!collapsed ? (
        <>
          <SidebarUserMenu />
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[var(--text-color)] cursor-pointer" />
            <button
              onClick={onToggleSidebar}
              className="p-1 rounded hover:bg-[var(--primary-color-hover)] transition"
              title="Collapse Sidebar"
            >
              <Layout className="w-4 h-4 text-[var(--text-color)]" />
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={onToggleSidebar}
          className="p-1 rounded hover:bg-[var(--primary-color-hover)] transition ml-2"
          title="Expand Sidebar"
        >
          <Layout className="w-5 h-5 text-[var(--text-color)]" />
        </button>
      )}
    </div>
  );
};

export default SidebarHeader;