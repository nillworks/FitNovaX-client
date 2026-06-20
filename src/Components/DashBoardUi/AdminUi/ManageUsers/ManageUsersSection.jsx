'use client';
import React from 'react';
import ManageUsersTable from './ManageUsersTable';
import { Users, ShieldAlert, CheckCircle, Info } from 'lucide-react';

const ManageUsersSection = ({ users }) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => !u.banned).length;
  const blockedUsers = users.filter(u => u.banned).length;

  return (
    <div
      className="container mx-auto p-4 lg:p-8 min-h-screen"
      style={{ backgroundColor: '#F8FAFC' }}
    >
      {/* Top Section: Dashboard Header */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#1E293B] mb-2 tracking-tight">
              User Management
            </h1>
            <p className="text-[#64748B] text-sm lg:text-base font-medium max-w-xl">
              Monitor, manage, and secure your platforms user base. Review
              activity scores and manage access permissions from this command
              center.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-5 py-3 rounded-2xl flex items-center gap-3">
              <div className="bg-[#C6F4D6] p-2 rounded-xl">
                <Users size={20} className="text-[#16A34A]" />
              </div>
              <div>
                <p className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-0.5">
                  Total Users
                </p>
                <p className="text-[#1E293B] font-bold text-xl leading-none">
                  {totalUsers}
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-5 py-3 rounded-2xl flex items-center gap-3">
              <div className="bg-[#C6F4D6] p-2 rounded-xl">
                <CheckCircle size={20} className="text-[#16A34A]" />
              </div>
              <div>
                <p className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-0.5">
                  Active
                </p>
                <p className="text-[#1E293B] font-bold text-xl leading-none">
                  {activeUsers}
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-5 py-3 rounded-2xl flex items-center gap-3">
              <div className="bg-[#FEF2F2] p-2 rounded-xl">
                <ShieldAlert size={20} className="text-[#EF4444]" />
              </div>
              <div>
                <p className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-0.5">
                  Blocked
                </p>
                <p className="text-[#1E293B] font-bold text-xl leading-none">
                  {blockedUsers}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main Section: Data Table */}
        <div className="flex-1 min-w-0">
          <ManageUsersTable users={users} />
        </div>

        {/* Right Side: Admin Guide Card */}
        <div className="w-full xl:w-80 flex-shrink-0 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#C6F4D6] p-2 rounded-xl">
                <Info size={20} className="text-[#15803D]" />
              </div>
              <h2 className="text-[#1E293B] font-bold text-lg">Admin Guide</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-[#1E293B] font-semibold text-sm mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div>
                  Permission Guidelines
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Only grant <strong>Admin</strong> roles to trusted staff
                  members. Admins have full access to platform configurations,
                  user data, and financial records.
                </p>
              </div>

              <div className="border-t border-[#E2E8F0] pt-6">
                <h3 className="text-[#1E293B] font-semibold text-sm mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></div>
                  Blocked Users Info
                </h3>
                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0]">
                  <p className="text-[#1E293B] text-xs font-bold mb-2 uppercase tracking-wide">
                    Users Can:
                  </p>
                  <ul className="text-[#64748B] text-sm space-y-1.5 mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-[#22C55E]" /> Login
                      to account
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-[#22C55E]" />{' '}
                      Browse classes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-[#22C55E]" /> View
                      forum posts
                    </li>
                  </ul>

                  <p className="text-[#1E293B] text-xs font-bold mb-2 uppercase tracking-wide">
                    Users Cannot:
                  </p>
                  <ul className="text-[#64748B] text-sm space-y-1.5">
                    <li className="flex items-center gap-2">
                      <div className="text-[#EF4444] font-bold">✕</div> Book
                      classes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="text-[#EF4444] font-bold">✕</div> Apply
                      for trainer
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="text-[#EF4444] font-bold">✕</div> Create
                      comments
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="text-[#EF4444] font-bold">✕</div> Perform
                      actions
                    </li>
                  </ul>
                </div>

                <div className="mt-4 bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-3 flex items-start gap-2">
                  <ShieldAlert
                    size={16}
                    className="text-[#EF4444] mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-[#991B1B] text-xs font-bold mb-1">
                      Example Error Shown:
                    </p>
                    <p className="text-[#EF4444] text-xs italic">
                      Action restricted by Admin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsersSection;
