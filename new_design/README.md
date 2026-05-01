# New CV Website Design

This directory contains a completely new, modern design for Thomas Renne's CV website.

## Features

### Design
- **Modern Color Palette**: Professional blue and purple gradient theme
- **Clean Typography**: Uses Inter font family for excellent readability
- **Responsive Layout**: Fully responsive design from mobile to desktop
- **Dark/Light Theme**: Toggle between dark and light modes with system preference detection
- **Smooth Animations**: Subtle animations for better user experience

### Structure
- **Semantic HTML5**: Proper use of semantic elements (header, main, section, article, footer)
- **Modular CSS**: Organized into separate files for better maintainability
- **Vanilla JavaScript**: No jQuery or external dependencies (except Iconify for icons)
- **Accessibility**: WCAG AA compliant with proper ARIA labels and keyboard navigation

### Pages
1. **index.html** - Home page with hero section, about me, publications, and communications
2. **background.html** - Professional experiences, education, and skills
3. **bioinfo.html** - Bioinformatics tools and projects

## File Structure

```
new_design/
├── index.html          # Home page
├── background.html     # Experiences & Education
├── bioinfo.html        # Tools & Projects
├── README.md           # This file
├── css/
│   ├── variables.css   # CSS custom properties & theme system
│   ├── base.css        # Reset & base styles
│   ├── components.css  # Reusable UI components
│   ├── layout.css      # Responsive layout styles
│   └── main.css        # Main stylesheet with imports
└── js/
    ├── theme.js        # Theme management (dark/light)
    ├── language.js     # Language switching (FR/EN)
    ├── back-to-top.js  # Back to top functionality
    ├── loader.js       # Dynamic data loading
    └── main.js         # Main JavaScript & initialization
```

## Key Features

### Theme System
- Automatic detection of system preference (dark/light)
- Persistent user preference in localStorage
- Smooth transitions between themes
- Customizable color palette

### Language Support
- Full French and English support
- Easy to add more languages
- Persistent language preference

### Responsive Design
- Mobile-first approach
- Breakpoints at 320px, 360px, 480px, 768px, 1024px, 1200px
- Touch-friendly interface
- Optimized for all screen sizes

### Accessibility
- Skip to content links
- Proper focus states
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Reduced motion support

### Performance
- Lazy loading for images
- Resource prefetching
- Deferred script loading
- Optimized asset delivery

## Usage

To use this new design:

1. **Copy files to root**: Copy all files from `new_design/` to the repository root
2. **Update paths**: Update image paths from `../data/images/` to `data/images/`
3. **Test**: Open the pages in a browser to verify everything works

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Dependencies

- [Iconify](https://iconify.design/) - For icon support
- [Google Fonts](https://fonts.google.com/) - For Inter font

## Customization

### Colors
Edit `css/variables.css` to change the color palette:
```css
:root {
    --color-primary: #2563eb;
    --color-secondary: #7c3aed;
    --color-accent: #10b981;
    /* ... */
}
```

### Typography
Edit `css/variables.css` to change fonts:
```css
:root {
    --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    /* ... */
}
```

### Layout
Edit `css/layout.css` to modify the responsive layout.

## Development

### Adding New Components
1. Add component styles to `css/components.css`
2. Add layout styles to `css/layout.css` if needed
3. Use the component in your HTML

### Adding New Pages
1. Create a new HTML file
2. Include the main CSS: `<link rel="stylesheet" href="css/main.css">`
3. Include the JavaScript files: theme.js, language.js, back-to-top.js, loader.js, main.js
4. Follow the existing HTML structure and class names

## Migration Notes

This is a complete redesign from scratch. The new design:
- Uses a different visual style and color scheme
- Has improved layout and typography
- Includes better mobile responsiveness
- Has enhanced visual hierarchy
- Maintains all the original content and functionality

## Credits

- **Design & Development**: Mistral Vibe Code (AI Assistant)
- **Original Content**: Thomas Renne
- **Icons**: Iconify (Phosphor icons)
- **Fonts**: Google Fonts (Inter)

## License

This design is provided as-is and can be used freely for personal and commercial purposes.
