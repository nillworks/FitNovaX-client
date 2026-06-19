const TrainerApplication = ({ application }) => {
  if (!application) return null;

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-[#1E293B] font-semibold">
            Application Status
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C6F4D6] text-[#15803D]">
            {application.status}
          </span>
        </div>
        <div className="w-full bg-[#E2E8F0] rounded-full h-2.5 mt-2">
          <div
            className="bg-[#22C55E] h-2.5 rounded-full"
            style={{ width: `${application.progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-[#64748B] mt-1 text-right">
          {application.step}
        </p>
      </div>

      <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] flex flex-col gap-4">
        <h5 className="text-sm font-bold text-[#1E293B]">
          Submitted Documents
        </h5>
        {application.documents.map((doc, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between text-sm bg-white p-3 rounded-xl border border-[#E2E8F0]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#8FE3B0]/20 flex items-center justify-center text-[#16A34A] font-bold">
                {doc.type}
              </div>
              <span className="text-[#1E293B] font-medium">{doc.name}</span>
            </div>
            <span
              className={`${doc.statusColor} font-semibold text-xs ${doc.statusBg} px-2 py-1 rounded`}
            >
              {doc.status}
            </span>
          </div>
        ))}
      </div>

      <button className="w-full cursor-pointer mt-auto bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#E2E8F0] text-[#1E293B] font-semibold py-3 rounded-xl transition-colors">
        View Application Details
      </button>
    </div>
  );
};

export default TrainerApplication;
