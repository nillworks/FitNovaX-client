import RequireRole from '@/lib/RequireRole';

const userDashBoardLayout = async ({ children }) => {
  await RequireRole('user');
  return children;
};

export default userDashBoardLayout;
