export const adminDeleteForumPost = async id => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/forum-post/${id}`,
      {
        method: 'DELETE',
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'Failed to delete post',
      };
    }

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
