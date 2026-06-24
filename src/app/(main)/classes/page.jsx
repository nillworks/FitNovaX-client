import AllClassesSection from '@/Components/AllClassesPageUi/AllClassesSection';

export const metadata = { title: 'FitNova | Classes' };


const page = ({ searchParams }) => {
  return (
    <>
      <AllClassesSection searchParams={searchParams} />
    </>
  );
};

export default page;
