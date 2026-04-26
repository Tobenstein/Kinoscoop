import { useState } from 'react';
import { Film, Home, BarChart3, FileText, Calendar, Upload, User, Trophy } from 'lucide-react';
import { HomePageManager } from './admin/HomePageManager';
import { AboutMeManager } from './admin/AboutMeManager';
import { LogManager } from './admin/LogManager';
import { StatsManager } from './admin/StatsManager';
import { CommentaryManager } from './admin/CommentaryManager';
import { AnalyticsDataManager } from './admin/AnalyticsDataManager';
import { CSVImporter } from './admin/CSVImporter';
import { ChallengesManager } from './admin/ChallengesManager';

type AdminTab = 'home' | 'about' | 'log' | 'stats' | 'reviews' | 'analytics' | 'challenges' | 'import';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('home');

  const tabs = [
    { id: 'home' as AdminTab, label: 'Home Page', icon: Home },
    { id: 'about' as AdminTab, label: 'About Me', icon: User },
    { id: 'challenges' as AdminTab, label: 'Challenges', icon: Trophy },
    { id: 'log' as AdminTab, label: 'Log Movies', icon: Film },
    { id: 'stats' as AdminTab, label: 'Stats', icon: BarChart3 },
    { id: 'reviews' as AdminTab, label: 'Commentary', icon: FileText },
    { id: 'analytics' as AdminTab, label: 'Analytics', icon: Calendar },
    { id: 'import' as AdminTab, label: 'Import CSV', icon: Upload },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePageManager />;
      case 'about':
        return <AboutMeManager />;
      case 'challenges':
        return <ChallengesManager />;
      case 'log':
        return <LogManager />;
      case 'stats':
        return <StatsManager />;
      case 'reviews':
        return <CommentaryManager />;
      case 'analytics':
        return <AnalyticsDataManager />;
      case 'import':
        return <CSVImporter />;
      default:
        return <HomePageManager />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">The Batcave</h1>
        <p className="text-muted-foreground">Manage your Kinoscoop content</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground border border-border hover:bg-accent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>{renderContent()}</div>
    </div>
  );
}
