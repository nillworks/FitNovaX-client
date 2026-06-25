'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  Clock,
  BarChart3,
  Presentation,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  approveClass,
  rejectClass,
  deleteClass,
} from '@/lib/admin/manageClassActions';
import CustomToast from '@/Shared/CustomToast';
import { useRouter } from 'next/navigation';

const getClassId = cls =>
  cls?._id?.$oid || cls?._id?.toString?.() || cls?._id || cls?.id;

const formatLabel = value =>
  value ? String(value).charAt(0).toUpperCase() + String(value).slice(1) : '—';

const ClassesManagementTable = ({
  classesData = [],
  pagination = {},
  currentPage = 1,
}) => {
  const [loadingId, setLoadingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const totalPages = pagination.totalPages || 1;
  const totalItems = pagination.total ?? classesData.length;
  const router = useRouter();

  const handleApprove = async id => {
    setLoadingId(id);
    const res = await approveClass(id);

    if (res.success) {
      router.refresh();
      CustomToast(
        'success',
        'Success',
        res.message || 'Class approved successfully',
      );
    } else {
      CustomToast('error', 'Error', res.message || 'Something went wrong');
    }
    setLoadingId(null);
  };

  const handleReject = async id => {
    setLoadingId(id);
    const res = await rejectClass(id);

    if (res.success) {
      router.refresh();
      CustomToast(
        'success',
        'Class Rejected',
        'The class has been rejected successfully.',
      );
    } else {
      CustomToast(
        'error',
        'Rejection Failed',
        res.message || 'Failed to reject the class.',
      );
    }

    setLoadingId(null);
  };

  const handleDelete = async id => {
    setLoadingId(id);
    const res = await deleteClass(id);

    if (res.success) {
      router.refresh();

      CustomToast(
        'success',
        'Class Deleted',
        'The class has been deleted successfully.',
      );
    } else {
      CustomToast(
        'error',
        'Delete Failed',
        res.message || 'Failed to delete the class.',
      );
    }
    setLoadingId(null);
  };

  if (!classesData.length) {
    return (
      <div className="bg-white rounded-3xl p-10 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="bg-[#F8FAFC] p-6 rounded-full mb-6 border border-[#E2E8F0] relative">
          <div className="absolute inset-0 bg-[#C6F4D6] rounded-full blur-xl opacity-30"></div>
          <Presentation size={48} className="text-[#64748B] relative z-10" />
        </div>
        <h3 className="text-2xl font-black text-[#1E293B] mb-3">
          No Classes Found
        </h3>
        <p className="text-[#64748B] max-w-md font-medium leading-relaxed">
          There are currently no trainer-submitted classes available. New class
          submissions will appear here.
        </p>
      </div>
    );
  }

  const getDifficultyColor = difficulty => {
    const level = String(difficulty || '').toLowerCase();
    if (level === 'beginner') {
      return 'bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7]';
    }
    if (level === 'advanced') {
      return 'bg-[#FEF2F2] text-[#B91C1C] border-[#FEE2E2]';
    }
    if (level === 'intermediate') {
      return 'bg-[#FFFBEB] text-[#D97706] border-[#FEF3C7]';
    }
    return 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]';
  };

  const getStatusBadge = status => {
    const normalized = String(status || 'pending').toLowerCase();

    if (normalized === 'pending') {
      return (
        <span className="inline-flex items-center gap-1.5 bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7] text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse"></span>
          Pending
        </span>
      );
    }

    if (normalized === 'rejected') {
      return (
        <span className="inline-flex items-center gap-1.5 bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
          Rejected
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
        <CheckCircle size={12} />
        {formatLabel(normalized)}
      </span>
    );
  };

  const renderActions = cls => {
    const id = getClassId(cls);
    const status = String(cls.status || 'pending').toLowerCase();
    const isLoading = loadingId === id;

    const showApprove = status === 'pending' || status === 'rejected';
    const showReject = status === 'pending' || status === 'approved';

    return (
      <div className="flex items-center justify-end gap-2">
        {showApprove && (
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleApprove(id)}
            title="Approve"
            className="p-2 rounded-xl text-[#16A34A] bg-[#F0FDF4] border border-[#DCFCE7] hover:bg-[#DCFCE7] transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            <CheckCircle size={16} />
          </button>
        )}
        {showReject && (
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleReject(id)}
            title="Reject"
            className="p-2 rounded-xl text-[#EF4444] bg-[#FEF2F2] border border-[#FECACA] hover:bg-[#FEE2E2] transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            <XCircle size={16} />
          </button>
        )}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleDelete(id)}
          title="Delete"
          className="p-2 rounded-xl text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-white hover:text-[#EF4444] hover:border-[#FECACA] transition-colors shadow-sm cursor-pointer disabled:opacity-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden flex flex-col">
      <div className="p-5 border-b border-[#E2E8F0] bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-[#1E293B] font-bold text-lg flex items-center gap-2">
          Class Roster
          <span className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
            {totalItems} Items
          </span>
        </h3>
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-[#94A3B8]" />
          </div>
          <input
            type="text"
            placeholder="Search classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:bg-white transition-all text-[#1E293B] placeholder-[#94A3B8]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <th className="px-5 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Class Info
              </th>
              <th className="px-5 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Trainer
              </th>
              <th className="px-5 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Details
              </th>
              <th className="px-5 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Bookings
              </th>
              <th className="px-5 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] bg-white">
            {(() => {
              const filteredClasses = classesData.filter(cls => {
                if (!searchQuery) return true;
                const query = searchQuery.toLowerCase();
                const classNameMatch = cls.className?.toLowerCase().includes(query);
                const trainerMatch = (cls.trainerName || cls.userName || cls.UserName || '')?.toLowerCase().includes(query);
                const categoryMatch = cls.category?.toLowerCase().includes(query);
                return classNameMatch || trainerMatch || categoryMatch;
              });

              if (filteredClasses.length === 0) {
                return (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-[#64748B] font-medium">
                      No classes match your search "{searchQuery}".
                    </td>
                  </tr>
                );
              }

              return filteredClasses.map(cls => (
              <tr
                key={getClassId(cls)}
                className="hover:bg-[#F8FAFC]/50 transition-colors group"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <Image width={500} height={500} unoptimized
                      src={
                        cls.classImage ||
                        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=200&auto=format&fit=crop'
                      }
                      alt={cls.className}
                      className="w-16 h-12 rounded-lg object-cover shadow-sm border border-[#E2E8F0]"
                    />
                    <div>
                      <p className="text-[#1E293B] font-bold text-sm leading-tight mb-1">
                        {cls.className}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-[#16A34A] bg-[#C6F4D6]/50 px-2 py-0.5 rounded-md">
                          {formatLabel(cls.category)}
                        </span>
                        {cls.startDate && (
                          <span className="text-[#64748B]">
                            {cls.startDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Image width={500} height={500} unoptimized
                      src={
                        cls.userImage || 'https://i.pravatar.cc/150?u=trainer'
                      }
                      alt={cls.trainerName || cls.userName || 'Trainer'}
                      className="w-8 h-8 rounded-full object-cover border border-[#E2E8F0]"
                    />
                    <div>
                      <span className="text-[#1E293B] text-sm font-semibold block">
                        {cls.UserName || cls.userName || 'Trainer'}
                      </span>
                      <span className="text-[#64748B] text-[10px] font-medium capitalize">
                        {cls.userRole || 'trainer'}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <Clock size={12} className="text-[#64748B]" />
                      <span className="font-semibold text-[#1E293B]">
                        {cls.duration ? `${cls.duration} Min` : '—'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <BarChart3 size={12} className="text-[#64748B]" />
                      <span
                        className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${getDifficultyColor(cls.difficulty)}`}
                      >
                        {formatLabel(cls.difficulty)}
                      </span>
                    </div>
                    <div className="text-[10px] font-semibold text-[#64748B]">
                      ${cls.price} · Max {cls.maxBookings}
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1E293B]">
                    <Users size={14} className="text-[#16A34A]" />
                    {cls.bookedCount ?? 0}
                  </div>
                </td>

                <td className="px-5 py-4">{getStatusBadge(cls.status)}</td>

                <td className="px-5 py-4 text-right">{renderActions(cls)}</td>
              </tr>
              ));
            })()}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-5 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-semibold text-[#64748B]">
            Page {currentPage} of {totalPages} · {totalItems} total classes
          </p>
          <div className="flex items-center gap-2">
            {currentPage > 1 ? (
              <Link
                href={`/dashboard/admin/classes?page=${currentPage - 1}`}
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-bold text-[#1E293B] bg-white border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <ChevronLeft size={16} />
                Previous
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 px-4 py-2 text-sm font-bold text-[#94A3B8] bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl cursor-not-allowed">
                <ChevronLeft size={16} />
                Previous
              </span>
            )}

            {currentPage < totalPages ? (
              <Link
                href={`/dashboard/admin/classes?page=${currentPage + 1}`}
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-bold text-[#1E293B] bg-white border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                Next
                <ChevronRight size={16} />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 px-4 py-2 text-sm font-bold text-[#94A3B8] bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl cursor-not-allowed">
                Next
                <ChevronRight size={16} />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassesManagementTable;
