import { Shield, ShieldCheck, Lock, Wifi } from 'lucide-react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { isEncrypting, lastEncryptTime } = useStore();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="header-logo-box">
            <div className="header-logo-icon">
              <Shield className="icon-lg" style={{ color: 'var(--emerald-400)' }} />
            </div>
            <div className="header-logo-glow" />
          </div>
          <div>
            <h1 className="header-title">
              <span className="text-gradient">ReLeaf</span>
              <span className="header-badge">DES</span>
            </h1>
            <p className="header-subtitle">
              <Wifi className="icon-sm" style={{ color: 'rgba(16,185,129,0.5)' }} />
              NEURAL WASTE EXCHANGE PROTOCOL
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isEncrypting ? (
            <motion.div
              key="encrypting"
              initial={{ opacity: 0, scale: 0.9, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 10 }}
              className="encrypt-status encrypt-encrypting scan-line-effect"
            >
              <Lock className="icon-md encrypting" style={{ color: 'var(--amber-400)' }} />
              <div>
                <p className="encrypt-label" style={{ color: 'var(--amber-400)' }}>
                  ENCRYPTING<span className="encrypting">...</span>
                </p>
                <p className="encrypt-sublabel" style={{ color: 'rgba(245,158,11,0.4)' }}>DES-56 BLOCK CIPHER</p>
              </div>
            </motion.div>
          ) : lastEncryptTime ? (
            <motion.div
              key="encrypted"
              initial={{ opacity: 0, scale: 0.9, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 10 }}
              className="encrypt-status encrypt-secured"
            >
              <ShieldCheck className="icon-md" style={{ color: 'var(--emerald-400)' }} />
              <div>
                <p className="encrypt-label" style={{ color: 'var(--emerald-400)' }}>SECURED ✓</p>
                <p className="encrypt-sublabel" style={{ color: 'rgba(16,185,129,0.4)' }}>DATA ENCRYPTED</p>
              </div>
            </motion.div>
          ) : (
            <div className="encrypt-status encrypt-standby">
              <Shield className="icon-md" style={{ color: 'var(--text-dim)' }} />
              <p className="encrypt-label" style={{ color: 'var(--text-dim)' }}>STANDBY</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
