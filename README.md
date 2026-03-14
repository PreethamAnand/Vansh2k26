# VANSH 2K26 Website

VANSH 2K26 is a full-stack event platform built for managing registrations, payments, and role-based operations for a college cultural and technical fest.

## Overview

This project includes:

- Public-facing pages for event discovery, schedules, guidelines, FAQs, and contact information.
- Event and pass registration flows with payment status handling.
- Dashboard experiences for multiple roles (Admin, Super Admin, Judges, Team, Volunteers, and Event Coordinators).
- API routes for registration, team and event management, settings, login, and payment workflows.

## Core Capabilities

- Multi-event registration and participant tracking.
- Pass-based registration support.
- Role-based login and dashboard access.
- Coordinator-specific event management access.
- Email and payment integration for operational workflows.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase

## Project Structure

- `app/`: Routes, pages, and API endpoints.
- `components/`: Shared UI and dashboard components.
- `context/`: Global auth and app context providers.
- `lib/`: Utility modules, data helpers, and service integrations.
- `data/`: Static data sources.
- `public/`: Public static assets.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env` based on your deployment requirements.

3. Start development server:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```

## Notes

- Keep secrets and service keys only in environment files.
- Do not commit production credentials.
- Restart the dev server after updating environment variables.

## License

Copyright (c) 2026 VANSH 2K26. All rights reserved.

