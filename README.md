# ReLeaf DES Dashboard

**ReLeaf DES** is a next-generation industrial waste exchange platform designed to securely connect waste sellers with buyers. It leverages a neural matching engine to optimize resource allocation and features a unique DES (Data Encryption Standard) visualization interface.

![ReLeaf DES Dashboard](./public/screenshot-placeholder.png)

## 🚀 Key Features

### 🧠 Neural Match Engine
- **Real-time Matching**: Automatically pairs waste sellers with potential buyers based on waste type, quantity, and capacity constraints.
- **Partial Allocation**: Smartly splits large seller quantities across multiple buyers to maximize matches.
- **Unallocated Pool**: Tracks remaining waste quantities for future matching.

### 🔐 DES Encryption Visualization
- **Interactive Security**: Visualizes the encryption process upon data submission.
- **Status Indicators**: Real-time feedback on encryption states (Encrypting, Secured, Standby).
- **Animation**: Custom CSS animations simulating DES-56 block cipher operations.

### 🎨 Premium UI/UX
- **Cyberpunk / Sci-Fi Aesthetic**: A dark-themed, immersive interface with emerald and cyan accents.
- **Glassmorphism**: Usage of backdrop filters and semi-transparent layers for depth.
- **Responsive Design**: Optimized layouts for Desktop (3-column), Tablet (2-column), and Mobile (stacked).

## 🛠️ Technology Stack

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Styling**: **Vanilla CSS** (No frameworks). A complete custom design system using CSS Variables for theming and layout.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for global state (waste data, matching logic).
- **Animation**: [Framer Motion](https://www.framer.com/motion/) for complex UI transitions.
- **Icons**: [Lucide React](https://lucide.dev/) for consistent iconography.
- **Charts**: [Recharts](https://recharts.org/) for analytics visualization.

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BerkaySenkazan/ReLeaf-DES.git
   cd ReLeaf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
src/
├── components/      # React components (Header, Forms, MatchFeed, etc.)
├── store/           # Zustand store definitions
├── index.css        # Global Vanilla CSS Design System
├── App.tsx          # Main application layout
└── main.tsx         # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
