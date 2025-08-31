import React from 'react';
import { 
  Home, 
  Cloud, 
  Car, 
  Map, 
  TrendingUp, 
  Calendar,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'weather', label: 'Weather', icon: Cloud },
  { id: 'traffic', label: 'Traffic', icon: Car },
  { id: 'map', label: 'Map', icon: Map },
  { id: 'market', label: 'Share Market', icon: TrendingUp },
  { id: 'news', label: 'News & Events', icon: Calendar },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onToggle, 
  activeTab, 
  onTabChange 
}) => {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`
          fixed inset-0 bg-black/50 transition-opacity duration-300
          lg:hidden z-40
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={onToggle}
      />

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-gradient-to-b from-slate-900 to-slate-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">SmartSky</h1>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onTabChange(item.id);
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                      text-left transition-all duration-200
                      ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <p className="text-xs text-slate-400 text-center">
            Powered by WeatherAPI
          </p>
        </div>
      </div>
    </>
  );
};
