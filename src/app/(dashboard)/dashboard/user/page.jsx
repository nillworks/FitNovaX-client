import OverviewPageUi from '@/Components/DashBoardUi/UserUi/OverviewPageUi/OverviewPageUi';
import getUserFavorites from '@/lib/api/getUserFavorites';
import getUserSession from '@/lib/getUserSession';

export const metadata = { title: 'FitNova | User Dashboard' };


const page = async () => {
  const user = await getUserSession();
  const favoriteData = await getUserFavorites(user?.id);

  return (
    <div>
      <OverviewPageUi favoriteData={favoriteData} />
    </div>
  );
};

export default page;
