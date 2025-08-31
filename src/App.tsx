import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { WeatherDashboard } from './components/WeatherDashboard';
import { PlaceholderContent } from './components/PlaceholderContent';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('weather');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <PlaceholderContent
            title="Overview Dashboard"
            description="Get a comprehensive view of all your data in one place. This section will display key metrics and summaries."
          />
        );
      case 'weather':
        return <WeatherDashboard />;
      case 'traffic':
        return (
          <PlaceholderContent
            title="Traffic Information"
            description="Real-time traffic updates and route planning features will be available here to help you navigate efficiently."
          />
        );
      case 'map':
        return (
          <PlaceholderContent
            title="Interactive Map"
            description="Explore weather patterns, traffic conditions, and points of interest on an interactive map interface."
          />
        );
      case 'market':
        return (
          <PlaceholderContent
            title="Share Market"
            description="Stay updated with the latest stock market trends, financial news, and investment insights."
          />
        );
      case 'news':
        return (
          <PlaceholderContent
            title="News & Events"
            description="Stay informed with the latest news, weather alerts, and upcoming events in your area."
          />
        );
      default:
        return <WeatherDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Mobile header */}
          <div className="lg:hidden bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={toggleSidebar}
                className="text-white hover:bg-slate-700 p-2 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-bold text-white">SmartSky</h1>
              <div className="w-10" /> {/* Spacer */}
            </div>
          </div>

          {/* Main content */}
      <main className="flex-1 p-6 lg:p-8">
  <div className="max-w-7xl mx-auto">
    {renderContent()}
  </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;