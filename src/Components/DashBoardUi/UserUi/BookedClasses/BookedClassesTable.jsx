import React from 'react';
import BookedClassRow from './BookedClassRow';

const dummyData = [
  {
    id: 1,
    className: 'High-Intensity Interval Training',
    trainer: 'Sarah Connor',
    category: 'Cardio',
    days: 'Mon, Wed, Fri',
    time: '08:00 AM - 09:00 AM',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=300&h=300',
  },
  {
    id: 2,
    className: 'Advanced Vinyasa Flow',
    trainer: 'Michael Chen',
    category: 'Yoga',
    days: 'Tue, Thu',
    time: '06:30 PM - 07:45 PM',
    image:
      'https://images.unsplash.com/photo-1599901860904-17e0ed3af320?auto=format&fit=crop&q=80&w=300&h=300',
  },
  {
    id: 3,
    className: 'Strength & Conditioning',
    trainer: 'Marcus Johnson',
    category: 'Strength',
    days: 'Saturday',
    time: '10:00 AM - 11:30 AM',
    image:
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=300&h=300',
  },
];

const BookedClassesTable = () => {
  return (
    <div className="w-full bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1E293B] mb-1.5">
              Booked Classes
            </h1>
            <p className="text-[#64748B] font-semibold tracking-tight text-sm sm:text-base leading-relaxed">
              Manage and review your active fitness bookings
            </p>
          </div>
          <div className="flex items-center gap-2.5 bg-[#C6F4D6] px-4 py-2 rounded-full border border-[#8FE3B0]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse relative">
              <span className="absolute -inset-1 rounded-full bg-[#22C55E] opacity-40 animate-ping"></span>
            </span>
            <span className="text-[#15803D] font-bold text-sm tracking-tight">
              {dummyData.length} Active Bookings
            </span>
          </div>
        </div>

        {/* Cards List */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {dummyData.map(classData => (
            <BookedClassRow key={classData.id} data={classData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookedClassesTable;
