'use client';
import React from 'react';
import AddClassForm from './AddClassForm';
import { Dumbbell, Sparkles } from 'lucide-react';
import postAddNewClass from '@/lib/Action/postAddNewClass';
import CustomToast from '@/Shared/CustomToast';
import { useSession } from '@/lib/auth-client';

const AddClassSection = () => {
  const categoryOptions = [
    { value: 'yoga', label: 'Yoga' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'hiit', label: 'HIIT' },
    { value: 'pilates', label: 'Pilates' },
    { value: 'strength', label: 'Strength Training' },
  ];

  const difficultyOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const scheduleDays = [
    { id: 'mon', label: 'Mon' },
    { id: 'tue', label: 'Tue' },
    { id: 'wed', label: 'Wed' },
    { id: 'thu', label: 'Thu' },
    { id: 'fri', label: 'Fri' },
    { id: 'sat', label: 'Sat' },
    { id: 'sun', label: 'Sun' },
  ];

  const { data } = useSession();
  const user = data?.user;

  const handleFormSubmit = async formDataObj => {
    // console.log('Form Submitted Data: ', formDataObj);

    const newClassData = {
      ...formDataObj,
      bookedCount: 0,
      status: 'pending',
      userId: user?.id,
      userRole: user?.role,
    };

    const res = await postAddNewClass(newClassData);

    if (res?.insertedId || res?.success) {
      CustomToast(
        'success',
        'Class Added Successfully',
        `${formDataObj.className} has been added and is now ready for enrollment.`,
      );
      return true;
    } else {
      CustomToast(
        'error',
        'Failed to Add Class',
        'Something went wrong while creating the class. Please try again.',
      );
      return false;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-[#F8FAFC]">
      {/* Header Area */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-[#C6F4D6] rounded-xl text-[#16A34A] shadow-sm border border-[#8FE3B0]">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-[#1E293B]">Add New Class</h1>
          </div>
          <p className="text-[#64748B] text-base font-medium max-w-2xl">
            Create and publish a new fitness class for your members.
          </p>
        </div>

        {/* Unique Right Side Element: Pro Tip Card */}
        <div className="hidden md:flex items-center bg-[#FFFFFF] border border-[#E2E8F0] p-4 rounded-2xl shadow-sm max-w-xs transition-transform hover:-translate-y-1 duration-300">
          <div className="w-10 h-10 bg-[#C6F4D6] rounded-full flex items-center justify-center text-[#15803D] mr-3 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[#1E293B] text-sm font-bold">Pro Tip</h4>
            <p className="text-[#64748B] text-xs mt-0.5 leading-tight">
              Clear descriptions lead to 40% more enrollments!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <AddClassForm
        categoryOptions={categoryOptions}
        difficultyOptions={difficultyOptions}
        scheduleDays={scheduleDays}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default AddClassSection;
