import React from 'react';
import BookedClassRow from './BookedClassRow';
import { getBookedClasses } from '@/lib/api/getBookedClasses';
import getUserSession from '@/lib/getUserSession';

const BookedClassesTable = async () => {
  const user = await getUserSession();
  const bookedClassesRes = await getBookedClasses(user?.id);
  const classesData = bookedClassesRes?.data || [];

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
              {classesData.length} Active Bookings
            </span>
          </div>
        </div>

        {/* Cards List */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {classesData.length > 0 ? (
            classesData.map(classData => (
              <BookedClassRow key={classData._id || classData.id} data={classData} />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-[#E2E8F0]">
              <p className="text-[#64748B] text-lg font-medium">No active bookings found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedClassesTable;
