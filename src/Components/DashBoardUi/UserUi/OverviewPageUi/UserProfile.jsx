const UserProfile = ({ user }) => {
  if (!user) return null;

  return (
    <div className="flex flex-col h-full justify-between gap-6">
      <div className="flex items-center gap-4 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
        <div className="w-16 h-16 rounded-full bg-[#C6F4D6] text-[#15803D] flex items-center justify-center text-2xl font-bold">
          <img src={user?.image} alt="user-image" className="rounded-full" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-[#1E293B]">{user.name}</h4>
          <p className="text-sm text-[#64748B]">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] flex flex-col gap-1">
          <span className="text-xs text-[#64748B] font-semibold">Height</span>
          <span className="text-[#1E293B] font-bold">{user.height}</span>
        </div>
        <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] flex flex-col gap-1">
          <span className="text-xs text-[#64748B] font-semibold">Weight</span>
          <span className="text-[#1E293B] font-bold">{user.weight}</span>
        </div>
        <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] flex flex-col gap-1">
          <span className="text-xs text-[#64748B] font-semibold">Goal</span>
          <span className="text-[#1E293B] font-bold">{user.goal}</span>
        </div>
        <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] flex flex-col gap-1">
          <span className="text-xs text-[#64748B] font-semibold">Level</span>
          <span className="text-[#1E293B] font-bold">{user.level}</span>
        </div>
      </div>

      <button className="w-full mt-auto bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#E2E8F0] text-[#1E293B] font-semibold py-3 rounded-xl transition-colors">
        Edit Profile
      </button>
    </div>
  );
};

export default UserProfile;
