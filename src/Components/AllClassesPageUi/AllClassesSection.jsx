import Card from '@/Shared/Card';
import CategoryFilter from './CategoryFilter';
import SearchTram from './SearchTram';
import getAllClassesPublic from '@/lib/api/getAllClassesPublic';

const AllClassesSection = async ({ searchParams }) => {
  const params = await searchParams;
  const search = params?.search || '';
  const category = params?.category || '';

  const allClassData = await getAllClassesPublic({
    search,
    category,
  });

  const classes = allClassData?.data || [];

  return (
    <section className="min-h-screen bg-[#F8FAFC] pt-35 py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-[#1E293B] tracking-tight mb-6 leading-tight">
            Discover Your Next{' '}
            <span className="text-[#22C55E]">Fitness Class</span>
          </h1>
          <p className="text-lg text-[#64748B] max-w-2xl leading-relaxed">
            Explore a wide range of expert-led fitness classes tailored to your
            goals. Whether you want to build strength, improve flexibility, or
            boost your endurance, we have the perfect class for you.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#FFFFFF] p-6 rounded-3xl shadow-sm border border-[#E2E8F0] mb-12 flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <SearchTram />
          <CategoryFilter />
        </div>

        {/* Classes Grid */}
        {classes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map(item => (
              <Card key={item?._id || item?.id} classes={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm">
            <div className="w-24 h-24 bg-[#C6F4D6] rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-[#15803D]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#1E293B] tracking-tight mb-2">
              No classes found
            </h3>
            <p className="text-[#64748B] text-center max-w-md">
              We couldn&apos;t find any classes matching your current search or
              category filters. Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllClassesSection;
