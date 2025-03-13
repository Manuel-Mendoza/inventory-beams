# 🏗️ Inventory Beams Frontend 🏗️

A modern React/Astro application for managing construction beam inventory.

## ✨ Features

- 📋 View and manage beam orders
- 🔍 Search functionality for quick access to orders
- ➕ Create new orders with multiple beams
- 🧮 Detailed beam specifications and measurements
- 📱 Responsive design for all devices

## 🛠️ Tech Stack

- React
- Astro
- Tailwind CSS
- Axios for API communication

## 🏛️ Project Structure

```
frontend/
├── src/
│   ├── components/       # React components
│   │   ├── Maquetado/    # UI components
│   │   ├── Vistas/       # View components
│   │   └── ...           # Feature components
│   ├── context/          # React context providers
│   ├── pages/            # Astro pages
│   └── styles/           # Global styles
├── public/               # Static assets
└── ...
```

## 🧩 Key Components

### Main Components
- `Index.jsx`: Main application component
- `OrderList.jsx`: Displays list of orders
- `CreateOrden.jsx`: Form for creating new orders
- `SearchBar.jsx`: Search functionality

### Context
- `ApiContext.jsx`: Manages API communication and state

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd inventory-beams/frontend
```

2. Install dependencies
```bash
pnpm install
# or
npm install
```

3. Configure API endpoint
```
# Edit src/context/ApiContext.jsx to point to your backend
const API_BASE = "https://your-backend-url.com/api/";
const API_LOCAL = "http://localhost:8000/api/";
```

4. Start the development server
```bash
pnpm dev
# or
npm run dev
```

5. Build for production
```bash
pnpm build
# or
npm run build
```

## 🔄 API Integration

The frontend communicates with the backend API using Axios. The main API functions are:

- `fetchOrdenes()`: Get all orders or search by term
- `createOrden()`: Create a new order with beams
- `deleteOrden()`: Delete an existing order

## 📱 Usage Examples

### Creating a New Order

1. Navigate to the "Create Order" view
2. Enter order number and date
3. Add beams with specifications:
   - Name
   - Quantity
   - Measurements (standard or custom)
   - Type (DF/YC)
4. Click "Create Order" to save

### Searching Orders

1. Use the search bar to find orders by number
2. View detailed information about each order
3. Delete orders as needed

## 🎨 UI Components

The application uses a custom component library for consistent styling:

- `Button`: Customizable buttons with different colors
- `Input`: Form input fields
- `Loading`: Loading indicator
- `ListadoBase`: Base component for listing items

## 🔧 Development

### Adding New Features

1. Create new components in the appropriate directory
2. Update the context if needed for new API functionality
3. Import and use the components in the main application

### Styling

The application uses Tailwind CSS for styling. To modify the styling:

1. Edit the `tailwind.config.js` file for global theme changes
2. Use Tailwind classes directly in components
3. Add custom styles in `src/styles/global.css` if needed

## 🚀 Deployment

This application can be deployed on any static hosting service:

1. Build the application
```bash
pnpm build
```

2. Deploy the `dist` directory to your hosting service

## 📄 License

This project is licensed under the MIT License.