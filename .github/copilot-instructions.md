# Copilot Coding Agent Instructions

## Project Overview

This is a modern Markdown editor web application with real-time preview and multi-platform export capabilities. The project is built with React 18 and TypeScript, using Vite as the build tool.

**Primary Language:** Chinese (Simplified)
**Project Type:** Single-page web application
**Deployment:** GitHub Pages

## Repository Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── MarkdownEditor.tsx      # Main editor component
│   │   ├── SideBar.tsx             # Sidebar component
│   │   ├── ThemeSelector.tsx       # Theme selector component
│   │   ├── ChannelExporter.tsx     # Multi-platform exporter
│   │   └── PostPublish.tsx         # Publishing component
│   ├── utils/               # Utility functions
│   │   ├── markdownToHtml.ts       # Markdown to HTML conversion
│   │   └── api.ts                  # API interfaces
│   ├── App.tsx              # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── .github/
│   └── workflows/          # GitHub Actions workflows
│       └── deploy.yml      # Deployment to GitHub Pages
├── index.html              # HTML template
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

## Tech Stack

- **Frontend Framework:** React 18+ with TypeScript
- **Build Tool:** Vite
- **Markdown Parser:** marked
- **Styling:** CSS Modules
- **Code Quality:** ESLint + TypeScript strict mode
- **Node Version:** 20

## Build and Development Commands

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Runs development server on http://localhost:5173

### Production Build
```bash
npm run build
```
Compiles TypeScript and builds for production. Output directory: `dist/`

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```
**Note:** ESLint configuration may need to be set up. If linting fails due to missing config, skip it or create a basic ESLint config file.

## Coding Standards and Conventions

### TypeScript
- Use **strict mode** (enabled in tsconfig.json)
- Prefer functional components with hooks over class components
- Use explicit types for function parameters and return values
- Enable `noUnusedLocals` and `noUnusedParameters`

### React
- Use functional components with React hooks
- Follow React 18+ best practices
- Use `useState`, `useEffect`, and other hooks appropriately
- Component files should use `.tsx` extension
- Style files should use `.css` extension

### File Naming
- Components: PascalCase (e.g., `MarkdownEditor.tsx`)
- Utilities: camelCase (e.g., `markdownToHtml.ts`)
- CSS files: Match component name (e.g., `MarkdownEditor.css`)

### Code Style
- Use ES6+ features (arrow functions, destructuring, template literals)
- Prefer `const` over `let`
- Use template literals for string interpolation
- Add meaningful comments for complex logic

### Comments and Documentation
- Write comments in Chinese (Simplified) to match the project language
- Document complex functions with JSDoc-style comments
- Keep comments concise and meaningful

## Development Workflow

### Adding New Features
1. Create new component files in `src/components/` directory
2. Create corresponding CSS files for component styles
3. Import and use components in `App.tsx` or other parent components
4. Test locally with `npm run dev`
5. Build and verify with `npm run build`

### Modifying Existing Components
1. Locate the component in `src/components/`
2. Make minimal necessary changes
3. Update related CSS files if styling changes are needed
4. Test changes with development server
5. Verify TypeScript compilation passes

### GitHub Pages Configuration
- The app uses `/github.io/` as the base path (configured in `vite.config.ts`)
- Do not modify the `base` setting unless changing deployment configuration
- All routes and asset paths must be relative to this base path

## Common Patterns

### Component Structure
```typescript
import { useState } from 'react'
import './ComponentName.css'

interface ComponentNameProps {
  // Define props
}

function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  const [state, setState] = useState(initialValue)
  
  return (
    <div className="component-name">
      {/* Component JSX */}
    </div>
  )
}

export default ComponentName
```

### CSS Modules Pattern
- Each component has its own CSS file
- Use semantic class names
- Follow BEM-like naming conventions where appropriate

## Testing Guidelines

**Note:** There is currently no test framework set up in this repository. If adding tests is required:
- Consider using Vitest (Vite's test framework)
- Or Jest with React Testing Library
- Follow React component testing best practices
- Test user interactions and component rendering

## Acceptance Criteria for Tasks

When implementing features or fixes, ensure:
1. Code compiles without TypeScript errors (`npm run build` succeeds)
2. Changes follow the existing code structure and patterns
3. New components follow the established naming conventions
4. CSS is properly scoped to components
5. Changes are minimal and focused on the specific task
6. No breaking changes to existing functionality
7. Comments and documentation are in Chinese (Simplified)

## Deployment

- Deployment is automated via GitHub Actions
- Pushing to `main` branch triggers deployment workflow
- Workflow builds the app and deploys to GitHub Pages
- No manual deployment steps required

## Known Issues

- ESLint configuration file is not present; linting may fail
- If linting is required, create `.eslintrc.json` with appropriate rules for React + TypeScript

## Good Tasks for Copilot Coding Agent

✅ **Suitable Tasks:**
- Adding new React components
- Implementing UI features
- Improving existing components
- Adding utility functions
- Updating documentation
- Bug fixes in components or utilities
- Accessibility improvements
- CSS styling improvements

❌ **Tasks to Avoid:**
- Complex architectural changes
- Security-sensitive modifications
- Major refactoring without clear requirements
- Changes requiring deep domain knowledge of specific export platforms

## Additional Notes

- The project is primarily in Chinese; maintain this language consistency
- Focus on React best practices and TypeScript strict typing
- Keep the application lightweight and performant
- Ensure changes work with Vite's hot module replacement during development
