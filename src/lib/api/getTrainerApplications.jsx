export const getTrainerApplications = async (page = 1, limit = 10) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_URL;

  const res = await fetch(
    `${baseUrl}/api/admin/trainer-application?page=${page}&limit=${limit}`,
    { cache: 'no-store' },
  );

  if (!res.ok) {
    return {
      success: false,
      data: [],
      total: 0,
      currentPage: page,
      totalPages: 0,
    };
  }

  return res.json();
};
