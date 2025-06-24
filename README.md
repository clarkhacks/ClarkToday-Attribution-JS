# Attribution Button Builder

A configurable attribution button system that generates minified JavaScript files via GitHub Actions or local build scripts.

## Features

- 🎨 **Fully Configurable** - Brand, links, colors, and features
- 🌙 **Dark/Light/Auto Theme** - Automatic theme detection and manual toggle
- 📱 **Responsive Design** - Works on desktop and mobile
- 🎭 **Animated Background** - Beautiful floating animation
- 🚀 **GitHub Actions** - Automated builds and deployments
- 📦 **Minified Output** - Optimized for production
- 🔧 **Local Build Support** - Build locally without CI/CD

## Quick Start

1. **Clone this repository**
   ```bash
   git clone https://github.com/your-username/attribution-button.git
   cd attribution-button
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Customize your configuration**
   ```bash
   cp config.json my-config.json
   # Edit my-config.json with your brand details
   ```

4. **Build locally**
   ```bash
   npm run build
   # or with custom config:
   node build.js my-config.json my-attribution
   ```

5. **Use the generated file**
   ```html
   <script src="attribution.min.js"></script>
   ```

## Configuration

Edit `config.json` to customize your attribution button:

```json
{
  "brand": {
    "name": "Your Brand",
    "shortName": "Brand",
    "description": "Your tagline here",
    "logo": {
      "light": "https://example.com/logo-dark.png",
      "dark": "https://example.com/logo-light.png"
    }
  },
  "links": [
    {
      "text": "Visit Website",
      "url": "https://example.com"
    }
  ],
  "features": {
    "themeToggle": true,
    "hideButton": true,
    "hideTimeout": 60000
  }
}
```

### Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `brand.name` | string | Full brand name (shown in modal) |
| `brand.shortName` | string | Short name (shown on button) |
| `brand.description` | string | Description text in modal |
| `brand.logo.light` | string | Logo URL for light theme |
| `brand.logo.dark` | string | Logo URL for dark theme |
| `links` | array | Array of link objects with `text` and `url` |
| `features.themeToggle` | boolean | Enable theme switching |
| `features.hideButton` | boolean | Enable "hide button" functionality |
| `features.hideTimeout` | number | Hide duration in milliseconds |

## GitHub Actions Setup

1. **Enable GitHub Actions** in your repository settings

2. **Add your config file** to the repository root

3. **Push to main branch** to trigger automatic build

4. **Manual builds** via workflow dispatch:
   - Go to Actions tab
   - Select "Build Attribution Button"
   - Click "Run workflow"
   - Specify custom config file if needed

### Workflow Inputs

- `config_file`: Path to config file (default: `config.json`)
- `output_name`: Output filename prefix (default: `attribution`)

## Local Development

### Prerequisites

- Node.js 14+
- npm or yarn

### Commands

```bash
# Install dependencies
npm install

# Build with default config
npm run build

# Build with custom config
node build.js my-config.json my-output

# Clean generated files
npm run clean

# Validate config file
npm run validate

# Serve files locally for testing
npm run serve
```

### Testing Your Button

1. Build the button:
   ```bash
   npm run build
   ```

2. Create a test HTML file:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Test Attribution Button</title>
   </head>
   <body>
       <h1>Test Page</h1>
       <p>The attribution button should appear in the bottom-right corner.</p>
       <script src="attribution.min.js"></script>
   </body>
   </html>
   ```

3. Serve locally:
   ```bash
   npm run serve
   # Visit http://localhost:8000
   ```

## File Structure

```
attribution-button/
├── attribution-template.js    # Main template file
├── config.json               # Default configuration
├── build.js                  # Local build script
├── package.json              # Node.js dependencies
├── .github/
│   └── workflows/
│       └── build-attribution.yml  # GitHub Actions workflow
├── README.md                 # This file
└── generated files:
    ├── attribution.js        # Full version
    ├── attribution.min.js    # Minified version
    └── attribution-usage.md  # Usage instructions
```

## Production Deployment

### Option 1: GitHub Releases
- Builds are automatically released on main branch pushes
- Download from the Releases page
- Each release includes both minified and full versions

### Option 2: GitHub Pages
- Builds are deployed to `https://username.github.io/repo/builds/timestamp/`
- Latest build available at the generated URL

### Option 3: CDN Upload
- Download the minified file from artifacts
- Upload to your CDN (CloudFlare, AWS CloudFront, etc.)
- Reference via CDN URL

## Integration Examples

### Basic Integration
```html
<script src="attribution.min.js"></script>
```

### Conditional Loading
```html
<script>
// Only load on production
if (location.hostname !== 'localhost') {
  const script = document.createElement('script');
  script.src = 'https://cdn.example.com/attribution.min.js';
  document.head.appendChild(script);
}
</script>
```

### Async Loading with Callback
```html
<script>
(function() {
  const script = document.createElement('script');
  script.src = 'attribution.min.js';
  script.async = true;
  script.onload = function() {
    console.log('Attribution button loaded successfully');
  };
  document.head.appendChild(script);
})();
</script>
```

## Customization

### Custom Styling
The button includes comprehensive CSS that can be overridden:

```css
/* Override button position */
#clark-attribution-wrapper .clark-att-btn {
  bottom: 10px !important;
  left: 20px !important;
  right: auto !important;
}

/* Custom colors */
#clark-attribution-wrapper .clark-att-btn {
  background-color: #your-color !important;
}
```

### Custom Animation Colors
Modify the `generateAnimationStyles()` function in the template to use your brand colors.

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Create an [issue](https://github.com/your-username/attribution-button/issues) for bug reports
- Check existing issues before creating new ones
- For feature requests, please provide detailed use cases
