const postForum = async forumPost => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/Trainer-forum`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(forumPost),
  });
  const res = await req.json();

  return res;
};

export default postForum;
