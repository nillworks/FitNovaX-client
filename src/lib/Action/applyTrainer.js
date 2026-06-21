export const applyTrainer = async data => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/apply-trainer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};
