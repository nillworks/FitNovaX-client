import getUserSession from '@/lib/getUserSession';
import OverviewGridCard from './OverviewGridCard';
import ResentBookings from './ResentBookings';
import TrainerApplication from './TrainerApplication';
import UserProfile from './UserProfile';
import getTrainerApplicationData from '@/lib/api/getTrainerApplicationData';
import getUserFavorites from '@/lib/api/getUserFavorites';
import getAllClassesPublic from '@/lib/api/getAllClassesPublic';
import CommunityForumApi from '@/lib/api/CommunityForumApi';
import getFeaturedClasses from '@/lib/api/getFeaturedClasses';
import { getBookedClasses } from '@/lib/api/getBookedClasses';
import getUserTransactions from '@/lib/api/getUserTransactions';

const OverviewPageUi = async () => {
  const user = await getUserSession();
  const applicationSingleData = await getTrainerApplicationData(user?.id);

  const favoriteData = await getUserFavorites(user?.id);
  const classesData = await getAllClassesPublic();
  const forumData = await CommunityForumApi();
  const featuredClassesData = await getFeaturedClasses();
  
  const transactionsRes = await getUserTransactions(user?.id);
  const transactionsData = transactionsRes?.data || [];
  const totalSpent = transactionsData.reduce((sum, tx) => sum + (Number(tx.price) || 0), 0);

  const userData = {
    name: user?.name || 'User',
    email: user?.email,
    initials: user?.name ? user.name.substring(0, 2).toUpperCase() : 'U',
    height: user?.height || 'Not set',
    weight: user?.weight || 'Not set',
    goal: user?.goal || 'Not set',
    level: user?.level || 'Not set',
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

  const bookedClassesRes = await getBookedClasses(user?.id);
  const bookedClassesData = bookedClassesRes?.data || [];

  const demoBookings = bookedClassesData.slice(0, 3).map(classData => ({
    id: classData._id,
    title: classData.className || 'Unknown Class',
    trainer: classData.userName || 'Unknown Trainer',
    date: classData.startDate ? `${classData.startDate}, ${classData.startTime || ''}` : 'TBA',
    duration: classData.duration ? `${classData.duration} Min` : 'TBA',
    status: 'Upcoming',
    image: classData.classImage,
  }));

  const statsData = [
    {
      id: 1,
      title: 'Total Favorites',
      value: favoriteData?.data?.length || 0,
      trend: '+12% this month',
      link: '/dashboard/user/favorites',
      buttonText: 'View Favorites',
    },
    { 
      id: 2, 
      title: 'Available Classes', 
      value: classesData?.data?.length || 0, 
      trend: 'Join Now',
      link: '/classes',
      buttonText: 'Explore Classes',
    },
    {
      id: 3,
      title: 'Community Posts',
      value: forumData?.data?.length || 0,
      trend: 'Active Discussions',
      link: '/forum',
      buttonText: 'Visit Forum',
    },
    { 
      id: 4, 
      title: 'Total Spent', 
      value: `$${totalSpent.toFixed(2)}`, 
      trend: 'Transactions',
      link: '/dashboard/user/transactions',
      buttonText: 'View Transactions',
    },
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
                className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Decorative hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col justify-center relative z-10">
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
