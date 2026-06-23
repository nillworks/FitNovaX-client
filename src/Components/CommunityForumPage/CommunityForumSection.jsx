import CommunityForumApi from '@/lib/api/CommunityForumApi';
import ForumPostCard from './ForumPostCard';
import Link from 'next/link';

const CommunityForumSection = async ({ searchParams }) => {
  // Await searchParams for Next.js 15
  const params = await searchParams;
  const page = parseInt(params?.page || '1', 10);
  const limit = 6;

  // Fetch data
  const response = await CommunityForumApi(page, limit);

  // Extract posts and totalPages robustly
  const posts =
    response?.data?.posts ||
    response?.data ||
    response?.posts ||
    (Array.isArray(response) ? response : []);
  const totalPages =
    response?.totalPages ||
    response?.data?.totalPages ||
    response?.meta?.totalPages ||
    (posts.length === limit ? page + 1 : page);

  return (
    <section className="container mx-auto pt-40 py-16 px-4 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-[#1E293B] mb-4">
          Community Forum
        </h1>
        <p className="text-[#64748B] max-w-2xl mx-auto">
          Discover the latest discussions, tips, and insights from our trainers
          and community members.
        </p>
      </div>

      {posts && posts.length > 0 ? (
        <>
          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map(post => (
              <ForumPostCard
                key={post._id || Math.random().toString()}
                post={post}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-12">
              {page > 1 && (
                <Link
                  href={`?page=${page - 1}`}
                  className="px-5 py-2.5 bg-[#FFFFFF] border border-[#E2E8F0] text-[#1E293B] rounded-2xl hover:border-[#22C55E] hover:text-[#22C55E] hover:shadow-sm transition-all font-semibold"
                >
                  Previous
                </Link>
              )}

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  const isCurrent = pageNum === page;
                  return (
                    <Link
                      key={pageNum}
                      href={`?page=${pageNum}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${
                        isCurrent
                          ? 'bg-[#22C55E] text-[#FFFFFF] shadow-md'
                          : 'bg-[#FFFFFF] border border-[#E2E8F0] text-[#64748B] hover:border-[#22C55E] hover:text-[#22C55E]'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>

              {page < totalPages && (
                <Link
                  href={`?page=${page + 1}`}
                  className="px-5 py-2.5 bg-[#FFFFFF] border border-[#E2E8F0] text-[#1E293B] rounded-2xl hover:border-[#22C55E] hover:text-[#22C55E] hover:shadow-sm transition-all font-semibold"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-24 bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-sm">
          <h3 className="text-2xl font-bold text-[#1E293B] mb-2">
            No Posts Found
          </h3>
          <p className="text-[#64748B]">
            Check back later for new community discussions.
          </p>
        </div>
      )}
    </section>
  );
};

export default CommunityForumSection;
