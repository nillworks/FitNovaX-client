import RequireRole from '@/lib/RequireRole';

const TrainerDashBoardLayout = async ({ children }) => {
  await RequireRole('trainer');

  return children;
};

export default TrainerDashBoardLayout;
