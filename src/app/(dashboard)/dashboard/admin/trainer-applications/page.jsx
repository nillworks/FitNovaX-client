import AppliedTrainersSection from '@/Components/DashBoardUi/AdminUi/TrainerApplications/AppliedTrainersSection';
import { getTrainerApplications } from '@/lib/api/getTrainerApplications';

const PAGE_SIZE = 10;

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params?.page) || 1);
  const response = await getTrainerApplications(currentPage, PAGE_SIZE);

  const applications = response?.data ?? [];
  const pagination = {
    page: response?.currentPage ?? currentPage,
    limit: PAGE_SIZE,
    total: response?.total ?? 0,
    totalPages: response?.totalPages ?? 1,
  };

  return (
    <AppliedTrainersSection
      applications={applications}
      pagination={pagination}
      currentPage={currentPage}
    />
  );
};

export default page;
