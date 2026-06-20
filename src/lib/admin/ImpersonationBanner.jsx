'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { stopImpersonating } from '@/lib/admin/manageUsers';
import CustomToast from '@/Shared/CustomToast';

const ImpersonationBanner = () => {
  const router = useRouter();
  const { data } = useSession();
  const session = data?.session;
  const user = data?.user;

  if (!session?.impersonatedBy) return null;

  const handleStop = async () => {
    const { error } = await stopImpersonating();

    if (error) {
      CustomToast('error', 'Failed to stop', error.message);
      return;
    }

    window.location.href = '/dashboard/admin/users';
  };

  return (
    <div className="bg-[#FEF3C7] border-b border-[#FCD34D] px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm font-semibold text-[#92400E]">
        Viewing as <span className="font-bold">{user?.name}</span> (
        {user?.role})
      </p>
      <button
        type="button"
        onClick={handleStop}
        className="text-xs font-bold text-[#92400E] bg-[#FFFFFF] border border-[#FCD34D] px-4 py-2 rounded-xl hover:bg-[#FFFBEB] transition-colors"
      >
        Stop & return to Top Admin
      </button>
    </div>
  );
};

export default ImpersonationBanner;
