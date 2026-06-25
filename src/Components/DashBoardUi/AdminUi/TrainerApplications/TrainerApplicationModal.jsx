'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  X,
  CheckCircle,
  XCircle,
  Award,
  Clock,
  Calendar,
  FileText,
  Briefcase,
  ExternalLink,
} from 'lucide-react';
import {
  approveTrainerApplication,
  rejectTrainerApplication,
} from '@/lib/admin/manageTrainerApplicationActions';
import CustomToast from '@/Shared/CustomToast';
import { useRouter } from 'next/navigation';

const getAppId = app =>
  app?._id?.$oid || app?._id?.toString?.() || app?._id || app?.id;

const formatDate = date =>
  date ? new Date(date).toLocaleDateString('en-GB') : '—';

const formatStatus = status =>
  status
    ? String(status).charAt(0).toUpperCase() + String(status).slice(1)
    : 'Pending';

const TrainerApplicationModal = ({ application, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const status = formatStatus(application.status);
  const router = useRouter();

  const handleApprove = async id => {
    const res = await approveTrainerApplication(id);

    if (res.success) {
      router.refresh();
      onClose();
      CustomToast(
        'success',
        'Application Approved',
        'User role has been updated to Trainer successfully.',
      );
    } else {
      CustomToast(
        'error',
        'Approval Failed',
        res.message || 'Something went wrong while approving.',
      );
    }
  };

  const handleReject = async id => {
    if (!rejectReason.trim()) {
      CustomToast('error', 'Reason Required', 'Please provide a reason for rejection.');
      return;
    }
    const res = await rejectTrainerApplication(id, rejectReason);
    if (res.success) {
      router.refresh();
      onClose();
      CustomToast(
        'success',
        'Application Rejected',
        'Trainer application has been rejected successfully.',
      );
    } else {
      CustomToast(
        'error',
        'Rejection Failed',
        res.message || 'Something went wrong while rejecting.',
      );
    }
  };

  const linkFields = [
    { label: 'Resume', url: application.resumeLink },
    { label: 'Certificate', url: application.certificateLink },
    { label: 'LinkedIn', url: application.linkedin },
    { label: 'NID Document', url: application.nidUrl },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/40 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.15)] w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden border border-[#E2E8F0]/50">
        <div className="relative p-5 sm:p-6 bg-gradient-to-b from-[#F8FAFC] to-white border-b border-[#E2E8F0]">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-white rounded-full border border-[#E2E8F0] text-[#64748B] hover:text-[#EF4444] transition-colors shadow-sm cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex items-start gap-5">
            <Image width={500} height={500} unoptimized
              src={
                application.userImage || 'https://i.pravatar.cc/150?u=trainer'
              }
              alt={application.fullName || application.name}
              className="w-20 h-20 rounded-2xl object-cover shadow-md border-4 border-white"
            />
            <div>
              <h2 className="text-2xl font-black text-[#1E293B] leading-tight">
                {application.fullName || application.name}
              </h2>
              <p className="text-sm text-[#64748B] font-medium mt-1">
                {application.email}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 bg-[#C6F4D6]/50 border border-[#8FE3B0]/50 text-[#15803D] text-xs px-3 py-1 rounded-lg font-bold">
                  <Award size={14} />
                  {application.specialty || '—'}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full border bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]">
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-5 bg-white">
          <section>
            <h3 className="flex items-center gap-2 text-[#1E293B] font-bold text-lg mb-3">
              <Briefcase size={20} className="text-[#22C55E]" />
              Professional Overview
            </h3>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
              <p className="text-[#1E293B] text-sm leading-relaxed font-medium italic border-l-2 border-[#C6F4D6] pl-4">
                "{application.bio || 'No bio provided.'}"
              </p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="text-xs">
                  <span className="text-[#64748B] font-bold uppercase">
                    Age
                  </span>
                  <p className="font-bold text-[#1E293B] mt-1">
                    {application.age || '—'}
                  </p>
                </div>
                <div className="text-xs">
                  <span className="text-[#64748B] font-bold uppercase">
                    Education
                  </span>
                  <p className="font-bold text-[#1E293B] mt-1">
                    {application.education || '—'}
                  </p>
                </div>
                <div className="text-xs">
                  <span className="text-[#64748B] font-bold uppercase">
                    Experience
                  </span>
                  <p className="font-bold text-[#1E293B] mt-1">
                    {application.experience || '—'}
                  </p>
                </div>
                <div className="text-xs">
                  <span className="text-[#64748B] font-bold uppercase">
                    Role
                  </span>
                  <p className="font-bold text-[#1E293B] mt-1 capitalize">
                    {application.role || '—'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-[#1E293B] font-bold text-lg mb-3">
              <FileText size={20} className="text-[#22C55E]" />
              Application Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 flex items-start gap-3">
                <Clock size={18} className="text-[#16A34A] mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#64748B] uppercase mb-1">
                    Availability
                  </p>
                  <p className="text-sm font-bold text-[#1E293B]">
                    {application.availableTime || '—'}
                  </p>
                </div>
              </div>
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 flex items-start gap-3">
                <Calendar size={18} className="text-[#16A34A] mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#64748B] uppercase mb-1">
                    Applied Date
                  </p>
                  <p className="text-sm font-bold text-[#1E293B]">
                    {formatDate(
                      application.createdAt?.$date || application.createdAt,
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[#1E293B] font-bold text-sm mb-3">Documents</h3>
            <div className="flex flex-wrap gap-2">
              {linkFields.map(
                ({ label, url }) =>
                  url && (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A] bg-[#F0FDF4] border border-[#DCFCE7] px-3 py-2 rounded-xl hover:bg-[#DCFCE7] transition-colors"
                    >
                      <ExternalLink size={12} />
                      {label}
                    </a>
                  ),
              )}
            </div>
          </section>
        </div>

        <div className="p-5 sm:p-6 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-col sm:flex-row gap-4 justify-end">
          {isRejecting ? (
            <div className="w-full flex flex-col gap-3">
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="Enter the reason for rejection..."
                className="w-full p-3 bg-white border border-[#E2E8F0] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#EF4444]/50 focus:border-[#EF4444] transition-all text-[#1E293B] placeholder-[#94A3B8] resize-none h-24"
              />
              <div className="flex flex-col sm:flex-row gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setIsRejecting(false)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-[#64748B] bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors shadow-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleReject(application?._id)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] transition-colors shadow-sm cursor-pointer"
                >
                  Confirm Reject
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsRejecting(true)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-[#EF4444] bg-white border border-[#FECACA] hover:bg-[#FEF2F2] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <XCircle size={18} />
                Reject Application
              </button>
              <button
                type="button"
                onClick={() => handleApprove(application?._id)}
                className="w-full sm:w-auto px-8 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#16A34A] to-[#22C55E] hover:from-[#15803D] hover:to-[#16A34A] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle size={18} />
                Approve Trainer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerApplicationModal;
