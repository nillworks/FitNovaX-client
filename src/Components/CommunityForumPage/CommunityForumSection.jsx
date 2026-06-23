import CommunityForumApi from '@/lib/api/CommunityForumApi';
import ForumPostCard from './ForumPostCard';
import Link from 'next/link';
import ForumPostsClient from './ForumPostsClient';
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
        <ForumPostsClient initialPosts={posts} totalPages={totalPages} page={page} />
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
