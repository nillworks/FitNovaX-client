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

export const rejectTrainerApplication = async (id, rejectReason) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/admin/trainer-application/reject/${id}`,
    {
      method: 'PATCH',
      headers: {
        ...(await headersAuthorization()),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rejectReason }),
    },
  );

  return await res.json();
};
