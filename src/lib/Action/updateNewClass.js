const updateNewClass = async (id, updatedData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/addNewClass/${id}`,
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

export default updateNewClass;
