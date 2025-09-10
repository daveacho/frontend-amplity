# Frontend - Task Manager App

Next.js frontend application with AWS Cognito authentication and Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual values

# Run development server
npm run dev
```

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID` - AWS Cognito User Pool ID
- `NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID` - AWS Cognito Client ID
- `NEXT_PUBLIC_AWS_REGION` - AWS Region

## Deployment

This app is configured for AWS Amplify deployment with automatic builds from Git branches.

### Production
- Branch: `main`
- Auto-deploy: Enabled

### Staging
- Branch: `staging`
- Auto-deploy: Enabled

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Authentication**: AWS Cognito
- **Deployment**: AWS Amplify
