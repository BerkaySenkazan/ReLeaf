import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Zap } from 'lucide-react';
import { useStore } from '../store';

const COLORS = ['#10b981', '#22d3ee', '#34d399', '#06b6d4', '#059669', '#0891b2', '#047857', '#0e7490'];

const tooltipStyle: React.CSSProperties = {
  backgroundColor: 'rgba(5, 10, 24, 0.95)',
  border: '1px solid rgba(71, 85, 105, 0.2)',
  borderRadius: '10px',
  color: '#e2e8f0',
  fontSize: '11px',
  fontFamily: '"JetBrains Mono", monospace',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
};

export function Analytics() {
  const { getWasteTypeDistribution, getTotalTonnage, matches } = useStore();
  const distribution = getWasteTypeDistribution();
  const totalTonnage = getTotalTonnage();

  const matchCountByType = distribution.map((item) => ({
    name: item.name.split(' ')[0],
    fullName: item.name,
    value: item.value,
  }));

  return (
    <div className="glass-card" style={{ height: '100%' }}>
      <div className="analytics-scroll">
        <div className="section-header">
          <div className="section-icon section-icon-emerald">
            <BarChart3 className="icon-md" style={{ color: 'var(--emerald-400)' }} />
          </div>
          <div>
            <div className="section-title">ANALYTICS</div>
            <div className="section-subtitle">REAL-TIME METRICS</div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-label">
              <TrendingUp className="icon-sm" style={{ color: 'rgba(16,185,129,0.5)' }} />
              <span>TONNAGE</span>
            </div>
            <div className="stat-card-value text-gradient">{totalTonnage.toFixed(1)}</div>
            <div className="stat-card-desc">TONS PROCESSED</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">
              <Zap className="icon-sm" style={{ color: 'rgba(16,185,129,0.5)' }} />
              <span>MATCHES</span>
            </div>
            <div className="stat-card-value text-gradient">{matches.length}</div>
            <div className="stat-card-desc">ALLOCATIONS</div>
          </div>
        </div>

        {distribution.length > 0 && (
          <div className="chart-section">
            {/* Pie chart */}
            <div>
              <div className="chart-label">
                <PieChartIcon className="icon-sm" style={{ color: 'rgba(16,185,129,0.4)' }} />
                <span className="chart-label-text">WASTE DISTRIBUTION</span>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={matchCountByType}
                      cx="50%"
                      cy="50%"
                      innerRadius={32}
                      outerRadius={62}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {matchCountByType.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value, __, props) => [
                        `${value}t`,
                        (props?.payload as { fullName: string })?.fullName,
                      ]}
                    />
                    <Legend
                      wrapperStyle={{ color: '#475569', fontSize: '9px', fontFamily: '"JetBrains Mono", monospace' }}
                      formatter={(value) => <span style={{ color: '#475569', letterSpacing: '0.05em' }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar chart */}
            <div>
              <div className="chart-label">
                <span className="chart-label-text">TONNAGE BY TYPE</span>
              </div>
              <div className="chart-container-bar">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={matchCountByType} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(71, 85, 105, 0.15)" />
                    <XAxis type="number" stroke="#475569" fontSize={9} fontFamily="JetBrains Mono" />
                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke="#475569"
                      fontSize={9}
                      fontFamily="JetBrains Mono"
                      width={50}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value, __, props) => [
                        `${value}t`,
                        (props?.payload as { fullName: string })?.fullName,
                      ]}
                    />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="url(#barGradient)" />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {distribution.length === 0 && (
          <div className="empty-state" style={{ padding: '48px 16px' }}>
            <div className="empty-icon-box" style={{ width: 64, height: 64 }}>
              <BarChart3 style={{ width: 28, height: 28, color: 'var(--text-muted)' }} />
            </div>
            <p className="empty-title">No data yet</p>
            <p className="empty-desc">CHARTS POPULATE AFTER MATCHES</p>
          </div>
        )}
      </div>
    </div>
  );
}
