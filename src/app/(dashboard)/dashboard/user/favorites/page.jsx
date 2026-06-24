import FavoriteClasses from '@/Components/DashBoardUi/UserUi/FavoritesPageUi/FavoriteClasses';
import getUserFavorites from '@/lib/api/getUserFavorites';
import getUserSession from '@/lib/getUserSession';

export const metadata = { title: 'FitNova | My Favorites' };


const page = async () => {
  const user = await getUserSession();
  const favoriteData = await getUserFavorites(user?.id);

  return (
    <>
      <FavoriteClasses favoriteData={favoriteData} />
    </>
  );
};

export default page;
