import headersAuthorization from '../headersAuthorization.client';

export const getComments = async (forumId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/forum/comment/${forumId}`,
      {
        cache: 'no-store',
      }
    );
    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addComment = async (data) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/forum/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(await headersAuthorization()),
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addReply = async (data) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/forum/comment/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(await headersAuthorization()),
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateComment = async (id, userId, comment) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/forum/comment/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(await headersAuthorization()),
      },
      body: JSON.stringify({ userId, comment }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteComment = async (id, userId) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/forum/comment/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(await headersAuthorization()),
      },
      body: JSON.stringify({ userId }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
};
