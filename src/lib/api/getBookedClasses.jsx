import headersAuthorization from '../headersAuthorization.server';

export const getBookedClasses = async userId => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user/booked-classes/${userId}`,
      {
        cache: 'no-store',
        headers: await headersAuthorization(),
      },
    );

    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
