import DetailsPage from '@/Components/DetailsPage/DetailsPage';
import getSingleClass from '@/lib/api/getSingleClass';

const page = async ({ params }) => {
  const { id } = await params;
  const result = await getSingleClass(id);
  const singleClassData = result.data;

  return (
    <>
      <DetailsPage singleClassData={singleClassData} />
    </>
  );
};

export default page;
