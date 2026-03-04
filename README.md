# ✨ STUDYAURA — Your Royal Study Hour ⚡

A beautiful, full-featured study timer web app with two stunning themes: **Princess Mode** (elegant rose gold & lavender) and **Ryuu Mode** (neon cyberpunk). Built with React, Vite, and Firebase — zero database storage, all in-memory with Firebase Firestore for likes & comments.

![STUDYAURA](https://img.shields.io/badge/Version-1.0.0-blue) ![React](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.4-brightgreen) ![Firebase](https://img.shields.io/badge/Firebase-10.12-orange)

---

## 🌟 Features

### Core Features
- ⏱️ **Flip Clock Timer** — Apple-style split-flap countdown timer & stopwatch with realistic 3D CSS animations
- 📋 **Diary Todo List** — Add up to 10 tasks per session, lined notebook texture, bouncing checkmarks
- 📊 **Live Study Tracker** — Total study time counter, sessions completed, animated progress bar toward 8-hour goal
- 🎯 **Motivational Popup** — Random inspiring quote on every visit from 24+ quotes, never repeats consecutively
- 💬 **Firebase Comments & Likes** — Leave messages (dev-only visible), heart/bolt like button with real-time count
- 🎨 **Instant Theme Toggle** — Switch between Princess & Ryuu modes with smooth color transitions

### Princess Mode (👑)
- Rose gold, lavender, baby pink palette
- Cinzel Decorative (headings) + Quicksand (body) fonts
- Glitter particle rain canvas
- Floating crown & petal SVG motifs
- Custom sparkle cursor
- Soft aurora gradient background

### Ryuu Mode (⚡)
- Dark neon blue, electric orange, carbon gray palette
- Orbitron (headings) + Rajdhani (body) fonts
- Racing pixel cars across the bottom
- Anime speed lines in background
- Floating kanji symbols (集中, 努力, 勝利)
- Scanline overlay & neon border glow
- Custom crosshair cursor

### Animations
- Page reveal stagger sequence
- 3D flip card rotation
- Celebratory pulse ring on timer finish
- Glitch text effect (Ryuu)
- Speed line burst animation (Ryuu)
- Task slide-in & bounce
- Heart/bolt bouncing on like

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm installed
- A free Firebase account (optional — works offline without it)

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd studyaura-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Opens automatically at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```
Outputs optimized files to `dist/` folder. Deploy to Netlify, Vercel, or any static host.

### Preview Production Build
```bash
npm run preview
```

---

## 🔧 Firebase Setup (Optional)

Comments and likes persist across visits with Firebase. If you skip this, everything still works offline — likes just won't persist.

### Steps:
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project (any name)
3. Click the web icon `</>` to add a web app
4. Register the app, copy the config object from Step 6
5. Replace the values in `src/utils/firebase.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_SERVER.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID",
     measurementId: "YOUR_MEASUREMENT_ID"
   };
   ```
6. In Firebase Console: **Firestore Database** → **Create database** → **Start in test mode**
7. That's it! Comments save to `studyaura_comments` collection, likes sync to `studyaura/likes` document

---

## 📁 Project Structure

```
studyaura-app/
├── index.html                           # Entry HTML file
├── package.json                         # Dependencies & scripts
├── vite.config.js                       # Vite config
├── README.md                            # This file
└── src/
    ├── main.jsx                         # React entry point
    ├── App.jsx                          # Main app orchestrator
    ├── App.css                          # App layout styles
    ├── context/
    │   └── ThemeContext.jsx             # Princess/Ryuu theme state
    ├── hooks/
    │   ├── useTimer.js                  # Timer/stopwatch logic
    │   └── useDateTime.js               # Live date & clock
    ├── utils/
    │   ├── firebase.js                  # Firebase Firestore API
    │   ├── quotes.js                    # 24+ motivational quotes
    │   └── audio.js                     # Beep & tick sounds
    ├── styles/
    │   └── global.css                   # CSS variables & reset
    └── components/                      # 14 reusable React components
        ├── MotivationalPopup/           # Entry screen quote popup
        ├── ThemeToggle/                 # Princess/Ryuu switch buttons
        ├── Header/                      # Heading + live date/clock
        ├── FlipCard/                    # 3D flip card container
        ├── FlipClockTimer/              # Countdown/stopwatch front
        ├── TodoList/                    # Diary todo list back
        ├── StudyTracker/                # Study time + progress bar
        ├── CommentsSection/             # Firebase likes & comments
        ├── ParticleCanvas/              # Princess glitter rain
        ├── RacingCars/                  # Ryuu racing cars
        ├── FloatingKanji/               # Ryuu drifting kanji
        └── CelebrationOverlay/          # Timer finish pulse
