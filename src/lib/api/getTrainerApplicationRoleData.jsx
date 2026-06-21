import headersAuthorization from '../headersAuthorization.client';

const getTrainerApplicationRoleData = async (page = 1, limit = 6) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/admin/trainers?page=${page}&limit=${limit}`,
    {
      cache: 'no-store',
      headers: await headersAuthorization(),
    },
  );

  return await res.json();
};

export default getTrainerApplicationRoleData;
