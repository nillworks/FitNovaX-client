import headersAuthorization from '../headersAuthorization.server';

const CommunityForumDetailsApi = async id => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/community/forum/${id}`,
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

export default CommunityForumDetailsApi;