```

---

## 💻 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 18.3 |
| **Build** | Vite 5.4 |
| **Styling** | CSS3 (variables, Grid, Flexbox, 3D transforms) |
| **Database** | Firebase Firestore (optional) |
| **Fonts** | Google Fonts (Cinzel Decorative, Quicksand, Orbitron, Rajdhani) |
| **Audio** | Web Audio API |
| **Canvas** | 2D Canvas for particles & cars |

---

## 🎨 Customization

### Change Colors
All colors are CSS variables in `src/styles/global.css`:
```css
:root {
  --accent: #e8a0bf;           /* Princess main color */
  --text-primary: #7c3a5e;     /* Princess text color */
  /* ... more variables */
}
.ryuu-mode {
  --accent: #00d4ff;           /* Ryuu neon blue */
  --text-primary: #e0e0ff;     /* Ryuu bright text */
  /* ... more variables */
}
```

### Add/Edit Quotes
Edit `src/utils/quotes.js`:
```javascript
export const motivationalQuotes = [
  { text: "Your custom quote here", author: "Author Name" },
  // ... more quotes
];
```

### Customize Mini Quotes (Every 5 min rotation)
```javascript
export const princessMiniQuotes = [
  "Keep glowing, queen 👑",
  // ... your custom quotes
];
```

### Change Timer Default
In `src/hooks/useTimer.js`:
```javascript
const [target, setTarget] = useState(25 * 60); // Change 25 to desired minutes
```

### Modify Progress Goal (8 hours)
In `src/components/StudyTracker/StudyTracker.jsx`:
```javascript
const goal = 8 * 3600; // Change 8 to desired hours
```

---

## 🔌 API Reference

### useTimer Hook
```javascript
const timer = useTimer();
// Returns: { mode, seconds, target, running, sessions, totalStudy, justFinished, 
//            start, pause, reset, setCountdown, switchMode }
```

### useTheme Hook
```javascript
const { theme, switchTheme } = useTheme();
// 'princess' or 'ryuu'
```

### useDateTime Hook
```javascript
const { dateStr, timeStr } = useDateTime();
// Returns formatted: "Wednesday, March 4, 2026" & "14:30:45"
```

### Firebase Functions
```javascript
import { 
  subscribeLikes, 
  addLikeToFirebase, 
  submitCommentToFirebase, 
  firebaseReady 
} from './utils/firebase';

// Subscribe to live like count
const unsub = subscribeLikes((count) => console.log(count));

// Add a like
await addLikeToFirebase(); // Returns true/false

// Submit comment
await submitCommentToFirebase(name, message, theme); // Returns true/false
```

---

## 📱 Responsive Design

The app is fully responsive with breakpoints at:
- **Desktop**: 800px max-width centered container
- **Tablet** (768px): Reduced padding, adjusted font sizes
- **Mobile** (480px): Compact layouts, stacked elements, scaled down controls

All fonts use `clamp()` for fluid scaling.

---

## 🎯 Session Data (In-Memory Only)

**Important:** All app data (timer, todos, study time, sessions) is **in-memory only**. It resets to zero when:
- The browser/tab closes
- The page is refreshed
- The user navigates away

This is intentional — a fresh start for each study session.

**Only persisted:** Likes count & comments (if Firebase is configured).

---

## 🐛 Troubleshooting

### Inputs invisible in Ryuu mode
✅ Fixed! Text now uses `color: var(--text-primary) !important` with `-webkit-text-fill-color`

### Comments/Likes not working
- Check browser console (F12) for Firebase errors
- Verify Firestore is enabled in Firebase Console (test mode)
- Ensure Firebase config is correctly replaced in `src/utils/firebase.js`
- App works offline even without Firebase

### Timer not finishing
- Check audio permissions in browser
- Beep sound plays if Web Audio API is available
- Visual pulse always shows regardless

### Theme not switching
- Clear browser cache if styles don't update
- Check DevTools → Elements to confirm `ryuu-mode` class is on wrapper

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 🤝 Contributing

Feel free to fork, improve, and submit PRs! Suggestions:
- Additional quotes
- More color themes
- Sound customization
- Mobile app wrapper

---

## 💖 Credits

**Design Inspiration:** Apple flip clocks, anime aesthetic, glassmorphism UI  
**Fonts:** Google Fonts (Cinzel Decorative, Quicksand, Orbitron, Rajdhani)  
**Backend:** Firebase Firestore  

---

## 🚀 Deployment

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Vercel
```bash
npm run build
vercel --prod
```

### GitHub Pages
Requires config changes — update `vite.config.js`:
```javascript
export default {
  base: '/studyaura/',  // Your repo name
  // ... rest of config
}
```

---

## 📞 Support

Documentation: Check comments in source files  
Issues: Review the troubleshooting section above  
Firebase Help: https://firebase.google.com/docs  

---

## 🌟 Future Features (Ideas)

- [ ] Dark mode auto-detect (system preference)
- [ ] Custom background images
- [ ] Study stats dashboard (weekly/monthly)
- [ ] Pomodoro timer preset
- [ ] Sound customization
- [ ] Multi-language support
- [ ] PWA support (offline-first)
- [ ] Export study logs as CSV

---

**Version:** 1.0.0  
**Last Updated:** March 4, 2026  
**Built with ❤️ in React + Vite**

✨ **Happy studying, and may your grades shine as bright as our themes!** ⚡
#
