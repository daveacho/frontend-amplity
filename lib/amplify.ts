// 'use client';

// import { Amplify } from 'aws-amplify';

// // Only configure if we're in the browser and have the required env vars
// if (typeof window !== 'undefined') {
//   const userPoolId = process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID;
//   const userPoolClientId = process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID;
//   const region = process.env.NEXT_PUBLIC_AWS_REGION;

//   if (userPoolId && userPoolClientId && region) {
//     const amplifyConfig = {
//       Auth: {
//         Cognito: {
//           userPoolId: userPoolId,
//           userPoolClientId: userPoolClientId,
//           loginWith: {
//             email: true,
//           },
//           signUpVerificationMethod: 'code' as const,
//           userAttributes: {
//             email: {
//               required: true,
//             },
//           },
//           allowGuestAccess: false,
//           passwordFormat: {
//             minLength: 8,
//             requireLowercase: true,
//             requireUppercase: true,
//             requireNumbers: true,
//             requireSpecialCharacters: true,
//           },
//         },
//       },
//     };

//     Amplify.configure(amplifyConfig);
//     console.log('Amplify configured with:', { userPoolId, userPoolClientId, region });
//   } else {
//     console.error('Missing Amplify configuration:', { userPoolId, userPoolClientId, region });
//   }


'use client';

import { Amplify } from 'aws-amplify';

// Only configure if we're in the browser and have the required env vars
if (typeof window !== 'undefined') {
  const userPoolId = process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID;
  const userPoolClientId = process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID;
  const region = process.env.NEXT_PUBLIC_AWS_REGION;

  if (userPoolId && userPoolClientId && region) {
    const amplifyConfig = {
      Auth: {
        Cognito: {
          userPoolId: userPoolId,
          userPoolClientId: userPoolClientId,
          loginWith: {
            email: true,
          },
        },
      },
    };

    Amplify.configure(amplifyConfig);
    console.log('Amplify configured with:', { userPoolId, userPoolClientId, region });
  } else {
    console.error('Missing Amplify configuration:', { userPoolId, userPoolClientId, region });
  }
}
