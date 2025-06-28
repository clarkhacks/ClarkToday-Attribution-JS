// Attribution Button Template - Will be processed by GitHub Actions
(function() {
    // Configuration will be injected here by GitHub Actions
    const config = {{CONFIG_PLACEHOLDER}};
    
    // Create the attribution wrapper
    const wrapper = document.createElement('div');
    wrapper.id = 'clark-attribution-wrapper';
    wrapper.innerHTML = `
        <style>
            ${getStyles()}
        </style>
        
        <button id="clark-att-button" class="clark-att-btn" type="button" style="position:relative;overflow:hidden;z-index:999;">
            <img id="clark-button-logo" alt="${config.brand.name} Logo" loading="lazy" decoding="async" style="color:transparent" src="${config.brand.logo.light}" width="22" height="22">
            <span class="clark-small-only">${config.brand.shortName}</span><span class="clark-big-only">${config.brand.name}</span>
        </button>
        
        <div class="clark-bg-animated hidden" id="clark-bg-animated">
            ${generateAnimatedSpans()}
        </div>
        
        <div class="clark-bg hidden" id="clark-att-bg">
            <div class="clark-menu">
                <button id="clark-close-button" class="clark-exit">
                    <span>✕</span>
                </button>
                <img id="clark-modal-logo" alt="${config.brand.name} Logo" loading="lazy" decoding="async" src="${config.brand.logo.light}" width="48" height="48">
                
                <h5 class="clark-title">${config.brand.name}</h5>
                <p class="clark-desc">${config.brand.description}</p>
                
                <ul class="clark-link-wrapper">
                    ${generateLinks(config.links)}
                </ul>
                
                ${config.features.themeToggle ? getThemeToggleHTML() : ''}
                
                ${config.features.hideButton ? getHideButtonHTML() : ''}
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(wrapper);
    
    // Initialize functionality
    initializeAttribution(config);
    
    function getStyles() {
        return `
            #clark-attribution-wrapper .clark-bg {
                position: fixed;
                width: 100vw;
                height: 100vh;
                top: 0;
                left: 0;
                overflow: hidden;
                background-color: rgba(31, 32, 35, 0.8);
                min-height: 100vh;
                padding: 0;
                margin: 0;
                display: flex;
                align-items: center;
                z-index: 999;
                justify-content: center;
                line-height: 1.5;
                -webkit-text-size-adjust: 100%;
                -moz-tab-size: 4;
                tab-size: 4;
                font-size: 16px!important;
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
                font-feature-settings: normal;
                font-variation-settings: normal;
            }
            #clark-attribution-wrapper .clark-body-reset {
                margin: 0px 0px 0px 0px;
                padding: 0px 0px 0px 0px;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            #clark-attribution-wrapper .hidden {
                display: none!important;
            }
            #clark-attribution-wrapper .clark-link {
                display: flex;
                padding: 0.75rem;
                align-items: center;
                border-radius: 0.5rem;
                font-size: 1rem;
                line-height: 1.5rem;
                font-weight: 600;
                margin-top: 1rem;
                color: #000;
                transition-duration: 150ms;
                transition: transform 0.3s ease-in-out;
                transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                background-color: #e6e6e6;
                text-decoration: none;
            }
            #clark-attribution-wrapper .clark-link:hover {
                transform: scale(1.05);
                background-color: #ccc;
            }
            #clark-attribution-wrapper .clark-menu > ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }
            #clark-attribution-wrapper .clark-menu a {
                color: inherit;
                text-decoration: inherit;
            }
            #clark-attribution-wrapper .clark-link > span{
                flex: 1;
                margin-left: 0.75rem;
                white-space: nowrap;
            }
            #clark-attribution-wrapper .clark-att-btn > img {
                width: 1.4rem;
                height: 1.4rem;
            }
            #clark-attribution-wrapper .clark-att-btn {
                text-transform: none;
                position: fixed !important;
                bottom: 20px;
                right: 20px;
                display: flex;
                -webkit-user-select: none;
                user-select: none;
                align-items: center;
                gap: 0.25rem;
                border-radius: 0.5rem;
                border-width: 1px;
                background-color: rgba(255, 255, 255, 1)!important;
                padding-left: 1rem;
                padding-right: 1rem;
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
                text-align: center;
                vertical-align: middle;
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
                font-size: 0.75rem;
                line-height: 1rem;
                font-weight: 700;
                text-transform: uppercase;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
                transition-property: all;
                transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                transition-duration: 150ms;
                border: none;
                cursor: pointer;
            }
            #clark-attribution-wrapper .clark-att-btn:hover {
                transform: translate(0, 0) rotate(0) skewX(0) skewY(0) scaleX(1.05) scaleY(1.05);
            }
            #clark-attribution-wrapper .clark-att-btn:active {
                opacity: 0.85;
            }
            #clark-attribution-wrapper .clark-exit {
                position: absolute;
                right: 10px;
                top: 10px;
                border: none!important;
                background: none;
                cursor: pointer;
            }
            #clark-attribution-wrapper .clark-exit>span {
                color: #000;
                font-size: 1.5rem!important;
            }
            #clark-attribution-wrapper .clark-menu {
                width: 100%;
                max-width: 20rem;
                padding: 1rem;
                border: 1px solid #2563eb;
                background-color: #fff;
                border-radius: 0.5rem;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                position: relative;
            }
            #clark-attribution-wrapper .clark-menu >img {
                height: 3rem;
                width: 3rem;
                margin: auto;
                display: block;
            }
            #clark-attribution-wrapper .clark-title {
                font-size: 1.6rem!important;
                font-weight: 600;
                font-family: sans-serif!important;
                color: #000;
                margin-bottom: 0.5rem;
                text-align: center;
            }
            #clark-attribution-wrapper .clark-hide-btn {
                display: inline-flex;
                align-items: center;
                font-size: 0.75rem!important;
                font-weight: normal;
                color: #7B7B7B!important;
                margin-top: 0.75rem!important;
                border: none;
                text-align: left;
                background: none;
                cursor: pointer;
            }
            #clark-attribution-wrapper .clark-hide-btn:hover {
                text-decoration: underline;
            }
            #clark-attribution-wrapper .clark-desc {
                font-size: 0.92rem;
                font-weight: normal;
                color: #7B7B7B;
                text-align: center;
                margin-bottom: 1rem;
            }
            #clark-attribution-wrapper .clark-theme-toggle {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                margin-top: 1rem;
                padding: 0.5rem;
                border: 1px solid #d1d5db;
                border-radius: 0.375rem;
                background: none;
                cursor: pointer;
                font-size: 0.875rem;
                color: #6b7280;
                transition: all 0.15s ease;
            }
            #clark-attribution-wrapper .clark-theme-toggle:hover {
                background-color: #f3f4f6;
                border-color: #9ca3af;
            }
            #clark-attribution-wrapper .clark-theme-icon {
                width: 1rem;
                height: 1rem;
            }
            
            /* Dark mode styles */
            #clark-attribution-wrapper[data-theme="dark"] .clark-desc {
                color: #9E9E9E;
            }
            #clark-attribution-wrapper[data-theme="dark"] .clark-hide-btn {
                color: #9E9E9E!important;
            }
            #clark-attribution-wrapper[data-theme="dark"] .clark-link:hover {
                background-color: #57534e;
            }
            #clark-attribution-wrapper[data-theme="dark"] .clark-exit>span {
                color: #fff;
            }
            #clark-attribution-wrapper[data-theme="dark"] .clark-menu {
                background-color: #292524;
                border-color: #60a5fa;
            }
            #clark-attribution-wrapper[data-theme="dark"] .clark-title {
                color: #fff;
            }
            #clark-attribution-wrapper[data-theme="dark"] .clark-att-btn{
                background-color: #292524!important;
                color: #f9fafb!important;
            }
            #clark-attribution-wrapper[data-theme="dark"] .clark-link {
                background-color: #78716c;
                color: #fff!important;
            }
            #clark-attribution-wrapper[data-theme="dark"] .clark-link:hover {
                background-color: #57534e;
            }
            #clark-attribution-wrapper[data-theme="dark"] .clark-theme-toggle {
                border-color: #4b5563;
                color: #d1d5db;
            }
            #clark-attribution-wrapper[data-theme="dark"] .clark-theme-toggle:hover {
                background-color: #374151;
                border-color: #6b7280;
            }
            
            /* Auto mode (default) uses system preference */
            @media (prefers-color-scheme: dark) {
                #clark-attribution-wrapper:not([data-theme="light"]) .clark-desc {
                    color: #9E9E9E;
                }
                #clark-attribution-wrapper:not([data-theme="light"]) .clark-hide-btn {
                    color: #9E9E9E!important;
                }
                #clark-attribution-wrapper:not([data-theme="light"]) .clark-link:hover {
                    background-color: #57534e;
                }
                #clark-attribution-wrapper:not([data-theme="light"]) .clark-exit>span {
                    color: #fff;
                }
                #clark-attribution-wrapper:not([data-theme="light"]) .clark-menu {
                    background-color: #292524;
                    border-color: #60a5fa;
                }
                #clark-attribution-wrapper:not([data-theme="light"]) .clark-title {
                    color: #fff;
                }
                #clark-attribution-wrapper:not([data-theme="light"]) .clark-att-btn{
                    background-color: #292524!important;
                    color: #f9fafb!important;
                }
                #clark-attribution-wrapper:not([data-theme="light"]) .clark-link {
                    background-color: #78716c;
                    color: #fff!important;
                }
                #clark-attribution-wrapper:not([data-theme="light"]) .clark-link:hover {
                    background-color: #57534e;
                }
                #clark-attribution-wrapper:not([data-theme="light"]) .clark-theme-toggle {
                    border-color: #4b5563;
                    color: #d1d5db;
                }
                #clark-attribution-wrapper:not([data-theme="light"]) .clark-theme-toggle:hover {
                    background-color: #374151;
                    border-color: #6b7280;
                }
            }
            
            #clark-attribution-wrapper .clark-big-only {
                display: none;
            }
            #clark-attribution-wrapper .clark-small-only {
                display: inline-block;
            }
            @media (min-width: 768px) {
                #clark-attribution-wrapper .clark-big-only {
                    display: inline-block;
                }
                #clark-attribution-wrapper .clark-small-only {
                    display: none;
                }
            }
            @keyframes clark-move {
                100% {
                    transform: translate3d(0, 0, 1px) rotate(360deg);
                }
            }
            #clark-attribution-wrapper .clark-bg-animated {
                position: fixed;
                width: 100vw;
                height: 100vh;
                top: 0;
                left: 0;
                overflow: hidden;
                background-color: #000;
            }
            #clark-attribution-wrapper .clark-bg-animated span {
                width: 40vmin;
                height: 40vmin;
                border-radius: 40vmin;
                backface-visibility: hidden;
                position: absolute;
                animation: clark-move;
                animation-duration: 28s;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
            }
            ${generateAnimationStyles()}
        `;
    }
    
    function generateAnimatedSpans() {
        return '<span></span>'.repeat(12);
    }
    
    function generateAnimationStyles() {
        const colors = ['#2563eb', '#60a5fa', '#1e40af', '#1d4ed8', '#3b82f6'];
        let styles = '';
        
        for (let i = 1; i <= 12; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const top = Math.floor(Math.random() * 90) + 10;
            const left = Math.floor(Math.random() * 90) + 10;
            const duration = Math.floor(Math.random() * 150) + 75;
            const delay = Math.floor(Math.random() * 250);
            const originX = Math.floor(Math.random() * 50) - 25;
            const originY = Math.floor(Math.random() * 50) - 25;
            const shadow = (Math.random() * 3 + 8).toFixed(6);
            
            styles += `
                #clark-attribution-wrapper .clark-bg-animated span:nth-child(${i}) {
                    color: ${color};
                    top: ${top}%;
                    left: ${left}%;
                    animation-duration: ${duration}s;
                    animation-delay: -${delay}s;
                    transform-origin: ${originX}vw ${originY}vh;
                    box-shadow: 80vmin 0 ${shadow}vmin currentColor;
                }
            `;
        }
        
        return styles;
    }
    
    function generateLinks(links) {
        return links.map(link => 
            `<li><a href="${link.url}" class="clark-link" target="_blank"><span>${link.text}</span></a></li>`
        ).join('');
    }
    
    function getThemeToggleHTML() {
        return `
            <button id="clark-theme-toggle" class="clark-theme-toggle">
                <svg class="clark-theme-icon" id="clark-theme-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
                <span id="clark-theme-text">Auto</span>
            </button>
        `;
    }
    
    function getHideButtonHTML() {
        return `
            <div>
                <button role="button" id="clark-hide-att" class="clark-hide-btn">
                    Click here to hide the button for 60 seconds.
                </button>
            </div>
        `;
    }
    
    function initializeAttribution(config) {
        const hideAttButton = document.getElementById('clark-hide-att');
        const closeButton = document.getElementById('clark-close-button');
        const attButton = document.getElementById('clark-att-button');
        const attBg = document.getElementById('clark-att-bg');
        const attBgAni = document.getElementById('clark-bg-animated');
        const themeToggle = document.getElementById('clark-theme-toggle');
        const themeIcon = document.getElementById('clark-theme-icon');
        const themeText = document.getElementById('clark-theme-text');
        const wrapper = document.getElementById('clark-attribution-wrapper');
        const buttonLogo = document.getElementById('clark-button-logo');
        const modalLogo = document.getElementById('clark-modal-logo');
        
        // Theme management
        let currentTheme = 'auto';
        
        const themes = {
            auto: {
                text: 'Auto',
                icon: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>'
            },
            light: {
                text: 'Light',
                icon: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>'
            },
            dark: {
                text: 'Dark',
                icon: '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>'
            }
        };
        
        function getEffectiveTheme() {
            if (currentTheme === 'auto') {
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            return currentTheme;
        }
        
        function updateLogos() {
            const effectiveTheme = getEffectiveTheme();
            const logoSrc = effectiveTheme === 'dark' 
                ? config.brand.logo.dark
                : config.brand.logo.light;
            
            buttonLogo.src = logoSrc;
            modalLogo.src = logoSrc;
        }
        
        function updateTheme() {
            if (!config.features.themeToggle) return;
            
            const theme = themes[currentTheme];
            themeText.textContent = theme.text;
            themeIcon.innerHTML = theme.icon;
            
            if (currentTheme === 'auto') {
                wrapper.removeAttribute('data-theme');
            } else {
                wrapper.setAttribute('data-theme', currentTheme);
            }
            
            updateLogos();
        }
        
        function cycleTheme() {
            const themeOrder = ['auto', 'light', 'dark'];
            const currentIndex = themeOrder.indexOf(currentTheme);
            const nextIndex = (currentIndex + 1) % themeOrder.length;
            currentTheme = themeOrder[nextIndex];
            updateTheme();
        }
        
        // Listen for system theme changes when in auto mode
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
            if (currentTheme === 'auto') {
                updateLogos();
            }
        });
        
        // Initialize theme
        if (config.features.themeToggle) {
            updateTheme();
        } else {
            updateLogos();
        }
        
        // Event listeners
        attButton.addEventListener('click', function () {
            attBg.classList.remove('hidden');
            attBgAni.classList.remove('hidden');
            document.body.classList.add('clark-body-reset');
        });
        
        closeButton.addEventListener('click', function () {
            attBg.classList.add('hidden');
            attBgAni.classList.add('hidden');
            document.body.classList.remove('clark-body-reset');
        });
        
        if (config.features.hideButton && hideAttButton) {
            hideAttButton.addEventListener('click', function () {
                attButton.classList.add('hidden');
                attBgAni.classList.add('hidden');
                document.body.classList.remove('clark-body-reset');
                attBg.classList.add('hidden');
                
                setTimeout(function () {
                    attButton.classList.remove('hidden');
                    attBg.classList.remove('hidden');
                    attBgAni.classList.remove('hidden');
                }, config.features.hideTimeout || 60000);
            });
        }
        
        if (config.features.themeToggle && themeToggle) {
            themeToggle.addEventListener('click', function () {
                cycleTheme();
            });
        }
    }
})();
