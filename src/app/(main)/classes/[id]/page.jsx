import DetailsPage from '@/Components/DetailsPage/DetailsPage';
import getSingleClass from '@/lib/api/getSingleClass';
import getUserFavorites from '@/lib/api/getUserFavorites';
import getUserSession from '@/lib/getUserSession';

const page = async ({ params }) => {
  const { id } = await params;
  const result = await getSingleClass(id);
  const singleClassData = result.data;

  const user = await getUserSession();
  const favoriteData = await getUserFavorites(user?.id);
  const isFavorite = favoriteData?.data?.favorite;

  return (
    <>
      <DetailsPage singleClassData={singleClassData} isFavorite={isFavorite} />
    </>
  );
};

export default page;
