'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  Ban,
  Unlock,
  Crown,
  MoreVertical,
  TrendingUp,
  Star,
  Eye,
} from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import {
  setUserRole,
  blockUser,
  unblockUser,
  impersonateUser,
} from '@/lib/admin/manageUsers';
import {
  isTopAdmin,
  canChangeRole,
  canImpersonateTarget,
  canBlockTarget,
  isAdminUser,
} from '@/lib/admin/topAdmin';
import CustomToast from '@/Shared/CustomToast';

const DASHBOARD_BY_ROLE = {
  user: '/dashboard/user',
  trainer: '/dashboard/trainer',
  admin: '/dashboard/admin',
};

const ManageUsersTable = ({ users }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const actorRole = session?.user?.role;
  const actorIsAdmin = isAdminUser(actorRole);
  const [loadingId, setLoadingId] = useState(null);

  const activityScore = 100;

  const handleRoleChange = async (userId, role, user) => {
    if (!canChangeRole(actorRole, user)) {
      CustomToast('error', 'Not allowed', 'You cannot change this role.');
      return;
    }

    setLoadingId(userId);
    const { error } = await setUserRole(userId, role);
    setLoadingId(null);

    if (error) {
      CustomToast('error', 'Role Update Failed', error.message);
      return;
    }

    CustomToast('success', 'Role Updated', `User role set to ${role}.`);
    router.refresh();
  };

  const handleBlock = async userId => {
    setLoadingId(userId);
    const { error } = await blockUser(userId);
    setLoadingId(null);

    if (error) {
      CustomToast('error', 'Block Failed', error.message);
      return;
    }

    CustomToast('success', 'User Blocked');
    router.refresh();
  };

  const handleUnblock = async userId => {
    setLoadingId(userId);
    const { error } = await unblockUser(userId);
    setLoadingId(null);

    if (error) {
      CustomToast('error', 'Unblock Failed', error.message);
      return;
    }

    CustomToast('success', 'User Unblocked');
    router.refresh();
  };

  const handleImpersonate = async (userId, role) => {
    setLoadingId(userId);
    const { error } = await impersonateUser(userId);
    setLoadingId(null);

    if (error) {
      CustomToast('error', 'View as user failed', error.message);
      return;
    }

    window.location.href = DASHBOARD_BY_ROLE[role] || '/dashboard/user';
  };

  return (
    <div className="space-y-6">
      {/* Middle Section: Modern User Control Panel */}
      <div className="bg-white rounded-3xl p-4 lg:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-[#64748B]" />
          </div>
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E] transition-all text-[#1E293B] placeholder-[#64748B]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#E2E8F0] px-5 py-3 rounded-2xl text-sm font-semibold text-[#1E293B] transition-colors">
            <Filter size={16} className="text-[#64748B]" />
            Role
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#E2E8F0] px-5 py-3 rounded-2xl text-sm font-semibold text-[#1E293B] transition-colors">
            <Filter size={16} className="text-[#64748B]" />
            Status
          </button>
        </div>
      </div>

      {/* Main Section: Premium Glassmorphism Data Table */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <th className="px-6 py-5 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-5 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  Role & Status
                </th>
                <th className="px-6 py-5 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-5 text-xs font-bold text-[#64748B] uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {users.map(user => (
                <tr
                  key={user.id}
                  className="hover:bg-[#F8FAFC] transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image width={500} height={500} unoptimized
                          src={user?.image}
                          alt={user?.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-[#C6F4D6] transition-colors"
                        />
                        <div
                          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${user.role ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`}
                        ></div>
                      </div>
                      <div>
                        <p className="text-[#1E293B] font-bold text-sm leading-tight">
                          {user?.name}
                        </p>
                        <p className="text-[#64748B] text-xs mt-0.5">
                          {user?.email}
                        </p>
                        <p className="text-[#64748B] text-[10px] mt-1.5 font-bold bg-[#E2E8F0]/50 inline-block px-2 py-0.5 rounded-md uppercase tracking-wide">
                          Joined{' '}
                          {user?.createdAt &&
                            new Date(user.createdAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2.5 items-start">
                      {user?.role === 'admin' ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#C6F4D6] text-[#15803D] text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                          <Crown size={12} strokeWidth={3} />
                          {isTopAdmin(user.id) ? 'Top Admin' : 'Admin'}
                        </span>
                      ) : user?.role === 'trainer' ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#DBEAFE] text-[#1D4ED8] text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                          <Star size={12} strokeWidth={3} />
                          Trainer
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] text-xs px-2.5 py-1 rounded-full font-semibold">
                          User
                        </span>
                      )}

                      {user?.banned ? (
                        <span className="inline-flex items-center gap-1.5 text-[#EF4444] text-xs font-bold">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></div>
                          Blocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[#16A34A] text-xs font-bold">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div>
                          Active
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-3">
                      <div>
                        <div className="flex justify-between items-end mb-1.5">
                          <span className="text-xs font-semibold text-[#64748B]">
                            Activity Score
                          </span>
                          <span
                            className={`text-xs font-black ${activityScore > 80 ? 'text-[#22C55E]' : activityScore > 50 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}
                          >
                            {activityScore}
                          </span>
                        </div>
                        <div className="w-full bg-[#E2E8F0] rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${activityScore > 80 ? 'bg-gradient-to-r from-[#16A34A] to-[#22C55E]' : activityScore > 50 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'}`}
                            style={{ width: `${activityScore}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B]">
                        <TrendingUp size={14} className="text-[#16A34A]" />
                        <span className="text-[#1E293B] font-bold">
                          {user.totalBookings}
                        </span>{' '}
                        Bookings
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                      {/* Action Buttons */}
                      {actorIsAdmin &&
                        user.id !== currentUserId &&
                        canChangeRole(actorRole, user) && (
                          <select
                            value={user.role || 'user'}
                            disabled={loadingId === user.id}
                            onChange={e =>
                              handleRoleChange(user.id, e.target.value, user)
                            }
                            className="text-xs font-semibold text-[#1E293B] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-1.5 rounded-xl cursor-pointer disabled:opacity-50"
                          >
                            <option value="user">User</option>
                            <option value="trainer">Trainer</option>
                            <option value="admin">Admin</option>
                          </select>
                        )}

                      {canImpersonateTarget(
                        currentUserId,
                        actorRole,
                        user,
                      ) && (
                          <button
                            type="button"
                            disabled={loadingId === user.id}
                            onClick={() =>
                              handleImpersonate(user.id, user.role || 'user')
                            }
                            className="text-xs cursor-pointer font-bold text-[#1D4ED8] bg-[#DBEAFE] hover:bg-[#BFDBFE] border border-[#93C5FD]/50 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 hover:shadow-sm disabled:opacity-50"
                          >
                            <Eye size={14} />
                            View as
                          </button>
                        )}

                      {user.id !== currentUserId &&
                        canBlockTarget(user) &&
                        (!user.banned ? (
                          <button
                            type="button"
                            disabled={loadingId === user.id}
                            onClick={() => handleBlock(user.id)}
                            className="text-xs cursor-pointer font-bold text-[#EF4444] bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FECACA]/50 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 hover:shadow-sm disabled:opacity-50"
                          >
                            <Ban size={14} />
                            Block
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={loadingId === user.id}
                            onClick={() => handleUnblock(user.id)}
                            className="text-xs cursor-pointer font-bold text-[#10B981] bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-[#A7F3D0]/50 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 hover:shadow-sm disabled:opacity-50"
                          >
                            <Unlock size={14} />
                            Unblock
                          </button>
                        ))}

                      <button className="p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#E2E8F0] rounded-xl transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsersTable;
