# AI Employee - Frontend

A modern React + TypeScript dashboard for managing AI-powered WhatsApp automation. Built with Vite, TailwindCSS, and React Query for a premium user experience.

## 🚀 Features

- **Real-time Dashboard** with live statistics
- **Message Simulator** for testing AI responses
- **Approval Management** for critical interactions
- **AI Settings** for customizing business knowledge and behavior
- **Export Logs** to CSV for reporting
- **Dark Mode** support
- **Responsive Design** for mobile and desktop

---

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Backend API** running on `http://localhost:3000`

---

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-frontend-repo-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   
   Update `src/utils/api.ts` if your backend is not on `localhost:3000`:
   ```typescript
   const API_URL = 'http://localhost:3000';
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

---

## 🎨 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Query** - Data fetching and caching
- **React Router** - Navigation
- **Lucide React** - Icons

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context (Auth, Theme)
│   ├── pages/           # Page components
│   ├── utils/           # API utilities
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── index.html           # HTML template
```

---

## 🔐 Authentication

The app uses JWT-based authentication. After login, the token is stored in `localStorage` and automatically included in all API requests.

---

## 🧪 Testing

### Using the Simulator
1. Navigate to the Dashboard
2. Click **"Launch Simulator"**
3. Enter a test message like: *"What properties do you have?"*
4. View the AI's response and intent classification

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload the dist/ folder to Netlify
```

---

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js` to customize the brand colors:
```javascript
theme: {
  extend: {
    colors: {
      brand: {
        50: '#f0f9ff',
        // ... your custom colors
      }
    }
  }
}
```

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update navigation in `src/components/Navbar.tsx`

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📄 License

MIT License
