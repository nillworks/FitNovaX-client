import DetailsPage from '@/Components/DetailsPage/DetailsPage';
import getSingleClass from '@/lib/api/getSingleClass';
import getUserFavorites from '@/lib/api/getUserFavorites';
import getUserBookingStatus from '@/lib/api/getUserBookingStatus';
import getUserSession from '@/lib/getUserSession';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Clock } from 'lucide-react';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const result = await getSingleClass(id);
  const singleClassData = result?.data;
  return {
    title: singleClassData ? `${singleClassData.className} | FitNova` : 'Class Details | FitNova',
    description: singleClassData?.description || 'Explore premium fitness classes on FitNova.',
  };
}

const page = async ({ params }) => {
  const { id } = await params;
  const result = await getSingleClass(id);
  const singleClassData = result.data;

  const user = await getUserSession();

  if (!user) {
    return redirect(`/login?redirect=/classes/${id}`);
  }

  let isExpired = false;
  if (singleClassData?.endDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(singleClassData.endDate);
    end.setHours(0, 0, 0, 0);
    isExpired = end < today;
  }

  if (isExpired) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#E2E8F0] p-10 text-center shadow-sm">
          <div className="w-16 h-16 bg-[#FEF2F2] rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Clock className="w-8 h-8 text-[#EF4444]" />
          </div>
          <h1 className="text-2xl font-black text-[#1E293B] mb-2">
            Class Date Expired
          </h1>
          <p className="text-[#64748B] text-sm mb-6">
            This class has already ended. Please explore our other available classes.
          </p>
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#22C55E] text-white font-bold text-sm hover:bg-[#16A34A] transition-colors"
          >
            Back to Classes
          </Link>
        </div>
      </div>
    );
  }

  const favoriteData = await getUserFavorites(user?.id);
  
  // Find if this class exists in the user's favorites array
  const favoriteObj = favoriteData?.data?.find(fav => fav.classId === id);
  const isFavorite = !!favoriteObj;
  const favoriteId = favoriteObj?._id?.$oid || favoriteObj?._id || null;

  const bookingStatusData = await getUserBookingStatus(id, user?.id);
  const isBooked = bookingStatusData?.isBooked || false;

  return (
    <>
      <DetailsPage singleClassData={singleClassData} isBooked={isBooked} isFavorited={isFavorite} favoriteId={favoriteId} />
    </>
  );
};

export default page;
