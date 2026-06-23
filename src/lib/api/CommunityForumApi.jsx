const CommunityForumApi = async (page = 1, limit = 10) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/community/forum?page=${page}&limit=${limit}`,
      {
        cache: 'no-store',
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

export default CommunityForumApi;
