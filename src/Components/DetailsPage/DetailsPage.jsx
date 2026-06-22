import Link from 'next/link';
import { ArrowLeft, Dumbbell } from 'lucide-react';
import ClassDetailsHero from './ClassDetailsHero';
import ClassDetailsInfo from './ClassDetailsInfo';
import ClassDetailsActions from './ClassDetailsActions';

const getClassId = data =>
  data?._id?.$oid || data?._id?.toString?.() || data?._id || data?.id;

const DetailsPage = ({ singleClassData, isBooked = false, isFavorited = false }) => {
  if (!singleClassData) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#E2E8F0] p-10 text-center shadow-sm">
          <div className="w-16 h-16 bg-[#FEF2F2] rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Dumbbell className="w-8 h-8 text-[#EF4444]" />
          </div>
          <h1 className="text-2xl font-black text-[#1E293B] mb-2">
            Class Not Found
          </h1>
          <p className="text-[#64748B] text-sm mb-6">
            This class may have been removed or the link is invalid.
          </p>
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#22C55E] text-white font-bold text-sm hover:bg-[#16A34A] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Classes
          </Link>
        </div>
      </div>
    );
  }

  const classId = getClassId(singleClassData);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#15803D] pt-28 pb-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#22C55E]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8FE3B0]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 text-[#C6F4D6] hover:text-white text-sm font-semibold mb-8 transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to All Classes
          </Link>

          <ClassDetailsHero classData={singleClassData} />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-8">
            <ClassDetailsInfo classData={singleClassData} />
          </div>

          <div className="xl:col-span-4">
            <ClassDetailsActions
              classData={singleClassData}
              classId={classId}
              isBooked={isBooked}
              isFavorited={isFavorited}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
