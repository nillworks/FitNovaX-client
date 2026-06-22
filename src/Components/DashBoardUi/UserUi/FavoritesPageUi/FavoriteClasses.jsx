'use client';
import deleteFavorite from '@/lib/Action/deleteFavorite';
import FavoriteClassCard from './FavoriteClassCard';
import CustomToast from '@/Shared/CustomToast';
import { useRouter } from 'next/navigation';

const FavoriteClasses = ({ favoriteData }) => {
  const router = useRouter();

  const hasFavorites = favoriteData?.data?.length > 0;

  const handleDeleteFavorite = async id => {
    const res = await deleteFavorite(id);

    if (res.success) {
      router.refresh();

      CustomToast(
        'success',
        'Favorite Removed',
        'The class has been removed from your favorites list.',
      );
    } else {
      CustomToast(
        'error',
        'Delete Failed',
        res.message || 'Failed to remove favorite class.',
      );
    }

    // Add your delete functionality/API call here
  };

  return (
    <div className="w-full bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="container mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1E293B] mb-1.5">
              Favorite Classes
            </h1>
            <p className="text-[#64748B] font-semibold tracking-tight text-sm sm:text-base leading-relaxed">
              Save classes you love and quickly access them anytime.
            </p>
          </div>
          {hasFavorites && (
            <div className="flex items-center gap-2.5 bg-[#C6F4D6] px-4 py-2 rounded-full border border-[#8FE3B0] shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse relative">
                <span className="absolute -inset-1 rounded-full bg-[#22C55E] opacity-40 animate-ping"></span>
              </span>
              <span className="text-[#15803D] font-bold text-sm tracking-tight whitespace-nowrap">
                {favoriteData?.data?.length} Saved Classes
              </span>
            </div>
          )}
        </div>

        {/* Content Area */}
        {hasFavorites ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {favoriteData?.data?.map(classData => (
              <FavoriteClassCard
                key={classData._id}
                data={classData}
                handleDeleteFavorite={handleDeleteFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-[#E2E8F0] rounded-3xl bg-[#FFFFFF] shadow-sm">
            <div className="w-48 h-48 mb-6 text-[#8FE3B0]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight mb-2 text-center">
              No favorites yet
            </h2>
            <p className="text-[#64748B] font-semibold text-center max-w-md mb-8 leading-relaxed">
              Explore our wide range of fitness classes and tap the heart icon
              to save the ones you love.
            </p>
            <button className="px-8 py-3 bg-[#22C55E] hover:bg-[#16A34A] text-[#FFFFFF] font-bold rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgb(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgb(22,163,74,0.23)] cursor-pointer">
              Browse Classes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteClasses;
