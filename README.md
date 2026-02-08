# Cupid's Deployment 💕

A romantic, interactive Valentine's Day proposal web application.

## Features

- 🎯 Interactive "Will you be my Valentine?" proposal
- 🚫 Evasive "No" button that teleports away
- ✅ Enthusiastic "Yes" button with celebration
- 🔐 Password protection with inside joke
- 💭 Dynamic "Reasons Why" generator
- 📅 Digital date invite with calendar integration
- 🌸 Interactive timeline of your story
- 🎉 Confetti celebration on acceptance
- 📱 Fully responsive design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Deployment

Deploy to Vercel, Netlify, or GitHub Pages for free hosting.

## Customization Guide

### 1. Password Protection
Edit `src/components/PasswordGate.jsx`:
- Change `correctPassword` to your inside joke answer
- Update the `hint` text to your personalized question

### 2. Reasons Why I Love You
Edit `src/components/ReasonsGenerator.jsx`:
- Modify the `reasons` array with your own personal reasons
- Add as many reasons as you want!

### 3. Our Story Timeline
Edit `src/components/Timeline.jsx`:
- Update the `milestones` array with your relationship milestones
- Add dates, titles, descriptions, and emojis for each moment

### 4. Date Invite Details
Edit `src/components/DateInvite.jsx`:
- Update `dateDetails` object with your actual date information
- Change date, time, location, and address

### 5. Background Music
1. Add your song file (MP3) to the `public` folder
2. Name it `your-song.mp3`
3. The app will play it on first user interaction

### 6. Colors & Styling
Edit `tailwind.config.js` to customize:
- `rose-red`: Button and accent colors
- `soft-pink`: Background gradient colors
- Font families (Inter and Dancing Script are already included)

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically!

### Netlify
1. Push your code to GitHub
2. Import project on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages
1. Run `npm run build`
2. Follow GitHub Pages setup for React apps
3. Deploy the `dist` folder
