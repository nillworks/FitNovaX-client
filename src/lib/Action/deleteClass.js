import headersAuthorization from '../headersAuthorization.client';

const deleteClass = async id => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/addNewClass/${id}`,
    {
      method: 'DELETE',
      headers: await headersAuthorization(),
    },
  );

  return res.json();
};

export default deleteClass;
