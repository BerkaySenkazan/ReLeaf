# EcoMatch DES Dashboard - Specification

## Project Overview
- **Project Name:** EcoMatch DES Dashboard
- **Type:** Industrial Waste Exchange Web Application
- **Core Functionality:** A dashboard for employees to input seller/buyer data, with a neural network matching engine that pairs waste sellers with buyers, featuring DES encryption visualization
- **Target Users:** Industrial waste exchange employees, warehouse/office staff

---

## UI/UX Specification

### Layout Structure

**Page Sections:**
1. **Header** - Logo, title, encryption status indicator
2. **Main Workspace** - Split-screen dual-entry (Seller | Buyer)
3. **Neural Match Engine** - Real-time match feed
4. **Analytics Panel** - Charts and statistics
5. **Footer** - Minimal info

**Grid Layout:**
- Desktop: 3-column layout (Left: Data Entry, Center: Matches, Right: Analytics)
- Tablet: 2-column (Entry + Matches | Analytics)
- Mobile: Single column stacked

**Responsive Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette:**
- Background Primary: `#0f172a` (Slate 900)
- Background Secondary: `#1e293b` (Slate 800)
- Background Card: `#334155` (Slate 700)
- Accent Primary: `#10b981` (Emerald 500)
- Accent Secondary: `#059669` (Emerald 600)
- Accent Glow: `#34d399` (Emerald 400)
- Text Primary: `#f8fafc` (Slate 50)
- Text Secondary: `#94a3b8` (Slate 400)
- Border: `#475569` (Slate 600)
- Warning/Encryption: `#f59e0b` (Amber 500)
- Error: `#ef4444` (Red 500)
- Success: `#22c55e` (Green 500)

**Typography:**
- Font Family: `"JetBrains Mono", "Fira Code", monospace` for data
- Font Family: `"Inter", sans-serif` for UI text
- Heading H1: 28px, Bold
- Heading H2: 22px, Semibold
- Heading H3: 18px, Medium
- Body: 14px, Regular
- Small/Labels: 12px, Medium

**Spacing System:**
- Base unit: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**Visual Effects:**
- Cards: `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3)`
- Glow effect on accent elements: `box-shadow: 0 0 20px rgba(16, 185, 129, 0.3)`
- Border radius: 8px (cards), 6px (inputs), 4px (buttons)
- Encryption flash animation: pulse glow effect

### Components

**1. Header**
- Logo: Shield icon with "EcoMatch" text
- Encryption Status Bar: Animated shield with "DES Encrypting..." text (visible on data submission)
- States: Idle (dim), Active (pulsing amber/green)

**2. Seller Entry Form**
- Fields:
  - Company Name (text input)
  - Waste Type (select dropdown)
  - Quantity in Tons (number input)
- Submit button: "Add Seller"
- States: Default, Focus, Submitting (with encryption animation)

**3. Buyer Entry Form**
- Fields:
  - Company Name (text input)
  - Required Waste Type (select dropdown)
  - Minimum Capacity (number input)
  - Maximum Capacity (number input)
- Submit button: "Add Buyer"
- States: Default, Focus, Submitting

**4. Neural Match Feed**
- Real-time list of successful matches
- Each match shows:
  - Buyer name and demand
  - List of matched sellers with quantities
  - Match timestamp
  - Visual connector (lines or cards sliding together)
- Animation: Cards slide in from sides, connect in center
- Partial match indicator (e.g., "60t matched, 40t unallocated")

**5. Unallocated Pool**
- Shows remaining unallocated quantities
- Visual: Separate panel or badge on seller cards

**6. Analytics Charts**
- Total Tonnage Processed (bar chart)
- Waste Type Distribution (pie/donut chart)
- Time series: Transactions over time (line chart)

**7. Buttons**
- Primary: Emerald background, white text
- Secondary: Transparent with emerald border
- Hover: Brightness increase, subtle scale
- Active: Scale down slightly

---

## Functionality Specification

### Core Features

**1. Data Entry**
- Add sellers with company name, waste type, quantity
- Add buyers with company name, waste type, min/max capacity
- Form validation (required fields, positive numbers)
- Clear forms after successful submission

**2. Neural Match Engine**
- Automatic matching when new seller/buyer added
- Match logic:
  - Match by waste type
  - Check buyer capacity range
  - Prioritize best fit (buyer with closest capacity to seller quantity)
  - Handle partial matches (split seller quantity across multiple buyers)
  - Handle multiple sellers to single buyer
- Real-time feed updates via Zustand store

**3. Partial Matching**
- If seller quantity > buyer max capacity: split across buyers
- If seller quantity < buyer min capacity: mark as unallocated
- Show "Unallocated" pool with remaining quantities

**4. DES Encryption Visualization**
- On any data submission:
  - Show encryption status bar
  - Display "DES Encrypting..." with shield icon
  - Pulse animation for 1.5 seconds
  - Then show "Encrypted ✓" briefly
  - Auto-hide

**5. Analytics**
- Track total tonnage processed
- Count matches by waste type
- Update charts in real-time

### User Interactions

1. **Add Seller Flow:**
   - Fill form → Click "Add Seller" → Encryption animation → Seller added to list → Match engine runs → Results shown

2. **Add Buyer Flow:**
   - Fill form → Click "Add Buyer" → Encryption animation → Buyer added to list → Match engine runs → Results shown

3. **View Match Details:**
   - Click on match card → Expand to show full details

### Data Handling

**State (Zustand):**
```typescript
interface Seller {
  id: string;
  companyName: string;
  wasteType: string;
  quantity: number;
  allocated: number;
  createdAt: Date;
}

interface Buyer {
  id: string;
  companyName: string;
  wasteType: string;
  minCapacity: number;
  maxCapacity: number;
  allocated: number;
  createdAt: Date;
}

interface Match {
  id: string;
  buyer: Buyer;
  allocations: Allocation[];
  totalMatched: number;
  timestamp: Date;
}

interface Allocation {
  seller: Seller;
  quantity: number;
}
```

### Edge Cases
- No matching buyers for seller → Show in unallocated pool
- No matching sellers for buyer → Show in unmet demand
- Zero quantity input → Validation error
- Duplicate company names → Allow (different IDs)

---

## Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme with emerald green accents renders correctly
- [ ] Split-screen layout shows seller/buyer forms side by side on desktop
- [ ] Encryption status bar animates on form submission
- [ ] Match cards animate in with Framer Motion
- [ ] Charts render with correct colors and data
- [ ] Responsive layout works on all breakpoints

### Functional Checkpoints
- [ ] Can add a seller with all required fields
- [ ] Can add a buyer with all required fields
- [ ] Matches are created automatically when data is added
- [ ] Partial matching works (split quantities correctly)
- [ ] Unallocated pool shows remaining quantities
- [ ] Encryption animation triggers on submission
- [ ] Analytics charts update with new data

### Technical Checkpoints
- [ ] React + TypeScript compiles without errors
- [ ] Tailwind CSS classes apply correctly
- [ ] Framer Motion animations are smooth
- [ ] Zustand state updates trigger re-renders
- [ ] No console errors on normal usage
