import headersAuthorization from '../headersAuthorization.server';

const getUserFavorites = async userId => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user/favorites?userId=${userId}`,
      {
        cache: 'no-store',
        headers: await headersAuthorization(),
      },
    );

    return await res.json();
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
};

export default getUserFavorites;
