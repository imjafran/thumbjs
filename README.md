# Thumb.js – Lightweight Browser Fingerprint Library

![Version](https://img.shields.io/badge/version-1.0.2-indianred.svg)
![License](https://img.shields.io/badge/license-MIT-skyblue.svg)

Thumb.js is a powerful yet lightweight browser fingerprinting library that generates unique, high-entropy device signatures based on a wide array of browser and hardware characteristics. Perfect for enhancing security, preventing fraud, or implementing robust user identification systems without relying on cookies or local storage.


[![Developer](https://img.shields.io/badge/Developer-Jafran_Hasan-fff.svg?style=for-the-badge) ](https://fb.com/iamjafran)


## ✨ Features

- **Forever FREE & Unlimited** - No dependency, no server cost, runs on regular browser.
- **High Entropy Fingerprinting** - Combines 18+ device and browser characteristics
- **Cryptographically Secure** - Uses SHA-256 hashing for maximum uniqueness
- **Lightweight** - Zero dependencies, only 2KB minified
- **Easy to Implement** - Simple API with promise-based fingerprint generation
- **Cross-Browser Compatible** - Works in all modern browsers
- **Privacy-Focused** - All processing happens client-side; no data is transmitted

## 📦 Installation

### NPM
```bash
npm install thumb-browser
```

### Yarn
```bash
yarn add thumb-browser
```

### Direct Script Include
```html
<script src="https://unpkg.com/thumb-browser@latest/dist/thumb.min.js"></script>
```

## 🚀 Quick Start

```javascript
import Thumb from 'thumb-browser';

// Create a new fingerprinter instance
const fingerprinter = new Thumb();

// Generate a fingerprint
fingerprinter.get()
    .then(fingerprint => {
        console.log('Your device fingerprint:', fingerprint);
        // e.g. "3f4e591c86c9c5f734fc4b54d5322549bf85ec34b4c2f36310490b3e187b733d"
    })
    .catch(error => {
        console.error('Error generating fingerprint:', error);
    });
```

## 🔍 How It Works

Thumb.js collects and combines multiple sources of entropy to create a unique, stable fingerprint:

1. **User Agent & Browser Data**
   - Browser user agent string
   - Language settings
   - Do Not Track preferences

2. **Hardware & System Information**
   - Screen resolution and color depth
   - Device memory & CPU core count
   - Touch point capability
   - Timezone information
   - Window dimensions

3. **Advanced Graphical Fingerprinting**
   - Canvas rendering characteristics 
   - WebGL vendor and renderer details
   - Color gamut capabilities

4. **Audio Processing**
   - Audio context behavior (unique to hardware)

5. **Additional Signal Sources**
   - Installed plugins
   - Battery status
   - Network connection type
   - Random entropy enhancer

All data points are combined and processed through SHA-256 to generate a consistent, high-entropy fingerprint that balances uniqueness with stability across sessions.

## 📊 API Reference

### `new Thumb()`
Creates a new Thumb.js instance.

### `async get()`
Generates and returns the fingerprint.
- **Returns**: `Promise<string>` - The SHA-256 fingerprint hash.

### `async collect()`
Collects all data points used for fingerprinting.
- **Note**: This is called automatically by the `get()` method.

### Other Methods

Several specialized methods collect individual components for fingerprinting:

- `getCanvas()` - Canvas-based rendering fingerprint
- `getAudio()` - Audio processing fingerprint
- `getWebGL()` - WebGL vendor and renderer info
- `getPlugins()` - Browser plugins enumeration
- `getColorGamut()` - Screen color capabilities
- `getBattery()` - Battery level detection
- `getNetwork()` - Network connection information
- `getNoise()` - Random entropy addition

## 🔐 Security Considerations

- Thumb.js is designed for legitimate security purposes like fraud prevention and risk analysis
- Always disclose fingerprinting usage to your users in your privacy policy
- Consider offering opt-out options in compliance with privacy regulations
- The fingerprint is intentionally designed to be stable but not perfectly permanent to balance security with privacy

## 👩‍💻 Use Cases

- **Fraud Prevention**: Detect suspicious activities across different sessions
- **Enhanced Authentication**: Add an extra security layer to login systems
- **Bot Detection**: Identify automated browsing behavior
- **Secure Transactions**: Add verification without additional user friction
- **Cross-Device Recognition**: Improve user experience without requiring login

## ⚙️ Advanced Customization

You can extend the `Thumb` class to add additional sources of entropy or modify existing collection methods:

```javascript
import Thumb from 'thumb-browser';

class EnhancedThumb extends Thumb {
  async collect() {
    // Call the original collection method
    await super.collect();
    
    // Add custom entropy sources
    this.data.push(this.getCustomData());
  }
  
  getCustomData() {
    // Your custom fingerprinting logic here
    return 'custom-entropy-value';
  }
}
```

## 📝 License

MIT License - feel free to use and modify as needed.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Developed by [Jafran Hasan](https://jafran.online), Sr Software Developer at [WPPOOL](https://wppool.dev).