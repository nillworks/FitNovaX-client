import React from 'react';
import MyClassesRow from './MyClassesRow';
import { Dumbbell, PlusCircle } from 'lucide-react';

const MyClasses = () => {
  // Dummy data array - passing from parent to child
  const classesData = [
    {
      id: 1,
      name: 'Morning Yoga Flow',
      date: 'Oct 25, 2023',
      time: '07:00 AM - 08:30 AM',
      students: 15,
      maxStudents: 20,
      status: 'Active',
    },
    {
      id: 2,
      name: 'HIIT Intensity Training',
      date: 'Oct 25, 2023',
      time: '05:00 PM - 06:00 PM',
      students: 30,
      maxStudents: 30,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Pilates Core Strengthing',
      date: 'Oct 26, 2023',
      time: '06:30 PM - 07:30 PM',
      students: 10,
      maxStudents: 15,
      status: 'Upcoming',
    },
  ];

  // Uncomment the line below to test the empty state when data length is 0
  // const classesData = [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-[#C6F4D6] p-3 rounded-2xl border border-[#8FE3B0] shadow-sm">
                <Dumbbell className="w-8 h-8 text-[#15803D]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1E293B]">
                My Classes
              </h1>
            </div>
            <p className="text-[#64748B] text-lg font-medium max-w-2xl leading-relaxed">
              Manage your upcoming and active training sessions. Track student bookings and class capacities.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300 shadow-lg shadow-[#22C55E]/30 transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap">
            <PlusCircle className="w-5 h-5" />
            Create New Class
          </button>
        </div>

        {/* Content Section */}
        {classesData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl shadow-sm text-center">
            <div className="w-20 h-20 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Dumbbell className="w-10 h-10 text-[#8FE3B0]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1E293B] tracking-tight mb-2">
              No Classes Scheduled
            </h3>
            <p className="text-[#64748B] font-medium max-w-[450px] leading-relaxed">
              You haven't scheduled any training classes yet. Start adding new
              classes to see them listed here and begin your training journey.
            </p>
            <button className="mt-8 bg-white border border-[#E2E8F0] hover:border-[#8FE3B0] hover:bg-[#F8FAFC] text-[#1E293B] hover:text-[#15803D] px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-sm cursor-pointer flex items-center gap-2">
              <PlusCircle className="w-4 h-4" /> Create First Class
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classesData.map(cls => (
              <MyClassesRow key={cls.id} data={cls} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyClasses;
