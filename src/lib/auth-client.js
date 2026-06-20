import { adminClient, jwtClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { ac, limitedAdminRole, userAc, trainerRole } from './admin/permissions';

const adminPluginOptions = {
  ac,
  roles: {
    admin: limitedAdminRole,
    user: userAc,
    trainer: trainerRole,
  },
};

export const authClient = createAuthClient({
  baseURL: process.env.baseURL,
  plugins: [jwtClient(), adminClient(adminPluginOptions)],
});

export const { signIn, signUp, signOut, useSession } = authClient;
