import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient({
  baseURL: process.env.baseURL,
});

export const { signIn, signUp, signOut, useSession } = createAuthClient();
