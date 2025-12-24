# Miemploya HR Website

## Overview

Miemploya HR is a professional human resources services website that enables public users to request HR services and verification without requiring login/signup. The platform includes a Super Admin dashboard for Miemploya HR staff to manage content, service requests, job postings, and verified candidates. The website features content sections for news feeds, training videos, PDFs/books, and a Top Verified candidates showcase.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state caching and synchronization
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ES modules)
- **File Uploads**: Multer middleware handling images, videos, and PDFs (stored in `client/public/uploads`)
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts` with Zod validation schemas

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts` defines all tables
- **Tables**:
  - `service_requests` - HR service request submissions from public users
  - `content_items` - News, videos, PDFs, events with publish status
  - `verified_candidates` - Candidate profiles with approval workflow
  - `templates` - Downloadable HR books and templates
  - `job_postings` - Job listings with full details
  - `job_applications` - Applications with CV uploads

### Authentication
- **Admin Only**: Simple password-based authentication (no public user accounts)
- **Token Storage**: Base64-encoded token stored in localStorage
- **Protected Routes**: Admin endpoints verify Bearer token in Authorization header

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route page components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and query client
├── server/              # Express backend
│   ├── routes.ts        # API endpoint handlers
│   ├── storage.ts       # Database access layer
│   └── db.ts            # Drizzle database connection
├── shared/              # Shared between client/server
│   ├── schema.ts        # Drizzle table definitions
│   └── routes.ts        # API contract with Zod schemas
└── migrations/          # Drizzle database migrations
```

### Key Design Decisions
1. **No Public Authentication**: Public users can submit requests and apply for jobs without accounts, reducing friction
2. **File-Based Uploads**: All media uses file uploads rather than URL inputs to ensure content control
3. **Shared Type Definitions**: Zod schemas in `shared/routes.ts` provide type safety across client/server boundary
4. **Content Publishing Workflow**: All admin content has publish/unpublish toggles for editorial control

## External Dependencies

### Database
- **PostgreSQL**: Primary database (connection via `DATABASE_URL` environment variable)
- **Drizzle ORM**: Type-safe database queries and migrations

### UI Libraries
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, tabs, etc.)
- **Shadcn/ui**: Pre-styled component library built on Radix
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Frontend build and dev server with HMR
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Production server bundling

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `ADMIN_PASSWORD`: Password for admin dashboard access (defaults to "admin123")