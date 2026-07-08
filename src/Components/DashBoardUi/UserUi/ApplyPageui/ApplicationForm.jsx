'use client';
import React, { useState } from 'react';
import TrainerForm from './TrainerForm';
import TrainerSuccess from './TrainerSuccess';
import TrainerPending from './TrainerPending';
import { useSession, signOut } from '@/lib/auth-client';
import { applyTrainer } from '@/lib/Action/applyTrainer';
import CustomToast from '@/Shared/CustomToast';
import { useRouter } from 'next/navigation';

const ApplicationForm = ({ trainerData }) => {
  const [applicationStatus, setApplicationStatus] = useState(trainerData?.status || 'none');
  const [submittedData, setSubmittedData] = useState(trainerData || null);
  const router = useRouter();

  const { data } = useSession();
  const user = data?.user;

  React.useEffect(() => {
    if (trainerData) {
      setApplicationStatus(trainerData.status || 'none');
      setSubmittedData(trainerData);
    }
  }, [trainerData]);

  const handleSubmit = async formData => {
    const newApplyTrainer = {
      ...formData,
      status: 'pending',
      userId: user?.id,
      email: user?.email,
      role: user?.role,
      name: user?.name,
      userImage: user?.image,
    };

    try {
      const res = await applyTrainer(newApplyTrainer);

      if (res.success) {
        setSubmittedData(formData);
        setApplicationStatus('pending');
        router.refresh();
        CustomToast(
          'success',
          'Application Submitted',
          'Your trainer application has been sent successfully.',
        );
      } else {
        CustomToast(
          'error',
          'Submission Failed',
          res.message || 'Something went wrong',
        );
      }
    } catch (error) {
      CustomToast('error', 'Server Error', 'Please try again later');
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pt-6 sm:pt-10">
      {/* Decorative Header Banner */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
        <div className="w-full lg:w-4/5 xl:w-3/4 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] py-12 sm:py-16 px-6 sm:px-12 relative overflow-hidden rounded-[2rem] shadow-xl border border-slate-800">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#10B981]"></div>
          
          <div className="relative z-10 flex flex-col gap-4 text-center sm:text-left items-center sm:items-start">
            <span className="text-[#10B981] font-bold tracking-widest uppercase text-sm mb-1 px-3 py-1 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full w-fit shadow-sm">
              Join Our Elite Team
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
              Apply as a <span className="text-[#10B981]">Trainer</span>
            </h1>
            <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-2xl mt-2">
              Share your credentials and specialty. Our admin team will
              review your application within 2-3 business days.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 relative z-20 pb-20">
        <div className="flex justify-center">
          <div className="w-full lg:w-4/5 xl:w-3/4 flex flex-col gap-8">
            {/* For testing different states (hidden visually but kept for dev) */}
            <div className="hidden">
              {/* <div className="flex gap-2">...</div> */}
            </div>

            {applicationStatus === 'rejected' && (
              <div className="p-4 bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#DC2626] shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex flex-col">
                  <h3 className="text-[#991B1B] font-bold text-lg">
                    Application Rejected
                  </h3>
                  <p className="text-[#B91C1C] font-medium mt-1">
                    Your previous application was not accepted. Please review
                    your details and you may submit a new application below.
                  </p>
                  {submittedData?.rejectReason && (
                    <div className="mt-3 p-3 bg-white/60 border border-[#FCA5A5] rounded-lg">
                      <p className="text-[#991B1B] text-sm font-semibold mb-1">Reason for Rejection:</p>
                      <p className="text-[#B91C1C] text-sm italic">"{submittedData.rejectReason}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content Area */}
            {applicationStatus === 'approved' ? (
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500 mt-4">
                <div className="bg-[#F0FDF4] p-5 rounded-full mb-6 border-8 border-[#DCFCE7]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-[#22C55E]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-[#1E293B] mb-4">
                  Application Approved!
                </h3>
                <p className="text-[#64748B] text-lg font-medium max-w-lg leading-relaxed mb-8">
                  Congratulations! Your application is very successful. You have been approved as a Trainer. 
                  Please <strong className="text-[#1E293B]">re-login</strong> to your account to update your session and access the Trainer Dashboard.
                </p>
                <button
                  onClick={async () => {
                    await signOut();
                    window.location.href = '/login';
                  }}
                  className="px-8 py-3.5 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgb(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:-translate-y-0.5 transition-all duration-200 text-lg cursor-pointer"
                >
                  Log Out & Re-login
                </button>
              </div>
            ) : applicationStatus === 'none' ||
            applicationStatus === 'rejected' ? (
              <TrainerForm onSubmit={handleSubmit} />
            ) : (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <TrainerSuccess />
                <TrainerPending
                  data={submittedData}
                  onEdit={() => setApplicationStatus('none')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
