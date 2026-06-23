import headersAuthorization from '../headersAuthorization.server';

const getTransactions = async (page = 1, limit = 10) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/transactions?page=${page}&limit=${limit}`,
      {
        cache: 'no-store',
        headers: await headersAuthorization(),
      },
    );

    return await res.json();
  } catch (error) {
    return {
      success: false,
      data: [],
      total: 0,
      currentPage: 1,
      totalPages: 1,
      message: error.message,
    };
  }
};

export default getTransactions;
