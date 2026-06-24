import Image from 'next/image';
import Link from 'next/link';

const UserProfile = ({ user }) => {
  if (!user) return null;

  return (
    <div className="flex flex-col h-full justify-between gap-6">
      <div className="flex items-center gap-5 p-5 rounded-3xl bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#E2E8F0] shadow-sm">
        <div className="relative w-16 h-16 rounded-full bg-[#C6F4D6] text-[#15803D] flex items-center justify-center text-2xl font-bold border-2 border-white shadow-md flex-shrink-0">
          {user?.image ? (
            <Image width={500} height={500} unoptimized src={user.image} alt={user.name} className="rounded-full object-cover w-full h-full" />
          ) : (
            <span>{user?.initials || 'U'}</span>
          )}
        </div>
        <div className="flex flex-col truncate">
          <h4 className="text-xl font-black text-[#1E293B] truncate">{user.name}</h4>
          <p className="text-sm font-medium text-[#64748B] truncate">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Height', value: user.height },
          { label: 'Weight', value: user.weight },
          { label: 'Goal', value: user.goal },
          { label: 'Level', value: user.level },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col gap-1.5 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <span className="text-[11px] uppercase tracking-wider text-[#64748B] font-bold">{item.label}</span>
            <span className="text-[#1E293B] font-black text-sm">{item.value}</span>
          </div>
        ))}
      </div>

      <Link href="/profile" className="block w-full">
        <button className="w-full cursor-pointer mt-auto bg-[#1E293B] hover:bg-[#0F172A] text-white font-bold py-3.5 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          Edit Profile
        </button>
      </Link>
    </div>
  );
};

export default UserProfile;
