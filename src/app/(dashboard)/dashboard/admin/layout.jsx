import RequireRole from '@/lib/RequireRole';

const AdminDashBoardLayout = async ({ children }) => {
  await RequireRole('admin');
  return children;
};

export default AdminDashBoardLayout;
