'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchTram = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`?search=${encodeURIComponent(searchTerm)}`, { scroll: false });
    } else {
      router.push(`?`, { scroll: false });
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full lg:w-[400px]">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-[#64748B]" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for classes..."
          className="w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-full pl-12 pr-28 py-3.5 text-[#1E293B] font-medium placeholder-[#64748B] focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#C6F4D6] transition-all shadow-sm hover:shadow-md"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-sm tracking-tight transition-colors flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchTram;
