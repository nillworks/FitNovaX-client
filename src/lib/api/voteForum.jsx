import headersAuthorization from '../headersAuthorization.client';

export const voteForum = async (forumId, userId, type) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/forum/vote/${forumId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(await headersAuthorization()),
      },
      body: JSON.stringify({
        userId,
        type, // like | dislike
      }),
    },
  );

  return await res.json();
};
