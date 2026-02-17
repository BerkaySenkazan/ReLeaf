import { useState } from 'react';
import { Header } from './components/Header';
import { SellerForm } from './components/SellerForm';
import { BuyerForm } from './components/BuyerForm';
import { MatchFeed } from './components/MatchFeed';
import { UnallocatedPool } from './components/UnallocatedPool';
import { Analytics } from './components/Analytics';
import { MobileNav, type MobileTab } from './components/MobileNav';
import { useStore } from './store';

function App() {
  const [activeTab, setActiveTab] = useState<MobileTab>('forms');
  const { matches, getUnallocatedSellers } = useStore();
  const unallocated = getUnallocatedSellers();

  return (
    <div className="app-wrapper">
      <div className="scene-bg">
        <div className="glow-orb-secondary" />
        <div className="scene-fade" />
      </div>

      <div className="app-content">
        <Header />

        <main className="main-area">
          <div className="desktop-layout">
            <div className="col-left">
              <SellerForm />
              <BuyerForm />
              <UnallocatedPool />
            </div>
            <div className="col-center">
              <MatchFeed />
            </div>
            <div className="col-right">
              <Analytics />
            </div>
          </div>

          <div className="mobile-layout">
            {activeTab === 'forms' && (
              <div className="mobile-forms-stack">
                <SellerForm />
                <BuyerForm />
              </div>
            )}
            {activeTab === 'matches' && <MatchFeed />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'pool' && <UnallocatedPool />}
          </div>
        </main>

        <footer className="app-footer">
          ReLeaf DES v1.0 • NEURAL WASTE EXCHANGE PROTOCOL
        </footer>
      </div>

      <MobileNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        matchCount={matches.length}
        unallocatedCount={unallocated.length}
      />
    </div>
  );
}

export default App;
