#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG_FILE = process.argv[2] || 'config.json';
const OUTPUT_NAME = process.argv[3] || 'attribution';
const TEMPLATE_FILE = './attribution_template.js';

console.log('🚀 Building Attribution Button...');
console.log(`📄 Config: ${CONFIG_FILE}`);
console.log(`📦 Output: ${OUTPUT_NAME}`);

// Check if required files exist
if (!fs.existsSync(TEMPLATE_FILE)) {
	console.error(`❌ Template file ${TEMPLATE_FILE} not found!`);
	process.exit(1);
}

if (!fs.existsSync(CONFIG_FILE)) {
	console.error(`❌ Config file ${CONFIG_FILE} not found!`);
	process.exit(1);
}

try {
	// Read and validate config
	console.log('🔍 Validating configuration...');
	const configContent = fs.readFileSync(CONFIG_FILE, 'utf8');
	const config = JSON.parse(configContent);

	// Validate required fields
	const requiredFields = [
		'brand.name',
		'brand.shortName',
		'brand.description',
		'brand.logo.light',
		'brand.logo.dark',
		'links',
	];

	for (const field of requiredFields) {
		const value = field.split('.').reduce((obj, key) => obj?.[key], config);
		if (!value) {
			throw new Error(`Missing required field: ${field}`);
		}
	}

	if (!Array.isArray(config.links) || config.links.length === 0) {
		throw new Error('Links array is required and must not be empty');
	}

	for (const link of config.links) {
		if (!link.text || !link.url) {
			throw new Error('Each link must have text and url properties');
		}
	}

	console.log('✅ Configuration valid');

	// Read template
	console.log('📖 Reading template...');
	const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');

	// Replace placeholder with config
	console.log('🔄 Processing template...');
	const processedContent = template.replace(
		'{{CONFIG_PLACEHOLDER}}',
		JSON.stringify(config)
	);

	// Create build info
	const buildInfo = {
		timestamp: new Date().toISOString(),
		config: CONFIG_FILE,
		version: require('./package.json')?.version || '1.0.0',
	};
ficx
	// Ensure build directory exists
	const buildDir = 'build';
	if (!fs.existsSync(buildDir)) {
		fs.mkdirSync(buildDir, { recursive: true });
		console.log(`📁 Created ${buildDir} directory`);
	}

	// Write full version
	const fullOutput = `build/${OUTPUT_NAME}.js`;
	const header = `/* 
 * Attribution Button - Generated ${buildInfo.timestamp}
 * Config: ${CONFIG_FILE}
 * Version: ${buildInfo.version}
 */\n\n`;

	fs.writeFileSync(fullOutput, header + processedContent);
	console.log(`📝 Generated ${fullOutput}`);

	// Minify if terser is available
	const minifiedOutput = `build/${OUTPUT_NAME}.min.js`;
	try {
		console.log('🗜️  Minifying...');
		execSync(
			`npx terser ${fullOutput} --compress drop_console=true,drop_debugger=true --mangle -o ${minifiedOutput}`,
			{
				stdio: 'pipe',
			}
		);

		// Add header to minified version
		const minified = fs.readFileSync(minifiedOutput, 'utf8');
		const minHeader = `/* Attribution Button v${buildInfo.version} - ${buildInfo.timestamp} */\n`;
		fs.writeFileSync(minifiedOutput, minHeader + minified);

		console.log(`📦 Generated ${minifiedOutput}`);

		// Show file sizes
		const originalSize = fs.statSync(fullOutput).size;
		const minifiedSize = fs.statSync(minifiedOutput).size;
		const compression = (
			((originalSize - minifiedSize) / originalSize) *
			100
		).toFixed(1);

		console.log(`📊 Original: ${originalSize} bytes`);
		console.log(`📊 Minified: ${minifiedSize} bytes`);
		console.log(`📊 Compression: ${compression}%`);
	} catch (error) {
		console.warn(
			'⚠️  Minification failed. Install terser: npm install -g terser'
		);
		console.warn('   Continuing with unminified version only...');
	}

	// Generate usage instructions
	const usageFile = `${OUTPUT_NAME}-usage.md`;
	const usage = generateUsageInstructions(config, OUTPUT_NAME, buildInfo);
	fs.writeFileSync(usageFile, usage);
	console.log(`📋 Generated ${usageFile}`);

	// Generate index.md for build directory
	const indexFile = `build/index.md`;
	const indexContent = generateIndexMarkdown(config, OUTPUT_NAME, buildInfo);
	fs.writeFileSync(indexFile, indexContent);
	console.log(`📋 Generated ${indexFile}`);

	console.log('✨ Build complete!');
} catch (error) {
	console.error('❌ Build failed:', error.message);
	process.exit(1);
}

