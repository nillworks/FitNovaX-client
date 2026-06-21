import headersAuthorization from '../headersAuthorization.server';

const getTrainerForum = async userId => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/trainer-forum?userId=${userId}`,
    {
      headers: await headersAuthorization(),
    },
  );

  return res.json();
};

export default getTrainerForum;
