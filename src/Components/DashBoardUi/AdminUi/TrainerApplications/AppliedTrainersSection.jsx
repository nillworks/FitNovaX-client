"use client";
import React, { useState, useEffect } from 'react';
import TrainerApplicationsTable from './TrainerApplicationsTable';
import TrainerApplicationModal from './TrainerApplicationModal';
import { Users, Clock, CheckCircle, XCircle, Info, FileText, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { getTrainerApplications } from '@/lib/api/getTrainerApplications';

const AppliedTrainersSection = () => {
  const [applicationsData, setApplicationsData] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingReviews: 0,
    approvedTrainers: 0,
    rejectedApplications: 0,
  });

  const fetchApplications = async (page) => {
    setIsLoading(true);
    try {
      const response = await getTrainerApplications(page, 10);
      if (response && response.data) {
        setApplicationsData(response.data);
        setCurrentPage(response.currentPage || page);
        setTotalPages(response.totalPages || 1);
        setTotalApplications(response.total || response.data.length);
        
        // Use global stats if available in response, otherwise calculate from current page
        setStats({
          totalApplications: response.total || response.data.length,
          pendingReviews: response.pendingCount ?? response.data.filter(app => app.status === 'pending').length,
          approvedTrainers: response.approvedCount ?? response.data.filter(app => app.status === 'approved').length,
          rejectedApplications: response.rejectedCount ?? response.data.filter(app => app.status === 'rejected').length,
        });
      }
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(currentPage);
  }, [currentPage]);

  const openModal = (app) => setSelectedApp(app);
  const closeModal = () => setSelectedApp(null);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 min-h-screen relative" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Top Section: Executive Review Banner */}
      <div className="bg-gradient-to-r from-[#1E293B] to-[#334155] rounded-3xl p-6 lg:p-8 mb-8 shadow-[0_20px_40px_rgb(0,0,0,0.1)] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-[#C6F4D6] opacity-10 rounded-full blur-2xl translate-y-1/2 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-white">
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <FileText className="text-[#22C55E]" size={28} />
              Applied Trainers
            </h1>
            <p className="text-[#94A3B8] text-sm lg:text-base font-medium max-w-xl">
              Review and manage incoming trainer applications. Ensure every new addition meets our platform's premium quality standards.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 lg:p-5 text-white min-w-[220px] shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#C6F4D6] text-sm font-semibold uppercase tracking-wider">Review Progress</span>
              <span className="font-bold">{stats.totalApplications - stats.pendingReviews} / {stats.totalApplications}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-[#22C55E] h-2 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-500" 
                style={{ width: `${stats.totalApplications > 0 ? ((stats.totalApplications - stats.pendingReviews) / stats.totalApplications) * 100 : 0}%` }}
              ></div>
            </div>
            <p className="text-xs text-[#94A3B8] mt-2 font-medium">{stats.pendingReviews} pending applications awaiting your decision.</p>
          </div>
        </div>
      </div>

      {/* Statistics Section: Premium Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Applications", value: stats.totalApplications, icon: Users, color: "text-[#1E293B]", bgColor: "bg-[#F8FAFC]" },
          { label: "Pending Reviews", value: stats.pendingReviews, icon: Clock, color: "text-[#F59E0B]", bgColor: "bg-[#FFFBEB]" },
          { label: "Approved Trainers", value: stats.approvedTrainers, icon: CheckCircle, color: "text-[#16A34A]", bgColor: "bg-[#F0FDF4]" },
          { label: "Rejected", value: stats.rejectedApplications, icon: XCircle, color: "text-[#EF4444]", bgColor: "bg-[#FEF2F2]" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
            <div>
              <p className="text-[#64748B] text-sm font-semibold mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-[#1E293B]">{isLoading ? <Loader2 className="animate-spin text-[#94A3B8] w-6 h-6 mt-2" /> : stat.value}</h3>
            </div>
            <div className={`${stat.bgColor} p-3.5 rounded-2xl group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main Section: Left Side - Applications Review Area */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="bg-white rounded-3xl p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-[#22C55E] w-12 h-12 mb-4" />
              <p className="text-[#64748B] font-medium">Loading applications...</p>
            </div>
          ) : (
            <>
              <TrainerApplicationsTable applications={applicationsData} onOpenModal={openModal} />
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
                  <span className="text-sm text-[#64748B] font-medium">
                    Showing <span className="font-bold text-[#1E293B]">{applicationsData.length}</span> of <span className="font-bold text-[#1E293B]">{totalApplications}</span> applications
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="p-2 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-bold text-[#1E293B] px-4">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Side: Trainer Approval Guide */}
        <div className="w-full xl:w-80 flex-shrink-0 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#C6F4D6] p-2.5 rounded-xl border border-[#8FE3B0]/30">
                <Info size={20} className="text-[#15803D]" />
              </div>
              <h2 className="text-[#1E293B] font-bold text-lg">Approval Guide</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-[#1E293B] font-semibold text-sm mb-3">Review Guidelines</h3>
                <p className="text-[#64748B] text-sm leading-relaxed font-medium">
                  Evaluate candidates based on their expertise, availability, and alignment with our community standards. Ensure all certifications are valid.
                </p>
              </div>

              <div className="border-t border-[#E2E8F0] pt-5">
                <h3 className="text-[#1E293B] font-semibold text-sm mb-3">Quality Checklist</h3>
                <ul className="space-y-3">
                  {[
                    "Minimum 2 years experience",
                    "Relevant specialty certification",
                    "Professional bio provided",
                    "Consistent availability"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#64748B] font-medium">
                      <div className="bg-[#F0FDF4] p-1 rounded-md flex-shrink-0 mt-0.5 border border-[#8FE3B0]/30">
                        <CheckCircle size={12} className="text-[#22C55E]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 mt-2 hover:bg-[#F0FDF4] transition-colors group">
                <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wide mb-1.5 group-hover:text-[#15803D]">Note to Admins</h4>
                <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                  Approving a trainer automatically sends them an onboarding email and grants them access to the Trainer Dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedApp && (
        <TrainerApplicationModal application={selectedApp} onClose={closeModal} />
      )}
      
    </div>
  );
};

export default AppliedTrainersSection;
