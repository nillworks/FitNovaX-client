import headersAuthorization from '../headersAuthorization.server';

const getTrainerClass = async userId => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/trainer-class?userId=${userId}`,
    {
      headers: await headersAuthorization(),
    },
  );

  return res.json();
};

export default getTrainerClass;
