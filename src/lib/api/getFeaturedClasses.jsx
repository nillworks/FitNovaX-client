const getFeaturedClasses = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/public/class-limit`,
    {
      cache: 'no-store',
    },
  );

  return res.json();
};

export default getFeaturedClasses;
