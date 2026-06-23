import DetailsPage from '@/Components/DetailsPage/DetailsPage';
import getSingleClass from '@/lib/api/getSingleClass';
import getUserFavorites from '@/lib/api/getUserFavorites';
import getUserSession from '@/lib/getUserSession';
import { redirect } from 'next/navigation';

const page = async ({ params }) => {
  const { id } = await params;
  const result = await getSingleClass(id);
  const singleClassData = result.data;

  const user = await getUserSession();

  if (!user) {
    return redirect('/login');
  }

  const favoriteData = await getUserFavorites(user?.id);
  
  // Find if this class exists in the user's favorites array
  const favoriteObj = favoriteData?.data?.find(fav => fav.classId === id);
  const isFavorite = !!favoriteObj;
  const favoriteId = favoriteObj?._id?.$oid || favoriteObj?._id || null;

  return (
    <>
      <DetailsPage singleClassData={singleClassData} isFavorited={isFavorite} favoriteId={favoriteId} />
    </>
  );
};

export default page;
