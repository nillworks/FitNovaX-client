import BookedClassesTable from '@/Components/DashBoardUi/UserUi/BookedClasses/BookedClassesTable';

export const metadata = { title: 'FitNova | My Booked Classes' };


const page = () => {
  return (
    <>
      <BookedClassesTable />
    </>
  );
};

export default page;
