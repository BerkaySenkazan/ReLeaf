import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface Seller {
  id: string;
  companyName: string;
  wasteType: string;
  quantity: number;
  allocated: number;
  createdAt: Date;
}

export interface Buyer {
  id: string;
  companyName: string;
  wasteType: string;
  minCapacity: number;
  maxCapacity: number;
  allocated: number;
  createdAt: Date;
}

export interface Allocation {
  seller: Seller;
  quantity: number;
}

export interface Match {
  id: string;
  buyer: Buyer;
  allocations: Allocation[];
  totalMatched: number;
  timestamp: Date;
}

interface AppState {
  sellers: Seller[];
  buyers: Buyer[];
  matches: Match[];
  isEncrypting: boolean;
  lastEncryptTime: Date | null;
  
  addSeller: (seller: Omit<Seller, 'id' | 'allocated' | 'createdAt'>) => void;
  addBuyer: (buyer: Omit<Buyer, 'id' | 'allocated' | 'createdAt'>) => void;
  triggerEncryption: () => void;
  runMatchEngine: () => void;
  getUnallocatedSellers: () => Seller[];
  getWasteTypeDistribution: () => { name: string; value: number }[];
  getTotalTonnage: () => number;
}

export const WASTE_TYPES = [
  'Plastic Waste',
  'Metal Scrap',
  'Electronic Waste',
  'Chemical Waste',
  'Organic Waste',
  'Glass Waste',
  'Paper/Cardboard',
  'Textile Waste',
  'Rubber Waste',
  'Construction Debris',
];

export const useStore = create<AppState>((set, get) => ({
  sellers: [],
  buyers: [],
  matches: [],
  isEncrypting: false,
  lastEncryptTime: null,

  addSeller: (sellerData) => {
    const newSeller: Seller = {
      ...sellerData,
      id: uuidv4(),
      allocated: 0,
      createdAt: new Date(),
    };
    
    set((state) => ({ sellers: [...state.sellers, newSeller] }));
    get().triggerEncryption();
    setTimeout(() => get().runMatchEngine(), 1600);
  },

  addBuyer: (buyerData) => {
    const newBuyer: Buyer = {
      ...buyerData,
      id: uuidv4(),
      allocated: 0,
      createdAt: new Date(),
    };
    
    set((state) => ({ buyers: [...state.buyers, newBuyer] }));
    get().triggerEncryption();
    setTimeout(() => get().runMatchEngine(), 1600);
  },

  triggerEncryption: () => {
    set({ isEncrypting: true });
    setTimeout(() => {
      set({ isEncrypting: false, lastEncryptTime: new Date() });
    }, 1500);
  },

  runMatchEngine: () => {
    const { sellers, buyers, matches } = get();
    
    const newMatches: Match[] = [];
    const updatedSellers = [...sellers];
    const updatedBuyers = [...buyers];

    for (const buyer of updatedBuyers) {
      const availableQuantity = buyer.maxCapacity - buyer.allocated;
      if (availableQuantity <= 0) continue;

      const matchingSellers = updatedSellers
        .filter(s => s.wasteType === buyer.wasteType)
        .filter(s => s.quantity - s.allocated > 0)
        .sort((a, b) => (b.quantity - b.allocated) - (a.quantity - a.allocated));

      const allocations: Allocation[] = [];
      let remainingCapacity = availableQuantity;

      for (const seller of matchingSellers) {
        if (remainingCapacity <= 0) break;

        const sellerAvailable = seller.quantity - seller.allocated;
        if (sellerAvailable <= 0) continue;

        const allocatedQuantity = Math.min(sellerAvailable, remainingCapacity);
        
        allocations.push({ seller, quantity: allocatedQuantity });
        seller.allocated += allocatedQuantity;
        remainingCapacity -= allocatedQuantity;
      }

      if (allocations.length > 0) {
        newMatches.push({
          id: uuidv4(),
          buyer,
          allocations,
          totalMatched: availableQuantity - remainingCapacity,
          timestamp: new Date(),
        });
        buyer.allocated += (availableQuantity - remainingCapacity);
      }
    }

    set({ sellers: updatedSellers, buyers: updatedBuyers, matches: [...matches, ...newMatches] });
  },

  getUnallocatedSellers: () => {
    return get().sellers.filter(s => s.quantity - s.allocated > 0);
  },

  getWasteTypeDistribution: () => {
    const { matches } = get();
    const distribution: Record<string, number> = {};
    
    matches.forEach(match => {
      match.allocations.forEach(alloc => {
        const type = alloc.seller.wasteType;
        distribution[type] = (distribution[type] || 0) + alloc.quantity;
      });
    });

    return Object.entries(distribution).map(([name, value]) => ({ name, value }));
  },

  getTotalTonnage: () => {
    return get().matches.reduce((sum, m) => sum + m.totalMatched, 0);
  },
}));
