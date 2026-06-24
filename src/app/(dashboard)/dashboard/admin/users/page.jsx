import ManageUsersSection from '@/Components/DashBoardUi/AdminUi/ManageUsers/ManageUsersSection';
import getUserList from '@/lib/api/getUserList';

export const metadata = { title: 'FitNova | Manage Users' };


const page = async () => {
  const data = await getUserList();
  const users = data?.users || [];

  return (
    <>
      <ManageUsersSection users={users} />
    </>
  );
};

export default page;
