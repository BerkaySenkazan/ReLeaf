import { useStore } from '../store';
import { AlertTriangle, Package, Inbox } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function UnallocatedPool() {
  const { getUnallocatedSellers } = useStore();
  const unallocated = getUnallocatedSellers();

  return (
    <div className="glass-card">
      <div className="section-header-between">
        <div className="section-header-left">
          <div className="section-icon section-icon-amber">
            <AlertTriangle className="icon-md" style={{ color: 'var(--amber-400)' }} />
          </div>
          <div>
            <div className="section-title">UNALLOCATED</div>
            <div className="section-subtitle">PENDING MATCHES</div>
          </div>
        </div>
        {unallocated.length > 0 && (
          <span className="badge-pill badge-amber">{unallocated.length}</span>
        )}
      </div>

      <AnimatePresence>
        {unallocated.length === 0 ? (
          <div className="empty-state" style={{ padding: '32px 16px' }}>
            <div className="empty-icon-box" style={{ width: 56, height: 56 }}>
              <Inbox style={{ width: 24, height: 24, color: 'var(--text-muted)' }} />
            </div>
            <p className="empty-desc">ALL ALLOCATED</p>
          </div>
        ) : (
          <div className="unalloc-list">
            {unallocated.map((seller) => {
              const remaining = seller.quantity - seller.allocated;
              const progress = (remaining / seller.quantity) * 100;
              return (
                <motion.div
                  key={seller.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="unalloc-item"
                >
                  <div className="unalloc-item-header">
                    <span className="unalloc-item-name">{seller.companyName}</span>
                    <span className="unalloc-item-qty">{remaining}t</span>
                  </div>
                  <div className="unalloc-item-type">
                    <Package className="icon-sm" />
                    {seller.wasteType}
                  </div>
                  <div className="progress-track">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                      className="progress-fill-amber"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
