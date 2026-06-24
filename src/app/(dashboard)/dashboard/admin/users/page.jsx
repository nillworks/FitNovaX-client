import ManageUsersSection from '@/Components/DashBoardUi/AdminUi/ManageUsers/ManageUsersSection';
import getUserList from '@/lib/api/getUserList';
import headersAuthorization from '@/lib/headersAuthorization.server';

export const metadata = { title: 'FitNova | Manage Users' };


const page = async () => {
  const data = await getUserList();
  let users = data?.users || [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_URL || 'http://localhost:8000';
    const authHeaders = await headersAuthorization();
    const res = await fetch(`${baseUrl}/api/admin/users/booking-counts`, {
      headers: authHeaders,
      cache: 'no-store'
    });
    
    if (res.ok) {
      const countsData = await res.json();
      if (countsData.success && countsData.data) {
        users = users.map(user => ({
          ...user,
          totalBookings: countsData.data[user.id] || 0
        }));
      }
    }
  } catch (error) {
    console.error("Failed to fetch booking counts", error);
  }

  return (
    <>
      <ManageUsersSection users={users} />
    </>
  );
};

export default page;
