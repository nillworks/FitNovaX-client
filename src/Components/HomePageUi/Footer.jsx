import React from 'react';
import Image from 'next/image';
import { StaggerContainer, StaggerItem, FadeIn } from '../Animations/MotionWrappers';
const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-[#E2E8F0] pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-12">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <StaggerItem className="space-y-6">
            <div className="flex items-center gap-2">
              <Image src="/fitNovax.png" width={200} height={60} alt="fitNovaX Logo" className="w-auto h-12 md:h-14 object-contain drop-shadow-md hover:drop-shadow-xl hover:scale-[1.02] transition-all duration-300" unoptimized />
              <span className="font-bold text-2xl tracking-tight text-white">
                Fit<span className="text-[#22C55E]">Nova</span>
              </span>
            </div>
            <p className="text-[#64748B] leading-relaxed max-w-xs">
              Elevating your fitness experience through premium classes and expert training programs.
            </p>
          </StaggerItem>

          <StaggerItem>
            <h4 className="text-white font-bold text-lg mb-6 tracking-tight">Quick Links</h4>
            <ul className="space-y-4 text-[#64748B] font-semibold">
              <li><a href="#" className="hover:text-[#22C55E] transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-[#22C55E] transition-colors">Classes</a></li>
              <li><a href="#" className="hover:text-[#22C55E] transition-colors">Trainers</a></li>
              <li><a href="#" className="hover:text-[#22C55E] transition-colors">Community</a></li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h4 className="text-white font-bold text-lg mb-6 tracking-tight">Support</h4>
            <ul className="space-y-4 text-[#64748B] font-semibold">
              <li><a href="#" className="hover:text-[#22C55E] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#22C55E] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#22C55E] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#22C55E] transition-colors">Contact Us</a></li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h4 className="text-white font-bold text-lg mb-6 tracking-tight">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center text-[#64748B] hover:bg-[#22C55E] hover:text-white transition-colors">
                 {/* Twitter Icon */}
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center text-[#64748B] hover:bg-[#22C55E] hover:text-white transition-colors">
                 {/* Instagram Icon */}
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
            <p className="text-[#64748B] text-sm">
              support@fitnovax.com<br/>
              +1 (555) 123-4567
            </p>
          </StaggerItem>
        </StaggerContainer>
        
        <FadeIn className="border-t border-[#1E293B] pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-[#64748B] text-sm font-semibold" delay={0.4}>
          <p>&copy; {new Date().getFullYear()} fitNovaX Platform. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};

export default Footer;
