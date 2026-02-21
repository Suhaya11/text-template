# Project Overview: text-template
A modern web application built with **Next.js (App Router)** and **React 19** for managing and displaying code snippets. It utilizes **Tailwind CSS 4** for styling and **react-syntax-highlighter** for code presentation.

## Core Technologies
- **Framework:** Next.js 16.1.6
- **Library:** React 19.2.3
- **Styling:** Tailwind CSS 4 + PostCSS
- **Icons:** React Icons (Bi, Fa6, Hi, Md)
- **Testing:** Jest + React Testing Library
- **Language:** TypeScript/JavaScript (Mixed)

## Project Structure
- `/app`: Contains the application routes and layouts (Next.js App Router).
  - `/home`: A specific route for the home dashboard.
- `/src/components`: Reusable UI components.
  - `TemplateCard.jsx`: Main component for displaying snippet cards with hover actions.
  - `Nav.jsx`: Sidebar navigation.
  - `Header.jsx`: Top search and action bar.
- `/public`: Static assets (SVG logos, icons).

## Building and Running
- **Development:** `npm run dev`
- **Production Build:** `npm run build`
- **Start Production:** `npm run start`
- **Linting:** `npm run lint`
- **Testing:** `npm run test` (Runs Jest in watch mode)

## Development Conventions
- **Client Components:** Use the `"use client"` directive for components requiring state or browser APIs (like `TemplateCard.jsx`).
- **Styling:** Use Tailwind CSS utility classes. Prefer Vanilla CSS for complex custom animations/styles if needed.
- **Components:** Logic should be modular. For example, `TemplateCard` should delegate individual card logic to a `SnippetCard` sub-component to prevent performance lag.
- **Data:** Static snippet data is currently managed in `src/components/data.js`.

## TODO / Future Improvements
- [ ] Connect the "New snippet" button in `Header.jsx` to a creation form.
- [ ] Implement search functionality in the `Header` component.
- [ ] Add persistence for snippets (Database/API).
- [ ] Implement "Edit" and "Delete" functionality in `SnippetCard`.
