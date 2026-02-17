import { Factory, Network, BarChart3, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export type MobileTab = 'forms' | 'matches' | 'analytics' | 'pool';

interface MobileNavProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  matchCount: number;
  unallocatedCount: number;
}

const tabs: { id: MobileTab; label: string; icon: typeof Factory }[] = [
  { id: 'forms', label: 'Entry', icon: Factory },
  { id: 'matches', label: 'Matches', icon: Network },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'pool', label: 'Pool', icon: AlertTriangle },
];

export function MobileNav({ activeTab, onTabChange, matchCount, unallocatedCount }: MobileNavProps) {
  return (
    <nav className="mobile-nav">
      <div className="mobile-nav-inner">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const badge =
            tab.id === 'matches' ? matchCount :
              tab.id === 'pool' ? unallocatedCount : 0;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`mobile-nav-btn ${isActive ? 'mobile-nav-btn-active' : ''}`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-tab-bg"
                  className="mobile-nav-btn-active-bg"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <Icon className="icon-lg mobile-nav-icon" />

              {badge > 0 && (
                <span className="mobile-nav-badge">
                  {badge > 9 ? '•' : badge}
                </span>
              )}

              <span className="mobile-nav-btn-label">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
