import { authClient } from '@/lib/auth-client';

export const setUserRole = (userId, role) =>
  authClient.admin.setRole({ userId, role });

export const blockUser = userId =>
  authClient.admin.banUser({
    userId,
    banReason: 'Blocked by admin',
  });

export const unblockUser = userId => authClient.admin.unbanUser({ userId });
