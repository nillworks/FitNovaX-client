const getTrainerClass = async userId => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/trainer-class?userId=${userId}`,
  );

  return res.json();
};

export default getTrainerClass;
