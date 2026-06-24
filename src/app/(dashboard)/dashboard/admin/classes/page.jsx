import ManageClassesSection from '@/Components/DashBoardUi/AdminUi/ManageClasses/ManageClassesSection';
import { getAllClasses } from '@/lib/api/getAllClasses';

export const metadata = { title: 'FitNova | Manage Classes' };


const PAGE_SIZE = 10;

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params?.page) || 1);
  const response = await getAllClasses(currentPage, PAGE_SIZE);

  const classes = response?.data ?? [];
  const pagination = {
    page: response?.currentPage ?? currentPage,
    limit: PAGE_SIZE,
    total: response?.total ?? 0,
    totalPages: response?.totalPages ?? 1,
  };

  return (
    <ManageClassesSection
      classes={classes}
      pagination={pagination}
      currentPage={currentPage}
    />
  );
};

export default page;
