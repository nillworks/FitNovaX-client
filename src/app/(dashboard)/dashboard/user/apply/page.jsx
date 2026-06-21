import ApplicationForm from '@/Components/DashBoardUi/UserUi/ApplyPageui/ApplicationForm';
import getTrainerApplicationData from '@/lib/api/getTrainerApplicationData';
import getUserSession from '@/lib/getUserSession';

const page = async () => {
  const user = await getUserSession();

  const result = await getTrainerApplicationData(user?.id);

  return (
    <div>
      <ApplicationForm trainerData={result.data} />
    </div>
  );
};

export default page;
