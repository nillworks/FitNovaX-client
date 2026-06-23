'use client';

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, Loader2, X } from 'lucide-react';
import { imageUpload } from '../../../../lib/imageUpload';
import postForum from '@/lib/Action/postForum';
import CustomToast from '@/Shared/CustomToast';
import { useSession } from '@/lib/auth-client';

const AddForumPostForm = ({ categories, tags }) => {
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
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  const { data } = useSession();
  const user = data?.user;

  // Simple tag selection simulation
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

  const handleForumDataSubmit = async e => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = '';
      if (imageFile) {
        const uploadData = await imageUpload(imageFile);
        if (uploadData?.display_url) {
          imageUrl = uploadData.display_url;
        }
      }

      const NewForumData = {
        title,
        category,
        tags: selectedTags,
        coverImage: imageUrl,
        summary,
        description,
        readingTime: Number(readingTime),
        isFeatured,
        userId: user?.id,
        userName: user?.name,
        userImage: user?.image,
        userRole: user?.role,
        like: 0,
        comment: 0,
        disLike: 0,
      };

      const res = await postForum(NewForumData);

      if (res?.res?.insertedId || res?.success) {
        CustomToast(
          'success',
          'Forum Published Successfully',
          `"${title}" has been posted and is now available to the community.`,
        );
      } else {
        CustomToast(
          'error',
          'Failed to Publish Forum',
          'Something went wrong while publishing the forum post. Please try again.',
        );
        return false;
      }

      // Reset form fields
      e.target.reset();
      setTitle('');
      setCategory('');
      setSelectedTags([]);
      setImageFile(null);
      setImagePreview(null);
      setSummary('');
      setDescription('');
      setReadingTime('');
      setIsFeatured(false);
      setSummaryLength(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Image upload failed or form error', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form className="space-y-6 md:space-y-8" onSubmit={handleForumDataSubmit}>
      {/* Section 1: Post Basics */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-6 flex items-center gap-3">
          <span className="bg-[#C6F4D6] text-[#15803D] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
            1
          </span>
          Post Basics
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#1E293B] mb-2 tracking-tight">
              Post Title <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="E.g., 5 Ultimate Core Exercises for Beginners"
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-5 py-4 text-[#1E293B] font-medium placeholder-[#64748B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-2 tracking-tight">
                Category <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-5 py-4 text-[#1E293B] font-medium appearance-none focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all duration-300"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories?.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-[#64748B]">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-2 tracking-tight">
                Tags <span className="text-[#DC2626]">*</span>
              </label>
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-3.5 min-h-[58px] flex flex-wrap gap-2 items-center">
                {tags?.map(tag => {
                  const isSelected = selectedTags.includes(tag.value);
                  return (
                    <button
                      key={tag.value}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`cursor-pointer px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${isSelected ? 'bg-[#22C55E] text-white shadow-sm scale-105' : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#8FE3B0] hover:text-[#16A34A]'}`}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Media Upload */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-6 flex items-center gap-3">
          <span className="bg-[#C6F4D6] text-[#15803D] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
            2
          </span>
          Cover Image
        </h2>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#E2E8F0] rounded-3xl p-8 md:p-14 text-center bg-[#F8FAFC] hover:bg-[#C6F4D6]/20 hover:border-[#8FE3B0] transition-all duration-300 cursor-pointer group"
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          {imagePreview ? (
            <div className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0]">
              <Image
                width={500}
                height={500}
                unoptimized
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 bg-white text-[#DC2626] p-1.5 rounded-full shadow-md hover:bg-red-50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-[#E2E8F0] group-hover:scale-110 transition-transform duration-500 group-hover:border-[#8FE3B0]">
                <UploadCloud className="w-10 h-10 text-[#22C55E]" />
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-2">
                Upload your cover image
              </h3>
              <p className="text-[#64748B] text-sm font-medium mb-6">
                PNG, JPG, WebP up to 5MB
              </p>
              <button
                type="button"
                className="bg-white border border-[#E2E8F0] text-[#1E293B] px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-sm pointer-events-none"
              >
                Browse Files
              </button>
            </>
          )}
        </div>
      </div>

      {/* Section 3: Content Details */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-6 flex items-center gap-3">
          <span className="bg-[#C6F4D6] text-[#15803D] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
            3
          </span>
          Content Details
        </h2>

        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-[#1E293B] tracking-tight">
                Short Summary <span className="text-[#DC2626]">*</span>
              </label>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-md ${summaryLength > 150 ? 'bg-red-100 text-red-600' : 'bg-[#F8FAFC] text-[#64748B]'}`}
              >
                {summaryLength} / 150
              </span>
            </div>
            <textarea
              rows="2"
              required
              value={summary}
              maxLength={150}
              onChange={e => {
                setSummary(e.target.value);
                setSummaryLength(e.target.value.length);
              }}
              placeholder="A brief overview of your post to attract readers..."
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-5 py-4 text-[#1E293B] font-medium placeholder-[#64748B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all duration-300 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1E293B] mb-2 tracking-tight">
              Description <span className="text-[#DC2626]">*</span>
            </label>
            <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden focus-within:border-[#22C55E] focus-within:ring-1 focus-within:ring-[#22C55E] transition-all duration-300 shadow-sm">
              {/* Fake Toolbar */}
              <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-3 flex gap-2 overflow-x-auto custom-scrollbar">
                <button
                  type="button"
                  className="p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#E2E8F0] rounded-xl transition-colors font-bold w-10 h-10 flex items-center justify-center cursor-pointer"
                >
                  B
                </button>
                <button
                  type="button"
                  className="p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#E2E8F0] rounded-xl transition-colors italic font-serif w-10 h-10 flex items-center justify-center cursor-pointer"
                >
                  I
                </button>
                <button
                  type="button"
                  className="p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#E2E8F0] rounded-xl transition-colors underline w-10 h-10 flex items-center justify-center cursor-pointer"
                >
                  U
                </button>
                <div className="w-px h-6 bg-[#E2E8F0] my-auto mx-2"></div>
                <button
                  type="button"
                  className="p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#E2E8F0] rounded-xl transition-colors w-10 h-10 flex items-center justify-center cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
              <textarea
                rows="12"
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Write your amazing content here. Use paragraphs, lists, and headings to make it engaging..."
                className="w-full bg-[#FFFFFF] px-6 py-5 text-[#1E293B] font-medium placeholder-[#64748B] focus:outline-none resize-none leading-relaxed"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Publishing Settings */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-6 flex items-center gap-3">
          <span className="bg-[#C6F4D6] text-[#15803D] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
            4
          </span>
          Publishing Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block text-sm font-bold text-[#1E293B] mb-2 tracking-tight">
              Reading Time <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                required
                value={readingTime}
                onChange={e => setReadingTime(e.target.value)}
                placeholder="5"
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl pl-5 pr-20 py-4 text-[#1E293B] font-bold placeholder-[#64748B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all duration-300"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 bg-[#E2E8F0] text-[#64748B] px-3 py-1 rounded-lg font-bold text-xs">
                min read
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1E293B] mb-2 tracking-tight">
              Featured Post
            </label>
            <div
              onClick={() => setIsFeatured(!isFeatured)}
              className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${isFeatured ? 'bg-[#C6F4D6]/30 border-[#8FE3B0]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}
            >
              <div className="flex flex-col">
                <span
                  className={`font-bold ${isFeatured ? 'text-[#15803D]' : 'text-[#1E293B]'}`}
                >
                  Pin to Top
                </span>
                <span className="text-xs font-medium text-[#64748B] mt-0.5">
                  Show this post on the featured slider
                </span>
              </div>
              <div
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 shadow-inner ${isFeatured ? 'bg-[#22C55E]' : 'bg-[#E2E8F0]'}`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${isFeatured ? 'left-8' : 'left-1'}`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Submit Area */}
      <div className="bg-transparent pt-4 flex flex-col sm:flex-row items-center justify-end gap-5">
        <button
          type="button"
          className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-[#1E293B] bg-white border border-[#E2E8F0] hover:border-[#8FE3B0] hover:bg-[#F8FAFC] hover:text-[#15803D] transition-all duration-300 shadow-sm cursor-pointer"
        >
          Save Draft
        </button>
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full sm:w-auto px-10 py-4 rounded-full font-bold text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2 transform ${isUploading ? 'bg-[#8FE3B0] cursor-not-allowed shadow-none' : 'bg-[#22C55E] hover:bg-[#16A34A] shadow-[#22C55E]/30 hover:-translate-y-0.5 cursor-pointer'}`}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Publish Post
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddForumPostForm;
