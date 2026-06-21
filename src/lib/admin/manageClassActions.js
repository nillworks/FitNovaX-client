export const approveClass = async id => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/admin/class-status/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'approved',
      }),
    },
  );

  return await res.json();
};

export const rejectClass = async id => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/admin/class-status/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'rejected',
      }),
    },
  );

  return await res.json();
};

export const deleteClass = async id => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/admin/class-delete/${id}`,
    {
      method: 'DELETE',
    },
  );

  return await res.json();
};
