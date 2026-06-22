const getAllClassesPublic = async ({ search = '', category = '' } = {}) => {
  try {
    const params = new URLSearchParams();

    if (search) params.append('search', search);
    if (category) params.append('category', category);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/public/all-class?${params.toString()}`,
      {
        cache: 'no-store',
      },
    );

    if (!res.ok) {
      throw new Error('Failed to fetch classes');
    }

    return await res.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
};

export default getAllClassesPublic;
