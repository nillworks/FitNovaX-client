"use client";
import React, { useState } from 'react';
import { Upload, Clock, DollarSign, Calendar, Activity, Type, Image as ImageIcon, FileText, PlusCircle, Users } from 'lucide-react';
import { imageUpload } from '../../../../lib/imageUpload';

const InputWrapper = ({ label, icon: Icon, required, children }) => (
  <div className="flex flex-col gap-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-[#1E293B]">
      {Icon && <Icon className="w-4 h-4 text-[#64748B]" />}
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const AddClassForm = ({ categoryOptions, difficultyOptions, scheduleDays, onSubmit }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');

  React.useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);
      let diff = (end - start) / 1000 / 60; // in minutes
      if (diff < 0) diff += 24 * 60; // cross midnight
      setDuration(diff.toString());
    }
  }, [startTime, endTime]);

  const toggleDay = (dayId) => {
    if (selectedDays.includes(dayId)) {
      setSelectedDays(selectedDays.filter(d => d !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);
      const dataObj = Object.fromEntries(formData.entries());
      dataObj.scheduleDays = formData.getAll('scheduleDays');

      if (imageFile) {
        const uploadResult = await imageUpload(imageFile);
        // ImgBB returns the URL in data.display_url or data.url
        dataObj.classImage = uploadResult?.display_url || uploadResult?.url;
      }

      if (onSubmit) {
        const isSuccess = await onSubmit(dataObj);
        if (isSuccess !== false) {
          e.target.reset();
          setSelectedDays([]);
          setImagePreview(null);
          setImageFile(null);
          setStartTime('');
          setEndTime('');
          setDuration('');
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-8">
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl shadow-sm overflow-hidden p-6 md:p-10 space-y-12">
        
        {/* Section 1: Basic Class Information */}
        <section>
          <div className="mb-6 border-b border-[#E2E8F0] pb-4">
            <h2 className="text-xl font-bold text-[#1E293B]">Basic Class Information</h2>
          </div>
          <div className="flex flex-col gap-6">
            <InputWrapper label="Class Name" icon={Type} required>
              <input 
                type="text" 
                name="className"
                placeholder="e.g. Advanced Vinyasa Flow"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4AD27A] focus:border-transparent transition-all placeholder:text-[#64748B]"
                required
              />
            </InputWrapper>
            
            <InputWrapper label="Class Image Upload" icon={ImageIcon} required>
              <div className={`relative border-2 border-dashed border-[#E2E8F0] rounded-xl bg-[#F8FAFC] p-6 flex transition-all overflow-hidden ${imagePreview ? 'items-center justify-between' : 'flex-col items-center justify-center h-48 md:h-56 group hover:bg-[#C6F4D6]/20 hover:border-[#8FE3B0]'}`}>
                {imagePreview ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#C6F4D6] shadow-sm shrink-0">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-[#1E293B] font-bold text-base">Image Selected</p>
                        <p className="text-[#64748B] text-sm truncate max-wxs">{imageFile?.name || 'uploaded_image'}</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => document.getElementById('classImageUpload').click()}
                      className="px-5 py-2.5 bg-[#FFFFFF] border border-[#E2E8F0] text-[#1E293B] font-semibold rounded-xl shadow-sm hover:bg-[#F8FAFC] hover:border-[#8FE3B0] transition-colors whitespace-nowrap active:scale-95"
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-[#C6F4D6] rounded-full flex items-center justify-center mb-4 text-[#16A34A] group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-[#1E293B] font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-[#64748B] text-sm">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </>
                )}
                <input 
                  id="classImageUpload"
                  type="file" 
                  name="classImage" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`cursor-pointer ${imagePreview ? 'hidden' : 'absolute inset-0 w-full h-full opacity-0'}`} 
                  required={!imagePreview} 
                />
              </div>
            </InputWrapper>
          </div>
        </section>

        {/* Section 2: Class Configuration */}
        <section>
          <div className="mb-6 border-b border-[#E2E8F0] pb-4">
            <h2 className="text-xl font-bold text-[#1E293B]">Class Configuration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputWrapper label="Category" icon={Activity} required>
              <div className="relative">
                <select 
                  name="category"
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4AD27A] focus:border-transparent transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select category</option>
                  {categoryOptions?.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </InputWrapper>
            
            <InputWrapper label="Difficulty Level" icon={Activity} required>
              <div className="relative">
                <select 
                  name="difficulty"
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4AD27A] focus:border-transparent transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select difficulty</option>
                  {difficultyOptions?.map(diff => (
                    <option key={diff.value} value={diff.value}>{diff.label}</option>
                  ))}
                </select>
              </div>
            </InputWrapper>
            
            <InputWrapper label="Max Booking Slots" icon={Users} required>
              <input 
                type="number" 
                name="maxBookings"
                placeholder="e.g. 15"
                min="1"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4AD27A] focus:border-transparent transition-all placeholder:text-[#64748B]"
                required
              />
            </InputWrapper>
          </div>
        </section>

        {/* Section 3: Pricing & Duration */}
        <section>
          <div className="mb-6 border-b border-[#E2E8F0] pb-4">
            <h2 className="text-xl font-bold text-[#1E293B]">Pricing & Duration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputWrapper label="Duration (minutes)" icon={Clock} required>
              <input 
                type="number" 
                name="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 60"
                min="1"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4AD27A] focus:border-transparent transition-all placeholder:text-[#64748B]"
                required
              />
            </InputWrapper>
            
            <InputWrapper label="Price ($)" icon={DollarSign} required>
              <input 
                type="number" 
                name="price"
                placeholder="e.g. 25.00"
                step="0.01"
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4AD27A] focus:border-transparent transition-all placeholder:text-[#64748B]"
                required
              />
            </InputWrapper>
          </div>
        </section>

        {/* Section 4: Weekly Schedule */}
        <section>
          <div className="mb-6 border-b border-[#E2E8F0] pb-4">
            <h2 className="text-xl font-bold text-[#1E293B]">Weekly Schedule</h2>
          </div>
          <InputWrapper label="Select Days" icon={Calendar} required>
            <div className="flex flex-wrap gap-3 mt-2">
              {scheduleDays?.map((day) => {
                const isSelected = selectedDays.includes(day.id);
                return (
                  <label 
                    key={day.id} 
                    className={`cursor-pointer px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border select-none
                      ${isSelected 
                        ? 'bg-[#22C55E] text-[#FFFFFF] border-[#22C55E] shadow-md shadow-[#8FE3B0]/30 ring-2 ring-[#C6F4D6] ring-offset-1 scale-105' 
                        : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:border-[#8FE3B0] hover:bg-[#C6F4D6]/30 hover:text-[#16A34A]'
                      }`}
                  >
                    <input 
                      type="checkbox" 
                      name="scheduleDays" 
                      value={day.id} 
                      className="hidden" 
                      checked={isSelected}
                      onChange={() => toggleDay(day.id)}
                    />
                    {day.label}
                  </label>
                );
              })}
            </div>
          </InputWrapper>
        </section>

        {/* Section 5: Class Dates & Times */}
        <section>
          <div className="mb-6 border-b border-[#E2E8F0] pb-4">
            <h2 className="text-xl font-bold text-[#1E293B]">Class Dates & Times</h2>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputWrapper label="Start Date" icon={Calendar} required>
              <input 
                type="date" 
                name="startDate"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4AD27A] focus:border-transparent transition-all"
                required
              />
            </InputWrapper>
            <InputWrapper label="End Date" icon={Calendar} required>
              <input 
                type="date" 
                name="endDate"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4AD27A] focus:border-transparent transition-all"
                required
              />
            </InputWrapper>
            <InputWrapper label="Start Time" icon={Clock} required>
              <input 
                type="time" 
                name="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4AD27A] focus:border-transparent transition-all"
                required
              />
            </InputWrapper>
            <InputWrapper label="End Time" icon={Clock} required>
              <input 
                type="time" 
                name="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4AD27A] focus:border-transparent transition-all"
                required
              />
            </InputWrapper>
          </div>
        </section>

        {/* Section 6: Class Description */}
        <section>
          <div className="mb-6 border-b border-[#E2E8F0] pb-4">
            <h2 className="text-xl font-bold text-[#1E293B]">Class Description</h2>
          </div>
          <InputWrapper label="Description" icon={FileText} required>
            <textarea 
              name="description"
              rows={5}
              placeholder="Describe what members can expect from this class. Include required equipment, focus areas, and benefits..."
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#4AD27A] focus:border-transparent transition-all placeholder:text-[#64748B] resize-y"
              required
            ></textarea>
          </InputWrapper>
        </section>

        {/* Section 7: Submit Area */}
        <div className="pt-6 border-t border-[#E2E8F0]">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full px-10 py-4 text-[#FFFFFF] rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all duration-300 ${
              isSubmitting 
                ? 'bg-[#8FE3B0] cursor-not-allowed shadow-none'
                : 'bg-[#22C55E] cursor-pointer shadow-[#8FE3B0]/60 hover:bg-[#16A34A] hover:shadow-[#4AD27A]/50 hover:-translate-y-0.5 active:scale-95'
            }`}
          >
            {isSubmitting ? (
              <span className="w-6 h-6 border-2 border-[#FFFFFF] border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <PlusCircle className="w-6 h-6" />
            )}
            {isSubmitting ? 'Publishing...' : 'Add Class'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddClassForm;
