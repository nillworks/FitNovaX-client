import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  X,
  Edit2,
  Image as ImageIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import CustomToast from '@/Shared/CustomToast';
import updateTrainerForum from '@/lib/Action/updateTrainerForum';

const categories = [
  { value: 'workout-tips', label: 'Workout Tips' },
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'weight-loss', label: 'Weight Loss' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'strength-training', label: 'Strength Training' },
];

const tagsList = [
  { value: 'fitness', label: 'Fitness' },
  { value: 'gym', label: 'Gym' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'lifestyle', label: 'Lifestyle' },
];

const InputWrapper = ({ label, icon: Icon, required, children, extra }) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <label className="flex items-center gap-2 text-sm font-bold text-[#1E293B] tracking-tight">
        {Icon && <Icon className="w-4 h-4 text-[#64748B]" />}
        {label}
        {required && <span className="text-[#DC2626]">*</span>}
      </label>
      {extra}
    </div>
    {children}
  </div>
);

const MyForumUpdateModal = ({ isOpen, onClose, initialData }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [summaryLength, setSummaryLength] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const router = useRouter();

  const fileInputRef = useRef(null);

   
  useEffect(() => {
    if (initialData && isOpen) {
      setTitle(initialData.title || '');
      setCategory(initialData.category || '');
      setSelectedTags(initialData.tags || []);
      setImagePreview(initialData.coverImage || null);
      setImageFile(null); // Clear any pending file upload
      setSummary(initialData.summary || initialData.shortDescription || '');
      setSummaryLength(
        (initialData.summary || initialData.shortDescription || '').length,
      );
      setDescription(initialData.description || '');
      setReadingTime(initialData.readingTime || '');
      setIsFeatured(initialData.isFeatured || initialData.featured || false);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const toggleTag = tag => {
    if (selectedTags.includes(tag.value)) {
      setSelectedTags(selectedTags.filter(t => t !== tag.value));
    } else {
      setSelectedTags([...selectedTags, tag.value]);
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = e => {
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    const updateForum = {
      _id: initialData?._id || initialData?.id,
      title,
      category,
      tags: selectedTags,
      coverImage: imagePreview,
      imageFile,
      summary,
      description,
      readingTime: Number(readingTime),
      isFeatured,
    };

    const res = await updateTrainerForum(initialData._id, updateForum);

    if (res.success) {
      router.refresh();
      CustomToast(
        'success',
        'Forum Updated Successfully',
        'Your forum post has been updated.',
      );
    } else {
      CustomToast('error', 'Update Failed', 'Unable to update the forum post.');
    }

    // if (onSubmit) {
    //   onSubmit(initialData._id, updateForum);
    // }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[75vh] overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC] shrink-0">
          <h2 className="text-xl font-bold text-[#1E293B] flex items-center gap-2">
            <Edit2 className="w-5 h-5 text-[#22C55E]" />
            Update Forum Post
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#64748B] hover:text-[#DC2626] hover:bg-red-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="overflow-y-auto custom-scrollbar p-5 md:p-6 flex-1">
          <form
            id="updateForumForm"
            onSubmit={handleFormSubmit}
            className="space-y-8"
          >
            {/* Section 1: Post Basics */}
            <section>
              <div className="mb-4 border-b border-[#E2E8F0] pb-2">
                <h3 className="text-base font-bold text-[#1E293B]">
                  Post Basics
                </h3>
              </div>
              <div className="flex flex-col gap-5">
                <InputWrapper label="Post Title" icon={FileText} required>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="E.g., 5 Ultimate Core Exercises for Beginners"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1E293B] font-medium placeholder-[#64748B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all duration-300"
                  />
                </InputWrapper>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputWrapper label="Category" required>
                    <div className="relative">
                      <select
                        required
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1E293B] font-medium appearance-none focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all duration-300"
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#64748B]">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </InputWrapper>

                  <InputWrapper label="Tags" required>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 min-h-[50px] flex flex-wrap gap-2 items-center">
                      {tagsList.map(tag => {
                        const isSelected = selectedTags.includes(tag.value);
                        return (
                          <button
                            key={tag.value}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`cursor-pointer px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${isSelected ? 'bg-[#22C55E] text-white shadow-sm scale-105' : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#8FE3B0] hover:text-[#16A34A]'}`}
                          >
                            {tag.label}
                          </button>
                        );
                      })}
                    </div>
                  </InputWrapper>
                </div>
              </div>
            </section>

            {/* Section 2: Media Upload */}
            <section>
              <div className="mb-4 border-b border-[#E2E8F0] pb-2 mt-2">
                <h3 className="text-base font-bold text-[#1E293B]">
                  Cover Image
                </h3>
              </div>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#E2E8F0] rounded-xl p-6 text-center bg-[#F8FAFC] hover:bg-[#C6F4D6]/20 hover:border-[#8FE3B0] transition-all duration-300 cursor-pointer group"
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="relative w-full max-w-xs mx-auto rounded-xl overflow-hidden shadow-sm border border-[#E2E8F0]">
                    <Image width={500} height={500} unoptimized
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-white text-[#DC2626] p-1.5 rounded-full shadow-md hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-[#E2E8F0] group-hover:scale-110 transition-transform duration-500">
                      <UploadCloud className="w-6 h-6 text-[#22C55E]" />
                    </div>
                    <h3 className="text-sm font-bold text-[#1E293B] mb-1">
                      Click to change cover
                    </h3>
                    <p className="text-[#64748B] text-xs font-medium">
                      PNG, JPG, WebP up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Section 3: Content Details */}
            <section>
              <div className="mb-4 border-b border-[#E2E8F0] pb-2 mt-2">
                <h3 className="text-base font-bold text-[#1E293B]">
                  Content Details
                </h3>
              </div>
              <div className="space-y-5">
                <InputWrapper
                  label="Short Summary"
                  required
                  extra={
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-md ${summaryLength > 150 ? 'bg-red-100 text-red-600' : 'bg-[#F8FAFC] text-[#64748B]'}`}
                    >
                      {summaryLength} / 150
                    </span>
                  }
                >
                  <textarea
                    rows="2"
                    required
                    value={summary}
                    maxLength={150}
                    onChange={e => {
                      setSummary(e.target.value);
                      setSummaryLength(e.target.value.length);
                    }}
                    placeholder="A brief overview of your post..."
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1E293B] font-medium placeholder-[#64748B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all duration-300 resize-none"
                  ></textarea>
                </InputWrapper>

                <InputWrapper label="Description" required>
                  <div className="border border-[#E2E8F0] rounded-lg overflow-hidden focus-within:border-[#22C55E] focus-within:ring-1 focus-within:ring-[#22C55E] transition-all duration-300 shadow-sm">
                    <textarea
                      rows="6"
                      required
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Write your amazing content here..."
                      className="w-full bg-[#FFFFFF] px-4 py-3 text-[#1E293B] font-medium placeholder-[#64748B] focus:outline-none resize-none leading-relaxed"
                    ></textarea>
                  </div>
                </InputWrapper>
              </div>
            </section>

            {/* Section 4: Publishing Settings */}
            <section>
              <div className="mb-4 border-b border-[#E2E8F0] pb-2 mt-2">
                <h3 className="text-base font-bold text-[#1E293B]">
                  Publishing Settings
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <InputWrapper label="Reading Time" required>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      value={readingTime}
                      onChange={e => setReadingTime(e.target.value)}
                      placeholder="5"
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-4 pr-16 py-3 text-[#1E293B] font-bold placeholder-[#64748B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all duration-300"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#E2E8F0] text-[#64748B] px-2 py-1 rounded-md font-bold text-xs">
                      min read
                    </span>
                  </div>
                </InputWrapper>

                <div>
                  <label className="block text-sm font-bold text-[#1E293B] mb-2 tracking-tight">
                    Featured Post
                  </label>
                  <div
                    onClick={() => setIsFeatured(!isFeatured)}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-300 ${isFeatured ? 'bg-[#C6F4D6]/30 border-[#8FE3B0]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}
                  >
                    <div className="flex flex-col">
                      <span
                        className={`font-bold text-sm ${isFeatured ? 'text-[#15803D]' : 'text-[#1E293B]'}`}
                      >
                        Pin to Top
                      </span>
                    </div>
                    <div
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 shadow-inner ${isFeatured ? 'bg-[#22C55E]' : 'bg-[#E2E8F0]'}`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${isFeatured ? 'left-7' : 'left-1'}`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Footer Area */}
        <div className="border-t border-[#E2E8F0] px-5 py-4 bg-[#F8FAFC] shrink-0 flex justify-end gap-3 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full font-bold text-[#64748B] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#1E293B] transition-colors shadow-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="updateForumForm"
            className="px-6 py-2.5 rounded-full font-bold text-white bg-[#22C55E] hover:bg-[#16A34A] border border-[#16A34A] transition-colors shadow-md shadow-[#22C55E]/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyForumUpdateModal;
