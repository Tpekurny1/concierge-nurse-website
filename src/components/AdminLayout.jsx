import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Tag, Send, Settings, LogOut, GitBranch, Workflow } from 'lucide-react';
import { supabase } from '../lib/supabase';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Leads', path: '/admin/leads', icon: Users },
  { label: 'Pipelines', path: '/admin/pipelines', icon: GitBranch },
  { label: 'Segments', path: '/admin/segments', icon: Tag },
  { label: 'Campaigns', path: '/admin/campaigns', icon: Send },
  { label: 'Sequences', path: '/admin/sequences', icon: Workflow },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="w-56 bg-navy flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="no-underline">
            <p className="font-heading text-sm font-bold text-white tracking-wide">CNBS</p>
            <p className="text-white/40 text-[0.6rem] tracking-widest uppercase">Admin</p>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 text-sm no-underline transition-colors ${
                  isActive
                    ? 'bg-white/10 text-gold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/40 hover:text-white transition-colors w-full"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
