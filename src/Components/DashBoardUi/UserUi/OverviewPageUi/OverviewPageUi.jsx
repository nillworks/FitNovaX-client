import getUserSession from '@/lib/getUserSession';
import OverviewGridCard from './OverviewGridCard';
import ResentBookings from './ResentBookings';
import TrainerApplication from './TrainerApplication';
import UserProfile from './UserProfile';
import getTrainerApplicationData from '@/lib/api/getTrainerApplicationData';

const OverviewPageUi = async () => {
  const user = await getUserSession();
  const applicationSingleData = await getTrainerApplicationData(user?.id);

  const userData = {
    name: user?.name,
    email: user?.email,
    initials: 'AL',
    height: '180 cm',
    weight: '75 kg',
    goal: 'Muscle Gain',
    level: 'Intermediate',
    image: user?.image,
  };

  // const applicationData = {
  //   status: 'Pending Review',
  //   step: 'Step 2 of 4: Documentation',
  //   progress: 50,
  //   documents: [
  //     {
  //       name: 'Resume.pdf',
  //       type: 'PDF',
  //       status: 'Verified',
  //       statusColor: 'text-[#22C55E]',
  //       statusBg: 'bg-[#C6F4D6]/50',
  //     },
  //     {
  //       name: 'Certificates.zip',
  //       type: 'ZIP',
  //       status: 'In Review',
  //       statusColor: 'text-[#4AD27A]',
  //       statusBg: 'bg-[#8FE3B0]/20',
  //     },
  //   ],
  // };

  const applicationData = applicationSingleData?.data;

  const demoBookings = [
    {
      id: 1,
      title: 'HIIT Extreme',
      trainer: 'Sarah Connor',
      date: 'Today, 5:00 PM',
      duration: '45 Min',
      status: 'Upcoming',
    },
    {
      id: 2,
      title: 'Power Yoga',
      trainer: 'Emma Watson',
      date: 'Tomorrow, 7:00 AM',
      duration: '60 Min',
      status: 'Upcoming',
    },
    {
      id: 3,
      title: 'Core Blast',
      trainer: 'John Doe',
      date: 'June 16, 6:00 PM',
      duration: '30 Min',
      status: 'Completed',
    },
  ];

  const statsData = [
    { id: 1, title: 'Total Workouts', value: '124', trend: '+12% this month' },
    { id: 2, title: 'Active Days', value: '18', trend: 'Consistent' },
    {
      id: 3,
      title: 'Calories Burned',
      value: '14,200',
      trend: '+5% this week',
    },
    { id: 4, title: 'Upcoming Classes', value: '3', trend: 'Next: Yoga' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-6 lg:gap-8">
        {/* Section 1 — Dashboard Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 lg:gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] tracking-tight">
              Overview
            </h1>
            <h2 className="text-xl font-semibold text-[#1E293B]">
              Welcome back to your dashboard!
            </h2>
            <p className="text-[#64748B] text-sm leading-relaxed mt-1">
              Here is a quick summary of your fitness journey and recent
              activities.
            </p>
          </div>
          <div className="flex items-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#8FE3B0] text-[#15803D] shadow-sm transition-transform hover:-translate-y-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]"></span>
              </span>
              Account Role: Member
            </div>
          </div>
        </header>

        {/* Section 2 — Statistics Grid */}
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-[#1E293B] tracking-tight">
            Key Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {statsData.map(stat => (
              <div
                key={stat.id}
                className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col justify-center">
                  <OverviewGridCard data={stat} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — Main Content Zone */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          {/* Left Area */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow duration-300 p-4 md:p-6 lg:p-8 flex-1 h-full flex flex-col">
              <div className="mb-6 flex flex-col gap-1">
                <h3 className="text-xl font-bold text-[#1E293B] tracking-tight">
                  User Profile
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Manage your personal details and preferences.
                </p>
              </div>
              <div className="flex-1">
                <UserProfile user={userData} />
              </div>
            </div>
          </div>

          {/* Right Area */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow duration-300 p-4 md:p-6 lg:p-8 flex-1 h-full flex flex-col">
              <div className="mb-6 flex flex-col gap-1">
                <h3 className="text-xl font-bold text-[#1E293B] tracking-tight">
                  Trainer Application
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Track the status of your applications.
                </p>
              </div>
              <div className="flex-1">
                <TrainerApplication application={applicationData} />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 — Activity Section */}
        <section className="w-full">
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow duration-300 p-4 md:p-6 lg:p-8">
            <div className="mb-6 flex flex-col gap-1">
              <h3 className="text-2xl font-bold text-[#1E293B] tracking-tight">
                Recent Bookings
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed">
                Review your upcoming and past class sessions.
              </p>
            </div>
            <div className="w-full">
              <ResentBookings bookings={demoBookings} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OverviewPageUi;
