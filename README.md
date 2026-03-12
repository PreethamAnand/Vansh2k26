# Vansh2k26 — Premium Hackathon Platform

Vansh2k26 is a state-of-the-art hackathon management platform designed for a premium user experience. It features a seamless registration flow, dynamic payment processing, and comprehensive dashboards for participants, judges, and administrators.

## ✨ Features

- **Advanced Registration Flow**: 3-step process (Details → UPI Payment → UTR Verification).
- **Multiple Pass Types**: Dedicated flows for hackathon registration, day passes, group passes, and VIP passes.
- **Dynamic Identity System**: Automated sequential Team ID generation (`VANSH2K26_101`).
- **Smart Payment Integration**: 
  - Dynamic UPI QR Code generation.
  - Automatic transaction note embedding for reconciliation.
  - Support for 12-digit UTR verification.
- **Comprehensive Dashboards**:
  - **Team Portal**: Digital entry tickets with QR codes, submission tracking, and project status.
  - **Admin Command**: Full control over registrations, payment verification, and participant directory.
  - **Judge Panel**: Structured grading pool for project evaluation.
  - **Event Coordinator Workspace**: Event-specific oversight for participant and activity management.
- **Public Event Experience**: Dedicated event pages, updated prize and guideline sections, and a redesigned visual landing flow.
- **Automated Communication**: Professional HTML confirmation emails sent via **Resend** upon registration approval.
- **Premium Aesthetics**: High-fidelity UI using Framer Motion animations and custom glassmorphism effects.

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS & Vanilla CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend/Database**: Supabase (PostgreSQL)
- **Email**: Resend API
- **Transitions**: Next View Transitions

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (Latest LTS)
- Supabase Account
- Resend API Key

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/PreethamAnand/Vansh2k26.git

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_key
```

### 4. Database Setup
Execute the SQL scripts found in `database_setup.sql` and `update_schema.sql` within your Supabase SQL Editor.

### 5. Run Locally
```bash
npm run dev
```

## Gallery Asset Naming

All files in the public gallery folder follow a serial naming convention for easier maintenance and predictable ordering.

- Location: public/gallery
- Format: 3-digit serial number with extension
- Example: 001.jpeg, 002.jpeg ... 024.jpeg

## License
© 2026 Vansh2k26. All rights reserved. Built for high-performance innovation.

