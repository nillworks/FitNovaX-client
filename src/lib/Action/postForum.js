import headersAuthorization from '../headersAuthorization.client';

const postForum = async forumPost => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/Trainer-forum`, {
    method: 'POST',
    headers: {
      ...(await headersAuthorization()),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(forumPost),
  });
  const res = await req.json();

  return res;
};

export default postForum;
