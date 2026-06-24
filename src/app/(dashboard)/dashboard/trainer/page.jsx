import TrainerOverviewPageUi from '@/Components/DashBoardUi/trainerUi/TrainerOverviewPage/TrainerOverviewPageUi';
import getTrainerClass from '@/lib/api/getTrainerClass';
import getTrainerForum from '@/lib/api/getTrainerForum';
import getUserSession from '@/lib/getUserSession';

export const metadata = { title: 'FitNova | Trainer Dashboard' };


const page = async () => {
  const user = await getUserSession();
  const classesCreatedData = await getTrainerClass(user?.id);
  const forumPostData = await getTrainerForum(user?.id);

  const totalEnrollments = classesCreatedData.reduce(
    (total, item) => total + (Number(item.bookedCount) || 0),
    0,
  );

  return (
    <div>
      <TrainerOverviewPageUi
        classesCreatedData={classesCreatedData}
        forumPostData={forumPostData}
        totalEnrollments={totalEnrollments}
      />
    </div>
  );
};

export default page;
