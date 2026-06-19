import React from 'react';
import MyClassesRow from './MyClassesRow';

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
      name: 'HIIT Intensity',
      date: 'Oct 25, 2023',
      time: '05:00 PM - 06:00 PM',
      students: 25,
      maxStudents: 30,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Pilates Core',
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
    <div className="container mx-auto p-6 md:p-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1E293B]">
          My Classes
        </h1>
        <p className="text-[#64748B] mt-2 leading-relaxed">
          Manage your upcoming and active training sessions.
        </p>
      </div>

      {classesData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl shadow-sm">
          <div className="w-24 h-24 bg-[#C6F4D6] rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-[#16A34A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1E293B] tracking-tight">
            No Classes Scheduled
          </h3>
          <p className="text-[#64748B] mt-3 text-center max-w-[450px] leading-relaxed">
            You havent scheduled any training classes yet. Start adding new
            classes to see them listed here and begin your training journey.
          </p>
          <button className="mt-8 bg-[#22C55E] hover:bg-[#16A34A] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-md">
            Create New Class
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
  );
};

export default MyClasses;
