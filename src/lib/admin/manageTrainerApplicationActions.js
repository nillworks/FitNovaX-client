import headersAuthorization from '../headersAuthorization.client';

export const approveTrainerApplication = async id => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/admin/trainer-application/approve/${id}`,
    {
      method: 'PATCH',
      headers: await headersAuthorization(),
    },
  );

  return await res.json();
};

export const rejectTrainerApplication = async id => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/admin/trainer-application/reject/${id}`,
    {
      method: 'PATCH',
      headers: await headersAuthorization(),
    },
  );

  return await res.json();
};
