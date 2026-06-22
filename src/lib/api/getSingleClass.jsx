import headersAuthorization from '../headersAuthorization.server';

const getSingleClass = async id => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/public/class/${id}`,
      {
        cache: 'no-store',
        headers: await headersAuthorization(),
      },
    );

    if (!res.ok) {
      throw new Error('Failed to fetch class');
    }

    return await res.json();
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
};

export default getSingleClass;
