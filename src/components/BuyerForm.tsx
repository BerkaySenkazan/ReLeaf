import { useState } from 'react';
import { Building2, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { useStore, WASTE_TYPES } from '../store';

export function BuyerForm() {
  const { addBuyer } = useStore();
  const [companyName, setCompanyName] = useState('');
  const [wasteType, setWasteType] = useState(WASTE_TYPES[0]);
  const [minCapacity, setMinCapacity] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !wasteType || !minCapacity || !maxCapacity) return;
    if (parseFloat(minCapacity) <= 0 || parseFloat(maxCapacity) <= 0) return;
    if (parseFloat(minCapacity) > parseFloat(maxCapacity)) return;

    addBuyer({
      companyName,
      wasteType,
      minCapacity: parseFloat(minCapacity),
      maxCapacity: parseFloat(maxCapacity),
    });

    setCompanyName('');
    setMinCapacity('');
    setMaxCapacity('');
  };

  return (
    <div className="glass-card">
      <div className="section-header">
        <div className="section-icon section-icon-emerald">
          <Building2 className="icon-md" style={{ color: 'var(--emerald-400)' }} />
        </div>
        <div>
          <div className="section-title">BUYER ENTRY</div>
          <div className="section-subtitle">ADD WASTE DEMAND</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-stack">
        <div>
          <label className="form-label">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="eg. Buyer Corp"
            className="form-input"
            required
          />
        </div>

        <div>
          <label className="form-label">Required Waste Type</label>
          <div className="form-input-icon-wrap">
            <Package className="icon-md form-input-icon" />
            <select
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
              className="form-input form-input-with-icon"
            >
              {WASTE_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div>
            <label className="form-label">Min Capacity</label>
            <div className="form-input-icon-wrap">
              <TrendingDown className="icon-md form-input-icon" />
              <input
                type="number"
                value={minCapacity}
                onChange={(e) => setMinCapacity(e.target.value)}
                placeholder="0"
                min="0"
                step="0.1"
                className="form-input form-input-with-icon form-input-mono"
                required
              />
            </div>
          </div>
          <div>
            <label className="form-label">Max Capacity</label>
            <div className="form-input-icon-wrap">
              <TrendingUp className="icon-md form-input-icon" />
              <input
                type="number"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                placeholder="0"
                min="0"
                step="0.1"
                className="form-input form-input-with-icon form-input-mono"
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary">
          <Building2 className="icon-md" />
          ADD BUYER
        </button>
      </form>
    </div>
  );
}
