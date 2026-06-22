const addToFavorite = async data => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export default addToFavorite;
