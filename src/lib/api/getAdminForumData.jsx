import headersAuthorization from '../headersAuthorization.server';

export const getAdminForumData = async (page = 1, limit = 10) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/forum-post?page=${page}&limit=${limit}`,
      { cache: 'no-store', headers: await headersAuthorization() },
    );

    if (!res.ok) {
      return {
        success: false,
        data: [],
        pagination: {
          totalPosts: 0,
          currentPage: page,
          totalPages: 0,
        },
      };
    }

    const data = await res.json();

    return {
      success: true,
      data: data.data,
      pagination: data.pagination,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      pagination: {
        totalPosts: 0,
        currentPage: page,
        totalPages: 0,
      },
      error: error.message,
    };
  }
};
