import TrainerApplication from './TrainerApplication';
import UserProfile from './UserProfile';

const ProfileAndTrainerApplication = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      <div className="lg:col-span-5 bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
        <h3 className="text-xl font-bold text-[#1E293B] tracking-tight mb-6">User Profile</h3>
        <div className="flex-1">
          <UserProfile />
        </div>
      </div>
      <div className="lg:col-span-7 bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
        <h3 className="text-xl font-bold text-[#1E293B] tracking-tight mb-6">Trainer Application</h3>
        <div className="flex-1">
          <TrainerApplication />
        </div>
      </div>
    </div>
  );
};

export default ProfileAndTrainerApplication;
