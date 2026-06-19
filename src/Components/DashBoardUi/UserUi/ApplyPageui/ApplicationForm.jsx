"use client";
import React, { useState } from 'react';
import TrainerForm from './TrainerForm';
import TrainerSuccess from './TrainerSuccess';
import TrainerPending from './TrainerPending';

const ApplicationForm = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log('Trainer Application Data:', data);
    setSubmittedData(data);
  };

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="w-full lg:w-2/3 xl:w-1/2 flex flex-col gap-6">
            
            {/* Header Area outside the card matching the design */}
            <div className="flex flex-col gap-2 mb-2">
              <h1 className="text-3xl font-bold text-[#1E293B] tracking-tight">
                Apply as Trainer
              </h1>
              <p className="text-[#64748B] font-semibold leading-relaxed">
                Share your credentials and specialty. Our admin team will review your application within 2-3 business days.
              </p>
            </div>

            {/* Content Area */}
            {!submittedData ? (
              <TrainerForm onSubmit={handleSubmit} />
            ) : (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <TrainerSuccess />
                <TrainerPending data={submittedData} />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
