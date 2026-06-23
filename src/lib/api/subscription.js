'use server';

export const subscription = async data => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_URL || 'http://localhost:8000';
  const res = await fetch(`${baseUrl}/subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to save subscription: ${res.statusText}`);
  }

  return await res.json();
};
