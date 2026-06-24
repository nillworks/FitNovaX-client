import CommunityForumSection from '@/Components/CommunityForumPage/CommunityForumSection';

export const metadata = { title: 'FitNova | Community Forum' };


const page = async ({ searchParams }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <CommunityForumSection searchParams={await searchParams} />
    </div>
  );
};

export default page;
