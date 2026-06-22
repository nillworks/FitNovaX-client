'use client';

import Image from 'next/image';
import React from 'react';
import { Eye, Calendar, Clock, Star } from 'lucide-react';

const getAppId = app =>
  app?._id?.$oid || app?._id?.toString?.() || app?._id || app?.id;

const formatDate = date =>
  date ? new Date(date).toLocaleDateString('en-GB') : '—';

const formatStatus = status =>
  status
    ? String(status).charAt(0).toUpperCase() + String(status).slice(1)
    : 'Pending';

const TrainerApplicationsTable = ({ applications, onOpenModal }) => {
  const getStatusStyle = status => {
    const normalized = String(status || 'pending').toLowerCase();
    if (normalized === 'pending') {
      return 'bg-[#FFFBEB] text-[#D97706] border-[#FEF3C7] shadow-sm';
    }
    if (normalized === 'approved') {
      return 'bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7] shadow-sm';
    }
    if (normalized === 'rejected') {
      return 'bg-[#FEF2F2] text-[#B91C1C] border-[#FEE2E2] shadow-sm';
    }
    return 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] shadow-sm';
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden">
      <div className="p-6 border-b border-[#E2E8F0] bg-white flex justify-between items-center">
        <h3 className="text-[#1E293B] font-bold text-lg">Application Queue</h3>
        <span className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm uppercase tracking-wide">
          {applications.length} on page
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Applicant
              </th>
              <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Specialty & Exp
              </th>
              <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Applied On
              </th>
              <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] bg-white">
            {applications.map(app => (
              <tr
                key={getAppId(app)}
                className="hover:bg-[#F8FAFC] transition-colors group"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <Image width={500} height={500} unoptimized
                      src={
                        app.userImage ||
                        'https://i.pravatar.cc/150?u=trainer'
                      }
                      alt={app.fullName || app.name}
                      className="w-12 h-12 rounded-2xl object-cover shadow-sm border border-[#E2E8F0]"
                    />
                    <div>
                      <p className="text-[#1E293B] font-bold text-sm leading-tight">
                        {app.fullName || app.name || 'Unknown'}
                      </p>
                      <p className="text-[#64748B] text-xs mt-0.5 font-medium">
                        {app.email || '—'}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex flex-col items-start gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-white border border-[#E2E8F0] text-[#1E293B] text-xs px-2.5 py-1 rounded-lg font-bold shadow-sm">
                      <Star size={12} className="text-[#F59E0B]" fill="#F59E0B" />
                      {app.specialty || '—'}
                    </span>
                    <span className="text-xs font-semibold text-[#64748B] flex items-center gap-1 bg-[#F8FAFC] px-2 py-0.5 rounded-md">
                      <Clock size={12} />
                      {app.experience || '0'} Exp.
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="text-xs font-bold text-[#64748B] flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#94A3B8]" />
                    {formatDate(app.createdAt?.$date || app.createdAt)}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${getStatusStyle(app.status)}`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                    {formatStatus(app.status)}
                  </span>
                </td>

                <td className="px-6 py-5 text-right">
                  <button
                    type="button"
                    onClick={() => onOpenModal(app)}
                    className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] hover:border-[#4AD27A] hover:bg-[#F0FDF4] text-[#16A34A] text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow cursor-pointer"
                  >
                    <Eye size={14} />
                    Review Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainerApplicationsTable;
