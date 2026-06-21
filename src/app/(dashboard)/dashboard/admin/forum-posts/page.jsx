import ForumPostManagementSection from '@/Components/DashBoardUi/AdminUi/ForumPosts/ForumPostManagementSection';
import { getAdminForumData } from '@/lib/api/getAdminForumData';

const PAGE_SIZE = 6;

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params?.page) || 1);
  const response = await getAdminForumData(currentPage, PAGE_SIZE);

  const posts = response?.data ?? [];
  const pagination = {
    page: response?.pagination?.currentPage ?? currentPage,
    limit: PAGE_SIZE,
    total: response?.pagination?.totalPosts ?? 0,
    totalPages: response?.pagination?.totalPages ?? 1,
  };

  return (
    <ForumPostManagementSection
      posts={posts}
      pagination={pagination}
      currentPage={currentPage}
    />
  );
};

export default page;
