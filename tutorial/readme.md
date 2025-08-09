# Raksha Bandhan Website - Complete Setup Guide

## First follow these instructions carefully and only contact me if its not working. 

# My Video tutorials : 
---> For getting the sharable link : https://youtu.be/bFCnDsQwNvA

---

## 🚀 Basic Setup Instructions

### 1. Install Required Software

**VS Code Installation:**
- Download and install VS Code if you don't have it
- Tutorial: https://youtu.be/3eCmc0t6aqA?si=TkV0bVEz_95FbMmi

**Node.js Installation:**
- Download and install Node.js if you don't have it
- Tutorial: https://youtu.be/uCgAuOYpJd0?si=2ICwr3Ih1P_ru9KA

⚠️ **Important:** Both VS Code and Node.js are required - the website won't work without them!

### 2. Open the Project

4. Open the **"raksha-b"** folder in VS Code
   
   ⚠️ **Important:** Open the folder named "raksha-b" only! Not any parent folder!

### 3. Install Dependencies

6. Open terminal in VS Code (Terminal → New Terminal)

7. Type this command and press Enter:
   ```
   npm i
   ```
   or
   ```
   npm install
   ```

   **If you get a script error, run this first:**
   ```
   Set-ExecutionPolicy -Scope CurrentUser Unrestricted
   ```

### 4. Run the Website

8. Type this command and press Enter:
   ```
   npm run dev
   ```

9. You'll get a localhost link - **Ctrl + Click** on it to view your website!

10. To share with others, you'll need to host it (see hosting section below)

---

## 🎨 Customization Guide for Beginners

### 📝 How to Change Text Content

#### 1. Main Title and Messages
**File to edit:** `src/components/EnvelopePage.tsx`

Find these lines (around line 200-210):
```tsx
<h1>Happy Raksha Bandhan</h1>
```
**Change to your text:**
```tsx
<h1>Happy Birthday Sister</h1>
```

Find this line:
```tsx
<p>To my Dearest Sister 💕</p>
```
**Change to:**
```tsx
<p>To my Amazing Sister 💕</p>
```

#### 2. Letter Content
**File to edit:** `src/components/LetterPage.tsx`

Look for lines with text content and replace with your message:
```tsx
"Dear Sister, you mean the world to me..."
```

#### 3. Instructions Text
**File to edit:** `src/components/EnvelopePage.tsx`

Find:
```tsx
<p>👆 Click to open your surprise</p>
```
**Change to your instruction:**
```tsx
<p>👆 Click here to see your gift</p>
```

### 🎵 How to Add/Change Background Music

#### Step 1: Prepare Your Music File
1. Get your music file (must be `.mp3` format)
2. Keep the file size under 10MB for better performance
3. Rename your file to `bgm.mp3`

#### Step 2: Add Music to Project
1. In your project folder, go to: `public/music/`
2. If the `music` folder doesn't exist, create it
3. Replace the existing `bgm.mp3` with your new music file
4. **Important:** Keep the name as `bgm.mp3`

#### Step 3: Adjust Music Volume (Optional)
**File to edit:** `src/context/MusicContext.tsx`

Find this line (around line 25):
```tsx
audioRef.current.volume = 0.4; // 40% volume
```
**Change the number:**
- `0.1` = 10% volume (very quiet)
- `0.5` = 50% volume (medium)
- `0.8` = 80% volume (loud)
- `1.0` = 100% volume (maximum)

### 🖼️ How to Change Images and Colors

#### 1. Background Colors
**File to edit:** `src/components/EnvelopePage.tsx`

Find:
```tsx
style={{ background: '#fdf6e3' }}
```
**Change to your color:**
```tsx
style={{ background: '#ffebee' }}  // Light pink
style={{ background: '#e8f5e8' }}  // Light green
style={{ background: '#fff3e0' }}  // Light orange
```

#### 2. Envelope Colors
**File to edit:** `src/components/EnvelopePage.tsx`

Find:
```tsx
background: 'linear-gradient(135deg, #e6b4b8 0%, #d89a9e 100%)'
```
**Change to:**
```tsx
background: 'linear-gradient(135deg, #ffb3ba 0%, #ffdfba 100%)'  // Pink to peach
background: 'linear-gradient(135deg, #bae1ff 0%, #baffc9 100%)'  // Blue to green
```

#### 3. Add Your Own Images
**For profile pictures or decorative images:**

1. Put your image in: `public/images/` folder
2. In your component file, add:
```tsx
<img src="/images/your-photo.jpg" alt="Sister's photo" className="w-32 h-32 rounded-full" />
```

### 🎨 Easy Color Combinations

**Romantic Pink Theme:**
- Background: `#fff0f5`
- Envelope: `#ffb6c1` to `#ffc0cb`

**Royal Purple Theme:**
- Background: `#f3e5f5`
- Envelope: `#ce93d8` to `#ba68c8`

**Golden Theme:**
- Background: `#fff8e1`
- Envelope: `#ffd54f` to `#ffb300`

**Ocean Blue Theme:**
- Background: `#e3f2fd`
- Envelope: `#64b5f6` to `#42a5f5`

---

## 🌐 Hosting Your Website (Make it Shareable)

### Option 1: Netlify (Recommended for Beginners)
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your `dist` folder (created after `npm run build`)
3. Get your shareable link instantly!

### Option 2: Vercel + GitHub
1. Create GitHub account
2. Upload your code to GitHub
3. Connect Vercel to your GitHub
4. **Detailed tutorial:** https://youtu.be/bFCnDsQwNvA

---

## 🛠️ Quick Commands Reference

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🆘 Common Issues & Solutions

### ❌ "Command not found" error
**Solution:** Install Node.js first, then restart VS Code

### ❌ Music not playing
**Solutions:**
1. Check if `bgm.mp3` exists in `public/music/` folder
2. Try clicking the music icon manually
3. Some browsers block autoplay - this is normal

### ❌ Images not showing
**Solution:** Make sure images are in `public/images/` folder and use `/images/filename.jpg` path

### ❌ Text not updating
**Solution:**
1. Save the file after editing (Ctrl+S)
2. The website should automatically refresh
3. If not, refresh your browser

### ❌ Website looks broken
**Solution:**
1. Stop the server (Ctrl+C in terminal)
2. Run `npm run dev` again
3. Clear browser cache (Ctrl+Shift+R)

---

## 📞 Need Help?

1. **First:** Double-check you followed all steps correctly
2. **Then:** Check the common issues section above
3. **Still stuck?** Contact with:
   - Screenshot of the error
   - What step you're on
   - What you were trying to do

---

## 🎉 Final Tips

- **Always save your files** (Ctrl+S) after making changes
- **Test your changes** in the browser before sharing
- **Keep backups** of your original files before editing
- **Start small** - change one thing at a time
- **Have fun** personalizing your website!

**Happy customizing! 🚀**