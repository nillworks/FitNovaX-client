import headersAuthorization from '../headersAuthorization.client';

const deleteFavorite = async id => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/user/favorites/${id}`,
    {
      method: 'DELETE',
      headers: await headersAuthorization(),
    },
  );

  return res.json();
};

export default deleteFavorite;
