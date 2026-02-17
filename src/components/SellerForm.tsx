import { useState } from 'react';
import { Factory, Package, TrendingUp } from 'lucide-react';
import { useStore, WASTE_TYPES } from '../store';

export function SellerForm() {
  const { addSeller } = useStore();
  const [companyName, setCompanyName] = useState('');
  const [wasteType, setWasteType] = useState(WASTE_TYPES[0]);
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !wasteType || !quantity || parseFloat(quantity) <= 0) return;

    addSeller({
      companyName,
      wasteType,
      quantity: parseFloat(quantity),
    });

    setCompanyName('');
    setQuantity('');
  };

  return (
    <div className="glass-card">
      <div className="section-header">
        <div className="section-icon section-icon-emerald">
          <Factory className="icon-md" style={{ color: 'var(--emerald-400)' }} />
        </div>
        <div>
          <div className="section-title">SELLER ENTRY</div>
          <div className="section-subtitle">ADD WASTE SUPPLY</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-stack">
        <div>
          <label className="form-label">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="eg. Seller Alpha"
            className="form-input"
            required
          />
        </div>

        <div>
          <label className="form-label">Waste Type</label>
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

        <div>
          <label className="form-label">Quantity (Tons)</label>
          <div className="form-input-icon-wrap">
            <TrendingUp className="icon-md form-input-icon" />
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
              min="0"
              step="0.1"
              className="form-input form-input-with-icon form-input-mono"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-primary">
          <Package className="icon-md" />
          ADD SELLER
        </button>
      </form>
    </div>
  );
}