function generateIndexMarkdown(config, outputName, buildInfo) {
	const originalSize = fs.existsSync(`build/${outputName}.js`)
		? fs.statSync(`build/${outputName}.js`).size
		: 0;
	const minifiedSize = fs.existsSync(`build/${outputName}.min.js`)
		? fs.statSync(`build/${outputName}.min.js`).size
		: 0;
	const compression =
		originalSize > 0
			? (((originalSize - minifiedSize) / originalSize) * 100).toFixed(1)
			: '0';

	return `# ${config.brand.name} Attribution Button

> ${config.brand.description}

**Version:** ${buildInfo.version} | **Built:** ${new Date(
		buildInfo.timestamp
	).toLocaleString()}

## 🚀 Quick Start

Choose your preferred method to add the attribution button to your website:

### CDN (Recommended)
\`\`\`html
<script src="${process.env.GITHUB_PAGES_URL || 'https://yourusername.github.io/yourrepo'}/${outputName}.min.js"></script>
\`\`\`

### Direct Download
- [📦 ${outputName}.min.js](${outputName}.min.js) (${Math.round(
		minifiedSize / 1024
	)}KB, production ready)
- [📄 ${outputName}.js](${outputName}.js) (${Math.round(
		originalSize / 1024
	)}KB, development version)

## 📋 Project Overview

This attribution button provides a clean, customizable way to display brand attribution and important links on your website. It features:

- **🎨 Theme Support**: Automatic light/dark theme detection
- **📱 Responsive Design**: Works on all device sizes
- **⚡ Lightweight**: Only ${Math.round(
		minifiedSize / 1024
	)}KB minified (${compression}% compression)
- **🔧 Configurable**: Easy JSON-based configuration
- **♿ Accessible**: ARIA compliant and keyboard navigable

## 🎯 Features

${
	config.features?.themeToggle ? '✅' : '❌'
} **Theme Toggle** - Automatic light/dark mode switching
${
	config.features?.hideButton ? '✅' : '❌'
} **Hide Button** - Allow users to dismiss the attribution
🔗 **${config.links.length} Links** - Configured navigation links

### Configured Links
${config.links.map((link) => `- [${link.text}](${link.url})`).join('\n')}

## 💻 Installation Methods

### Method 1: Script Tag (Simplest)
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Your Website</title>
</head>
<body>
    <!-- Your content -->
    
    <!-- Attribution Button -->
    <script src="${outputName}.min.js"></script>
</body>
</html>
\`\`\`

### Method 2: Async Loading (Performance)
\`\`\`html
<script>
(function() {
    var script = document.createElement('script');
    script.src = '${outputName}.min.js';
    script.async = true;
    script.onload = function() {
        console.log('${config.brand.name} attribution loaded');
    };
    document.head.appendChild(script);
})();
</script>
\`\`\`

### Method 3: Conditional Loading (Environment-based)
\`\`\`html
<script>
// Only load on production
if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    var script = document.createElement('script');
    script.src = '${outputName}.min.js';
    document.head.appendChild(script);
}
</script>
\`\`\`

## 🛠️ Build Information

| Property | Value |
|----------|-------|
| **Version** | ${buildInfo.version} |
| **Built** | ${buildInfo.timestamp} |
| **Config** | ${buildInfo.config} |
| **Original Size** | ${originalSize.toLocaleString()} bytes |
| **Minified Size** | ${minifiedSize.toLocaleString()} bytes |
| **Compression** | ${compression}% |

## 📁 Available Files

| File | Description | Size | Use Case |
|------|-------------|------|----------|
| \`${outputName}.min.js\` | Production minified version | ${Math.round(
		minifiedSize / 1024
	)}KB | Live websites |
| \`${outputName}.js\` | Development version with comments | ${Math.round(
		originalSize / 1024
	)}KB | Development/debugging |
| \`index.md\` | This documentation | - | Reference |

## 🎨 Brand Configuration

\`\`\`json
{
  "brand": {
    "name": "${config.brand.name}",
    "shortName": "${config.brand.shortName}",
    "description": "${config.brand.description}"
  }
}
\`\`\`

## 🔧 Customization

To create your own version:

1. **Fork the repository**
2. **Edit \`config.json\`** with your brand details
3. **Run the build process:**
   \`\`\`bash
   npm install
   npm run build
   \`\`\`
4. **Use the generated files** from the \`build/\` directory

## 📞 Support

- **Issues**: Report bugs or request features
- **Documentation**: View the full usage guide
- **Website**: ${
		config.links.find(
			(link) =>
				link.text.toLowerCase().includes('website') ||
				link.text.toLowerCase().includes('home')
		)?.url || config.links[0]?.url
	}

---

*Generated automatically by the Attribution Button Builder v${
		buildInfo.version
	}*
`;
}

function generateUsageInstructions(config, outputName, buildInfo) {
	return `# ${config.brand.name} Attribution Button

Generated on: \`${buildInfo.timestamp}\`
Version: \`${buildInfo.version}\`

## Quick Start

Add this script tag to your HTML:

\`\`\`html
<script src="${outputName}.min.js"></script>
\`\`\`

## Configuration Used

\`\`\`json
${JSON.stringify(config, null, 2)}
\`\`\`

## Features

- **Theme Toggle**: ${
		config.features?.themeToggle ? '✅ Enabled' : '❌ Disabled'
	}
- **Hide Button**: ${config.features?.hideButton ? '✅ Enabled' : '❌ Disabled'}
- **Links**: ${config.links.length} configured

## Installation Options

### Option 1: Direct Include
\`\`\`html
<script src="${outputName}.min.js"></script>
\`\`\`

### Option 2: Async Loading
\`\`\`html
<script>
(function() {
  var script = document.createElement('script');
  script.src = '${outputName}.min.js';
  script.async = true;
  script.onload = function() {
    console.log('Attribution button loaded');
  };
  document.head.appendChild(script);
})();
</script>
\`\`\`

### Option 3: Conditional Loading
\`\`\`html
<script>
// Only load on production
if (location.hostname !== 'localhost') {
  var script = document.createElement('script');
  script.src = '${outputName}.min.js';
  document.head.appendChild(script);
}
</script>
\`\`\`

## Customization

To customize this button, modify \`config.json\` and rebuild:

\`\`\`bash
node build.js config.json ${outputName}
\`\`\`

## Files Generated

- \`${outputName}.js\` - Development version with comments
- \`${outputName}.min.js\` - Production minified version
- \`${outputName}-usage.md\` - This usage guide

## Support

For issues or customization requests, please visit: ${
		config.links[0]?.url || 'your-support-url'
	}
`;
}
