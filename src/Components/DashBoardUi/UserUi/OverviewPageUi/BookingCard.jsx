const BookingCard = ({ booking }) => {
  if (!booking) return null;

  const isUpcoming = booking.status === 'Upcoming';

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl hover:border-[#8FE3B0] transition-colors gap-4 shadow-sm hover:shadow-md">
      
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${isUpcoming ? 'bg-[#C6F4D6] text-[#15803D]' : 'bg-[#E2E8F0] text-[#64748B]'}`}>
          {booking.title.charAt(0)}
        </div>
        <div className="flex flex-col">
          <h4 className="text-[#1E293B] font-bold text-lg">{booking.title}</h4>
          <p className="text-[#64748B] text-sm">with {booking.trainer}</p>
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-8">
        <div className="flex flex-col">
          <span className="text-xs text-[#64748B] font-semibold">Date & Time</span>
          <span className="text-[#1E293B] font-semibold">{booking.date}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-[#64748B] font-semibold">Duration</span>
          <span className="text-[#1E293B] font-semibold">{booking.duration}</span>
        </div>
        <div className="mt-2 md:mt-0">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${isUpcoming ? 'bg-[#8FE3B0]/20 text-[#16A34A] border border-[#8FE3B0]/30' : 'bg-[#E2E8F0]/50 text-[#64748B]'}`}>
            {booking.status}
          </span>
        </div>
      </div>

    </div>
  );
};

export default BookingCard;
