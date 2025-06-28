# Clark Today Attribution Button

> Hi, I'm Clark Weckmann, a DevOps Engineer from Southern Illinois. I specialize in web development and automation.

**Version:** 1.0.0 | **Built:** 6/27/2025, 9:23:33 PM

## 🚀 Quick Start

Choose your preferred method to add the attribution button to your website:

### CDN (Recommended)
```html
<script src="https://yourusername.github.io/yourrepo/attribution.min.js"></script>
```

### Direct Download
- [📦 attribution.min.js](attribution.min.js) (19KB, production ready)
- [📄 attribution.js](attribution.js) (23KB, development version)

## 📋 Project Overview

This attribution button provides a clean, customizable way to display brand attribution and important links on your website. It features:

- **🎨 Theme Support**: Automatic light/dark theme detection
- **📱 Responsive Design**: Works on all device sizes
- **⚡ Lightweight**: Only 19KB minified (18.1% compression)
- **🔧 Configurable**: Easy JSON-based configuration
- **♿ Accessible**: ARIA compliant and keyboard navigable

## 🎯 Features

✅ **Theme Toggle** - Automatic light/dark mode switching
✅ **Hide Button** - Allow users to dismiss the attribution
🔗 **3 Links** - Configured navigation links

### Configured Links
- [Visit Clark Today](https://www.clark.today/)
- [Read My Blog](https://www.clark.today/blog)
- [Contact Me](https://www.clark.today/card)

## 💻 Installation Methods

### Method 1: Script Tag (Simplest)
```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Website</title>
</head>
<body>
    <!-- Your content -->
    
    <!-- Attribution Button -->
    <script src="attribution.min.js"></script>
</body>
</html>
```

### Method 2: Async Loading (Performance)
```html
<script>
(function() {
    var script = document.createElement('script');
    script.src = 'attribution.min.js';
    script.async = true;
    script.onload = function() {
        console.log('Clark Today attribution loaded');
    };
    document.head.appendChild(script);
})();
</script>
```

### Method 3: Conditional Loading (Environment-based)
```html
<script>
// Only load on production
if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    var script = document.createElement('script');
    script.src = 'attribution.min.js';
    document.head.appendChild(script);
}
</script>
```

## 🛠️ Build Information

| Property | Value |
|----------|-------|
| **Version** | 1.0.0 |
| **Built** | 2025-06-28T02:23:33.582Z |
| **Config** | config.json |
| **Original Size** | 23,642 bytes |
| **Minified Size** | 19,366 bytes |
| **Compression** | 18.1% |

## 📁 Available Files

| File | Description | Size | Use Case |
|------|-------------|------|----------|
| `attribution.min.js` | Production minified version | 19KB | Live websites |
| `attribution.js` | Development version with comments | 23KB | Development/debugging |
| `index.md` | This documentation | - | Reference |

## 🎨 Brand Configuration

```json
{
  "brand": {
    "name": "Clark Today",
    "shortName": "Hey 👋",
    "description": "Hi, I'm Clark Weckmann, a DevOps Engineer from Southern Illinois. I specialize in web development and automation."
  }
}
```

## 🔧 Customization

To create your own version:

1. **Fork the repository**
2. **Edit `config.json`** with your brand details
3. **Run the build process:**
   ```bash
   npm install
   npm run build
   ```
4. **Use the generated files** from the `build/` directory

## 📞 Support

- **Issues**: Report bugs or request features
- **Documentation**: View the full usage guide
- **Website**: https://www.clark.today/

---

*Generated automatically by the Attribution Button Builder v1.0.0*
