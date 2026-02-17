import { motion } from 'framer-motion';
import { Link2, Clock, ChevronDown } from 'lucide-react';
import type { Match } from '../store';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="match-card"
    >
      <div className="match-card-header">
        <div className="match-card-header-left">
          <div className="match-status-dot" />
          <Link2 className="icon-sm" style={{ color: 'var(--emerald-400)' }} />
          <span className="match-label">MATCH</span>
        </div>
        <div className="match-time">
          <Clock className="icon-sm" />
          {formatTime(match.timestamp)}
        </div>
      </div>

      <div className="match-card-body">
        <div className="match-buyer-box">
          <div className="match-buyer-label">BUYER</div>
          <div className="match-buyer-name">{match.buyer.companyName}</div>
          <div className="match-buyer-meta">
            <span className="dim">{match.buyer.wasteType}</span>
            <span className="dim">•</span>
            <span className="highlight">{match.totalMatched}t</span>
            <span className="dim">/</span>
            <span className="dim">{match.buyer.maxCapacity}t</span>
          </div>
        </div>

        <div className="match-divider">
          <div className="match-divider-line" />
          <ChevronDown className="icon-sm" style={{ color: 'rgba(16,185,129,0.5)' }} />
          <span className="match-divider-label">SELLERS</span>
          <ChevronDown className="icon-sm" style={{ color: 'rgba(16,185,129,0.5)' }} />
          <div className="match-divider-line" />
        </div>

        <div className="match-alloc-list">
          {match.allocations.map((alloc, idx) => (
            <motion.div
              key={alloc.seller.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * idx, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="match-alloc-row"
            >
              <div>
                <div className="match-alloc-name">{alloc.seller.companyName}</div>
                <div className="match-alloc-type">{alloc.seller.wasteType}</div>
              </div>
              <div className="match-alloc-qty">+{alloc.quantity}t</div>
            </motion.div>
          ))}
        </div>

        {match.buyer.maxCapacity - match.buyer.allocated > 0 && (
          <div className="match-unmatched">
            {match.buyer.maxCapacity - match.buyer.allocated}t UNMATCHED
          </div>
        )}
      </div>
    </motion.div>
  );
}
