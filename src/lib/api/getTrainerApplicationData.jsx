const getTrainerApplicationData = async userId => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/trainer-application/${userId}`,
    {
      cache: 'no-store',
    },
  );

  return await res.json();
};

export default getTrainerApplicationData;
