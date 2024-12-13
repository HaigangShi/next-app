# Next.js Best Practices

A modern web application template built with [Next.js](https://nextjs.org) and [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev         # Development environment
npm run dev:test    # Test environment
npm run dev:pre     # Pre-production environment
```

### Build & Deploy

```bash
# Build application
npm run build         # Production build
npm run build:test    # Test environment build
npm run build:pre     # Pre-production build

# Start server
npm run start         # Production
npm run start:test    # Test environment
npm run start:pre     # Pre-production
```

## Project Structure

```
next-app/
├── public/          # Static assets
│   └── images/      # Image assets
├── src/
│   ├── app/         # Pages (App Router)
│   ├── components/  # Reusable components
│   ├── contexts/    # React Contexts
│   ├── hooks/       # Custom Hooks
│   ├── lib/         # Third-party configurations
│   ├── services/    # API services and data fetching
│   ├── styles/      # Global styles and CSS modules
│   └── utils/       # Utility functions
├── .gitignore       # Git ignore rules
├── next.config.mjs  # Next.js configuration
├── package.json     # Project dependencies
└── README.md        # Project documentation
```

## Tech Stack

- **Framework**: Next.js 15.1.0 + React 19
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Development Tools**:
  - ESLint: Code linting
  - PostCSS: CSS processing
  - Multi-environment configuration support

## Utility Modules

### Storage Utility

Enhanced localStorage wrapper for convenient storage operations:

```javascript
// Set storage prefix
Storage.setPrefix('myapp_');

// Store data
Storage.set('user', { name: 'John' });

// Retrieve data
const user = Storage.get('user');
```

Features:
- Configurable key prefix
- Browser compatibility handling
- TypeScript support

## Development Guidelines

### Code Style
- Follow project ESLint configuration
- Use Tailwind CSS for styling
- Maintain modular and reusable components

### Project Organization
- Place page files in `src/app/` directory
- Store reusable components in `src/components/`
- Implement business logic in `src/services/`
- Keep utility functions in `src/utils/`

### Best Practices
- Use appropriate environment variables for different deployments
- Follow Next.js recommended patterns for routing and data fetching
- Maintain proper code documentation

## Deployment

We recommend deploying using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the official deployment platform for Next.js.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
