import headersAuthorization from '../headersAuthorization';

const addToFavorite = async data => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(await headersAuthorization()),
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export default addToFavorite;
