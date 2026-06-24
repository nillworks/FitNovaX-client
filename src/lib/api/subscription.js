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
    let errorMsg = res.statusText;
    try {
      const errorData = await res.json();
      if (errorData.error) errorMsg = errorData.error;
    } catch (e) {
      // Ignore if not json
    }
    throw new Error(`Failed to save subscription: ${errorMsg}`);
  }

  return await res.json();
};
