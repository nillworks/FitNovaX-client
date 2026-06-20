import { authClient } from '@/lib/auth-client';
import { isTopAdmin } from '@/lib/admin/topAdmin';

export const setUserRole = (userId, role) => {
  if (isTopAdmin(userId)) {
    return Promise.resolve({
      data: null,
      error: { message: 'Top admin role cannot be changed' },
    });
  }

  return authClient.admin.setRole({ userId, role });
};

export const blockUser = userId => {
  if (isTopAdmin(userId)) {
    return Promise.resolve({
      data: null,
      error: { message: 'Top admin cannot be blocked' },
    });
  }

  return authClient.admin.banUser({
    userId,
    banReason: 'Blocked by admin',
  });
};

export const unblockUser = userId => {
  if (isTopAdmin(userId)) {
    return Promise.resolve({
      data: null,
      error: { message: 'Top admin cannot be unblocked' },
    });
  }

  return authClient.admin.unbanUser({ userId });
};

export const impersonateUser = userId => {
  if (isTopAdmin(userId)) {
    return Promise.resolve({
      data: null,
      error: { message: 'Cannot view as top admin' },
    });
  }

  return authClient.admin.impersonateUser({ userId });
};

export const stopImpersonating = () => authClient.admin.stopImpersonating();
