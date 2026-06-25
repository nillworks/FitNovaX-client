import React from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  FileText,
  Award,
  CreditCard,
  Dumbbell,
  ArrowRight,
} from 'lucide-react';

const hasApplication = application => {
  if (!application) return false;
  if (Array.isArray(application)) return application.length > 0;
  return true;
};

const getApplication = application =>
  Array.isArray(application) ? application[0] : application;

const TrainerApplication = ({ application }) => {
  if (!hasApplication(application)) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full min-h-[220px] py-8 px-4">
        <div className="w-16 h-16 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center mb-5">
          <Dumbbell size={28} className="text-[#22C55E]" />
        </div>
        <h4 className="text-lg font-bold text-[#1E293B] mb-2">
          No Trainer Application Yet
        </h4>
        <p className="text-sm text-[#64748B] max-w-sm leading-relaxed mb-6">
          You have not applied to become a trainer yet. Share your experience
          and credentials to start your journey as a fitness professional.
        </p>
        <Link
          href="/dashboard/user/apply"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-bold transition-colors shadow-sm"
        >
          Apply for Trainer
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const app = getApplication(application);

  const documents = [
    {
      name: 'Resume/CV',
      link: app.resumeLink,
      icon: <FileText size={16} />,
      status: 'Submitted',
    },
    {
      name: 'Certificate',
      link: app.certificateLink,
      icon: <Award size={16} />,
      status: 'Submitted',
    },
    {
      name: 'NID Document',
      link: app.nidUrl,
      icon: <CreditCard size={16} />,
      status: 'Submitted',
    },
  ];

  const statusColor =
    app.status === 'pending'
      ? 'bg-[#FEF08A] text-[#854D0E]'
      : app.status === 'approved'
        ? 'bg-[#C6F4D6] text-[#15803D]'
        : 'bg-[#FECACA] text-[#991B1B]';

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-[#1E293B] font-semibold">
            Application Status
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusColor}`}
          >
            {app.status || 'Pending'}
          </span>
        </div>
        <div className="w-full bg-[#E2E8F0] rounded-full h-2.5 mt-2">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${app.status === 'rejected' ? 'bg-[#EF4444]' : 'bg-[#22C55E]'}`}
            style={{ width: app.status === 'pending' ? '50%' : '100%' }}
          ></div>
        </div>
        <p className="text-xs text-[#64748B] mt-1 text-right capitalize">
          {app.status === 'pending' ? 'Under Review' : app.status}
        </p>
      </div>

      {app.status === 'rejected' && app.rejectReason && (
        <div className="bg-[#FEF2F2] p-4 rounded-2xl border border-[#FCA5A5]">
          <p className="text-sm font-bold text-[#991B1B] mb-1">Reason for Rejection</p>
          <p className="text-sm text-[#B91C1C] italic">"{app.rejectReason}"</p>
        </div>
      )}

      <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] flex flex-col gap-4">
        <h5 className="text-sm font-bold text-[#1E293B]">Submitted Documents</h5>
        {documents.map((doc, idx) =>
          doc.link ? (
            <a
              key={idx}
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-sm bg-white p-3 rounded-xl border border-[#E2E8F0] hover:border-[#8FE3B0] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#8FE3B0]/20 flex items-center justify-center text-[#16A34A] group-hover:scale-110 transition-transform">
                  {doc.icon}
                </div>
                <span className="text-[#1E293B] font-medium">{doc.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#15803D] bg-[#C6F4D6] font-semibold text-[10px] uppercase px-2 py-1 rounded">
                  {doc.status}
                </span>
                <ExternalLink
                  size={14}
                  className="text-[#64748B] group-hover:text-[#16A34A]"
                />
              </div>
            </a>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default TrainerApplication;
