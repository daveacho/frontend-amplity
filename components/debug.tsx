'use client';

export default function Debug() {
  return (
    <div className="p-4 bg-gray-100 rounded">
      <h3>Environment Variables Debug:</h3>
      <ul>
        <li>API_URL: {process.env.NEXT_PUBLIC_API_URL || 'NOT SET'}</li>
        <li>USER_POOL_ID: {process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID || 'NOT SET'}</li>
        <li>CLIENT_ID: {process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID || 'NOT SET'}</li>
        <li>REGION: {process.env.NEXT_PUBLIC_AWS_REGION || 'NOT SET'}</li>
      </ul>
    </div>
  );
}
