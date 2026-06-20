const updateTrainerForum = async (id, updatedData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/Trainer-forum/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    },
  );

  return res.json();
};

export default updateTrainerForum;
