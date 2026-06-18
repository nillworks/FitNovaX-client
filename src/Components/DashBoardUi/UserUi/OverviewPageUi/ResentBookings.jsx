import React from 'react';
import BookingCard from './BookingCard';

const ResentBookings = ({ bookings }) => {
  const data = bookings || [];

  return (
    <div className="flex flex-col gap-4 w-full">
      {data.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
      <button className="text-[#16A34A] font-semibold text-sm hover:underline mt-2 self-start transition-all">
        View all bookings →
      </button>
    </div>
  );
};

export default ResentBookings;
