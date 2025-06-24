# Clark Today Attribution Button

Generated on: `2025-06-24T05:08:13.612Z`
Version: `1.0.0`

## Quick Start

Add this script tag to your HTML:

```html
<script src="attribution.min.js"></script>
```

## Configuration Used

```json
{
  "brand": {
    "name": "Clark Today",
    "shortName": "Clark",
    "description": "Hi, I'm Clark Weckmann, a DevOps Engineer from Southern Illinois. I specialize in web development and automation, with a focus on creating interesting projects and sharing my knowledge.",
    "logo": {
      "light": "https://cdn.clark.today/logos/logo-black.png",
      "dark": "https://cdn.clark.today/logos/logo-white.png"
    }
  },
  "links": [
    {
      "text": "Visit Clark Today",
      "url": "https://www.clark.today/"
    },
    {
      "text": "Read My Blog",
      "url": "https://www.clark.today/blog"
    },
    {
      "text": "Contact Me",
      "url": "https://www.clark.today/card"
    }
  ],
  "features": {
    "themeToggle": true,
    "hideButton": true,
    "hideTimeout": 60000
  },
  "styling": {
    "position": {
      "bottom": "20px",
      "right": "20px"
    },
    "colors": {
      "primary": "#2563eb",
      "accent": "#60a5fa"
    }
  }
}
```

## Features

- **Theme Toggle**: ✅ Enabled
- **Hide Button**: ✅ Enabled
- **Links**: 3 configured

## Installation Options

### Option 1: Direct Include
```html
<script src="attribution.min.js"></script>
```

### Option 2: Async Loading
```html
<script>
(function() {
  var script = document.createElement('script');
  script.src = 'attribution.min.js';
  script.async = true;
  script.onload = function() {
    console.log('Attribution button loaded');
  };
  document.head.appendChild(script);
})();
</script>
```

### Option 3: Conditional Loading
```html
<script>
// Only load on production
if (location.hostname !== 'localhost') {
  var script = document.createElement('script');
  script.src = 'attribution.min.js';
  document.head.appendChild(script);
}
</script>
```

## Customization

To customize this button, modify `config.json` and rebuild:

```bash
node build.js config.json attribution
```

## Files Generated

- `attribution.js` - Development version with comments
- `attribution.min.js` - Production minified version
- `attribution-usage.md` - This usage guide

## Support

For issues or customization requests, please visit: https://www.clark.today/
