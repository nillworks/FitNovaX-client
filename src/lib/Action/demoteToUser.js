export const demoteToUser = async id => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/admin/demote-trainer/${id}`,
    {
      method: 'PATCH',
    },
  );

  return await res.json();
};
