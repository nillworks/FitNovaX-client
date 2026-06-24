import React from 'react';
import Link from 'next/link';
import BookingCard from './BookingCard';

const ResentBookings = ({ bookings }) => {
  if (!bookings) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))
      ) : (
        <div className="text-center py-6 bg-white rounded-2xl border border-[#E2E8F0]">
          <p className="text-[#64748B] font-medium text-sm">No recent bookings found.</p>
        </div>
      )}
      <Link href="/dashboard/user/booked" className="text-[#16A34A] font-semibold text-sm hover:underline mt-2 self-start transition-all">
        View all bookings →
      </Link>
    </div>
  );
};

export default ResentBookings;
