import { createAccessControl } from 'better-auth/plugins/access';
import {
  defaultStatements,
  userAc,
} from 'better-auth/plugins/admin/access';

export const ac = createAccessControl(defaultStatements);

/** Regular admins: list, block, role change — no impersonate */
export const limitedAdminRole = ac.newRole({
  user: ['list', 'ban', 'get', 'update', 'set-role'],
  session: ['list'],
});

export const trainerRole = userAc;

export { userAc };
