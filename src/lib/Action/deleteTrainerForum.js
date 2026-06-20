const deleteTrainerForum = async id => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/Trainer-forum/${id}`,
    {
      method: 'DELETE',
    },
  );

  return await res.json();
};

export default deleteTrainerForum;
