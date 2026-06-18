import { adminClient, jwtClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient({
  baseURL: process.env.baseURL,
  plugins: [jwtClient(), adminClient()],
});

export const { signIn, signUp, signOut, useSession } = createAuthClient();
