import { Network, Zap } from 'lucide-react';
import { useStore } from '../store';
import { MatchCard } from './MatchCard';
import { motion, AnimatePresence } from 'framer-motion';

export function MatchFeed() {
  const { matches } = useStore();

  return (
    <div className="glass-card-glow" style={{ height: '100%' }}>
      <div className="section-header-between">
        <div className="section-header-left">
          <div className="section-icon section-icon-emerald">
            <Network className="icon-md" style={{ color: 'var(--emerald-400)' }} />
          </div>
          <div>
            <div className="section-title">NEURAL MATCH ENGINE</div>
            <div className="section-subtitle">REAL-TIME ALLOCATION FEED</div>
          </div>
        </div>
        <div className="badge-pill badge-emerald">
          <Zap className="icon-sm" />
          {matches.length}
        </div>
      </div>

      <div className="match-scroll">
        <AnimatePresence mode="popLayout">
          {matches.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-state"
            >
              <div className="empty-icon-box">
                <Network style={{ width: 32, height: 32, color: 'var(--text-muted)' }} />
                <div className="empty-icon-glow" />
              </div>
              <p className="empty-title">No matches yet</p>
              <p className="empty-desc">ADD SELLERS & BUYERS TO BEGIN</p>
            </motion.div>
          ) : (
            [...matches].reverse().map((match) => (
              <MatchCard key={match.id} match={match} />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
