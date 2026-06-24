import MyForumPostsSection from '@/Components/DashBoardUi/trainerUi/MyForumPostsPage/MyForumPostsSection';
import getTrainerForum from '@/lib/api/getTrainerForum';
import getUserSession from '@/lib/getUserSession';

export const metadata = { title: 'FitNova | My Posts' };


const page = async () => {
  const user = await getUserSession();
  const fromData = await getTrainerForum(user?.id);

  return (
    <>
      <MyForumPostsSection fromData={fromData} />
    </>
  );
};

export default page;
