import { Film, BarChart3, MessageSquare, Trophy, Info, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Film },
    { path: '/archives', label: 'The Archives', icon: BarChart3 },
    { path: '/reviews', label: 'Reviews', icon: MessageSquare },
    { path: '/challenges', label: 'Challenges', icon: Trophy },
    { path: '/about', label: 'About Me', icon: Info },
    { path: '/admin', label: 'Admin', icon: Lock },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Film className="w-6 h-6 text-primary" />
            <h1 className="text-xl text-primary font-semibold">Kinoscoop</h1>
          </div>

          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
