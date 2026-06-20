export const TOP_ADMIN_USER_ID = process.env.NEXT_PUBLIC_TOP_ADMIN_USER_ID;

export const isTopAdmin = userId =>
  Boolean(TOP_ADMIN_USER_ID && userId === TOP_ADMIN_USER_ID);

export const isAdminUser = role => role === 'admin';

/** All admins can change roles — top admin account is protected */
export const canChangeRole = (actorRole, targetUser) => {
  if (isTopAdmin(targetUser.id)) return false;
  return isAdminUser(actorRole);
};

/** Only top admin can view as — user, trainer, or admin */
export const canImpersonateTarget = (actorId, actorRole, targetUser) => {
  if (!isTopAdmin(actorId)) return false;
  if (isTopAdmin(targetUser.id)) return false;
  if (targetUser.id === actorId) return false;
  return isAdminUser(actorRole);
};

export const canBlockTarget = targetUser => !isTopAdmin(targetUser.id);
