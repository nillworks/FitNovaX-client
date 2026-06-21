import React from 'react';
import { ExternalLink, FileText, Award, CreditCard } from 'lucide-react';

const TrainerApplication = ({ application }) => {
  if (!application) return null;

  const documents = [
    {
      name: 'Resume/CV',
      link: application.resumeLink,
      icon: <FileText size={16} />,
      status: 'Submitted',
    },
    {
      name: 'Certificate',
      link: application.certificateLink,
      icon: <Award size={16} />,
      status: 'Submitted',
    },
    {
      name: 'NID Document',
      link: application.nidUrl,
      icon: <CreditCard size={16} />,
      status: 'Submitted',
    },
  ];

  const statusColor = application.status === 'pending' 
    ? 'bg-[#FEF08A] text-[#854D0E]' 
    : application.status === 'approved' 
      ? 'bg-[#C6F4D6] text-[#15803D]' 
      : 'bg-[#FECACA] text-[#991B1B]';

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-[#1E293B] font-semibold">
            Application Status
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusColor}`}>
            {application.status || 'Pending'}
          </span>
        </div>
        <div className="w-full bg-[#E2E8F0] rounded-full h-2.5 mt-2">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${application.status === 'rejected' ? 'bg-[#EF4444]' : 'bg-[#22C55E]'}`}
            style={{ width: application.status === 'pending' ? '50%' : '100%' }}
          ></div>
        </div>
        <p className="text-xs text-[#64748B] mt-1 text-right capitalize">
          {application.status === 'pending' ? 'Under Review' : application.status}
        </p>
      </div>

      <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] flex flex-col gap-4">
        <h5 className="text-sm font-bold text-[#1E293B]">
          Submitted Documents
        </h5>
        {documents.map((doc, idx) => (
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
                <ExternalLink size={14} className="text-[#64748B] group-hover:text-[#16A34A]" />
              </div>
            </a>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default TrainerApplication;
