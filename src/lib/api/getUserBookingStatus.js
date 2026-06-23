import headersAuthorization from '../headersAuthorization.server';

const getUserBookingStatus = async (classId, userId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user/booking-status/${classId}?userId=${userId}`,
      {
        cache: 'no-store',
        headers: await headersAuthorization(),
      },
    );

    return await res.json();
  } catch (error) {
    return {
      success: false,
      isBooked: false,
      message: error.message,
    };
  }
};

export default getUserBookingStatus;
