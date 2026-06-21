import headersAuthorization from '../headersAuthorization.client';

export const demoteToUser = async id => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/admin/demote-trainer/${id}`,
    {
      method: 'PATCH',
      headers: await headersAuthorization(),
    },
  );

  return await res.json();
};
