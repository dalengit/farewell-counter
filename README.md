# 👋 Farewell Counter

A beautiful, animated countdown timer to commemorate a coworker's departure. Built with vanilla HTML, CSS, and JavaScript, designed to be easily deployable to GitHub Pages.

## ✨ Features

- **Real-time Countdown**: Live countdown with days, hours, minutes, and seconds
- **Stylized Design**: Modern, animated UI with gradient backgrounds and smooth transitions
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Persistent Storage**: Remembers the departure date using localStorage
- **Interactive Controls**: Easy date/time picker to set the departure date
- **Celebration Animation**: Special animation when the countdown reaches zero
- **Smart Messaging**: Dynamic text that changes based on how much time is left
- **GitHub Pages Ready**: Simple deployment to GitHub Pages

## 🚀 Live Demo

Once deployed to GitHub Pages, your counter will be available at:
```
https://[your-username].github.io/farewell-counter/
```

## 📱 Screenshots

The counter features:
- Beautiful gradient background
- Glassmorphism card design
- Animated number transitions
- Responsive layout for all devices
- Professional typography using Inter font

## 🛠️ Setup & Deployment

### Option 1: Quick GitHub Pages Deployment

1. **Create a new repository** on GitHub named `farewell-counter`
2. **Upload files** to the repository:
   - `index.html`
   - `styles.css` 
   - `script.js`
   - `README.md`
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Set source to "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click Save
4. **Access your counter** at `https://[username].github.io/farewell-counter/`

### Option 2: Clone and Deploy

```bash
# Clone this repository
git clone [repository-url]
cd farewell-counter

# Initialize git (if needed)
git init
git add .
git commit -m "Initial farewell counter setup"

# Add your GitHub remote
git remote add origin https://github.com/[username]/farewell-counter.git
git push -u origin main
```

Then enable GitHub Pages as described in Option 1.

## 🎯 Usage

1. **Open the counter** in your web browser
2. **Set departure date**:
   - Use the date/time picker to select when your coworker is leaving
   - Click "Set Departure Date" or press Enter
3. **Share the link** with your team
4. **Watch the countdown** tick down to zero
5. **Celebrate** when the departure day arrives!

## 🎨 Customization

### Changing Colors
Edit `styles.css` to modify the color scheme:
```css
/* Main gradient background */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Number colors */
background: linear-gradient(135deg, #667eea, #764ba2);
```

### Modifying Text
Update the messages in `script.js`:
```javascript
// Different messages based on time remaining
if (totalDays > 7) {
    this.elements.departureText.textContent = "Your custom message here";
}
```

### Default Date
Change the default countdown period in `script.js`:
```javascript
// Set default to different number of days
defaultDate.setDate(defaultDate.getDate() + 30); // Change 30 to your preferred number
```

## 🧪 Testing Features

The counter includes built-in testing functions accessible via the browser console:

```javascript
// Test the celebration animation (triggers in 6 seconds)
testCelebration()

// Reset counter to default date
resetCounter()
```

## 🔧 Technical Details

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Storage**: localStorage for persistence
- **Fonts**: Google Fonts (Inter)
- **Animations**: CSS animations and transitions
- **Responsive**: CSS Grid and Flexbox
- **Browser Support**: All modern browsers

## 📋 File Structure

```
farewell-counter/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Counter logic and interactions
└── README.md           # This documentation
```

## 🎉 Features in Detail

### Visual Design
- **Glassmorphism effect** with backdrop blur
- **Gradient animations** on numbers and buttons
- **Smooth hover effects** and transitions
- **Professional color palette**
- **Responsive typography**

### Functionality
- **Automatic persistence** of departure date
- **Input validation** for date selection
- **Dynamic messaging** based on time remaining
- **Celebration modal** when countdown completes
- **Toast notifications** for user feedback
- **Error handling** for invalid dates

### User Experience
- **Intuitive controls** with clear labeling
- **Immediate visual feedback** for all interactions
- **Mobile-friendly** touch targets
- **Accessible** color contrasts and typography
- **Fast loading** with minimal dependencies

## 🤝 Contributing

Feel free to customize this counter for your specific needs:
- Modify colors and styling
- Add new features or animations
- Update messaging and copy
- Enhance mobile experience

## 📄 License

This project is open source and available under the MIT License.

## 💝 Perfect For

- Office farewell parties
- Remote team celebrations  
- Retirement countdowns
- Project completion timers
- Special event countdowns
- Team bonding activities

---

*Made with ❤️ for celebrating the next chapter in someone's journey*
