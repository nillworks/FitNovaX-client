'use client';

import { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  CreditCard,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
  Loader2,
} from 'lucide-react';
import CustomToast from '@/Shared/CustomToast';
import { useSession } from '@/lib/auth-client';
import addToFavorite from '@/lib/api/addToFavorite';
import deleteFavorite from '@/lib/Action/deleteFavorite';

const ClassDetailsActions = ({
  classData,
  classId,
  isBooked = false,
  isFavorited = false,
  initialFavoriteId = null,
}) => {
  const [booked, setBooked] = useState(isBooked);
  const [favorited, setFavorited] = useState(isFavorited);
  const [favoriteId, setFavoriteId] = useState(initialFavoriteId);
  const [isSubmittingFavorite, setIsSubmittingFavorite] = useState(false);
  const { data } = useSession();
  const user = data?.user;

  const spotsLeft = Math.max(
    0,
    Number(classData.maxBookings || 0) - Number(classData.bookedCount || 0),
  );
  const isFull = spotsLeft <= 0;

  const handleBookNow = () => {
    if (booked) {
      CustomToast(
        'error',
        'Already Booked',
        'You have already booked this class.',
      );
      return;
    }

    if (isFull) {
      CustomToast('error', 'Class Full', 'No spots available for this class.');
      return;
    }

    // TODO: redirect to payment page after booking validation
    // router.push(`/payment/${classId}`);
    CustomToast(
      'success',
      'Ready to Book',
      'Payment page integration will be connected here.',
    );
  };

  const handleFavorite = async () => {
    if (!user) {
      CustomToast(
        'error',
        'Authentication Required',
        'Please login to add to favorites',
      );
      return;
    }

    if (favorited) {
      if (!favoriteId) {
        CustomToast('error', 'Error', 'Cannot remove favorite: Missing ID');
        return;
      }
      try {
        setIsSubmittingFavorite(true);
        const res = await deleteFavorite(favoriteId);

        if (res.success) {
          setFavorited(false);
          setFavoriteId(null);
          CustomToast(
            'success',
            'Removed',
            'Class removed from your favorites.',
          );
        } else {
          CustomToast(
            'error',
            'Error',
            res.message || 'Failed to remove favorite',
          );
        }
      } catch (error) {
        CustomToast(
          'error',
          'Error',
          'Something went wrong while removing favorite',
        );
      } finally {
        setIsSubmittingFavorite(false);
      }
      return;
    }

    try {
      setIsSubmittingFavorite(true);
      const favoriteData = {
        classId: classId,
        userId: user?.id,
      };

      const res = await addToFavorite(favoriteData);

      if (res.success) {
        setFavorited(true);
        setFavoriteId(res.insertedId);
        CustomToast('success', 'Added to Favorites', res.message);
      } else {
        if (res.message === 'Already added to favorites') {
          setFavorited(true);
        }
        CustomToast(
          'error',
          'Notice',
          res.message || 'Failed to add to favorites',
        );
      }
    } catch (error) {
      CustomToast(
        'error',
        'Error',
        'Something went wrong while adding to favorites',
      );
    } finally {
      setIsSubmittingFavorite(false);
    }
  };

  return (
    <div className="xl:sticky xl:top-28 space-y-5">
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-[0_12px_40px_rgb(0,0,0,0.06)] overflow-hidden">
        <div className="bg-gradient-to-br from-[#15803D] to-[#22C55E] p-6 text-white">
          <p className="text-[#C6F4D6] text-xs font-bold uppercase tracking-wider mb-1">
            Secure Your Spot
          </p>
          <div className="flex items-end justify-between gap-4">
            <p className="text-4xl font-black">${classData.price || '0.00'}</p>
            <span className="text-sm font-semibold text-[#DCFCE7]">
              per session
            </span>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 text-center">
              <Users size={16} className="text-[#22C55E] mx-auto mb-1" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                Booked
              </p>
              <p className="text-lg font-black text-[#1E293B]">
                {classData.bookedCount ?? 0}
              </p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 text-center">
              <CalendarCheck
                size={16}
                className="text-[#22C55E] mx-auto mb-1"
              />
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                Spots Left
              </p>
              <p className="text-lg font-black text-[#1E293B]">{spotsLeft}</p>
            </div>
          </div>

          <form action={'/api/checkout_sessions'} method="POST">
            <input type="hidden" name="price" value={classData.price} />
            <input type="hidden" name="title" value={classData.className} />
            <input type="hidden" name="productId" value={classData._id} />

            <button
              type="submit"
              disabled={booked || isFull}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                booked
                  ? 'bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] cursor-not-allowed'
                  : isFull
                    ? 'bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA] cursor-not-allowed'
                    : 'bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:-translate-y-0.5 cursor-pointer'
              }`}
            >
              {booked ? (
                <>
                  <CheckCircle2 size={18} />
                  Already Booked
                </>
              ) : isFull ? (
                'Class Full'
              ) : (
                <>
                  <CreditCard size={18} />
                  Book Now
                </>
              )}
            </button>
          </form>

          <button
            type="button"
            onClick={handleFavorite}
            disabled={isSubmittingFavorite}
            className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm border transition-all duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
              favorited
                ? 'bg-[#F0FDF4] border-[#8FE3B0] text-[#15803D] hover:bg-[#DCFCE7]'
                : 'bg-white border-[#E2E8F0] text-[#1E293B] hover:border-[#8FE3B0] hover:bg-[#F8FAFC]'
            }`}
          >
            {isSubmittingFavorite ? (
              <Loader2 size={18} className="animate-spin text-[#22C55E]" />
            ) : (
              <Heart
                size={18}
                className={favorited ? 'fill-[#22C55E] text-[#22C55E]' : ''}
              />
            )}
            {favorited ? 'Saved to Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-[#1E293B] uppercase tracking-wider">
          Why Book Here
        </h3>
        {[
          {
            icon: ShieldCheck,
            text: 'Secure Stripe checkout for safe payments',
          },
          {
            icon: Sparkles,
            text: 'Expert-led sessions with verified trainers',
          },
          {
            icon: Heart,
            text: 'Save classes to your favorites anytime',
          },
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center shrink-0">
              <item.icon size={16} className="text-[#22C55E]" />
            </div>
            <p className="text-sm text-[#64748B] font-medium leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-center text-[#94A3B8] font-medium px-2">
        Class ID: {classId || '—'}
      </p>
    </div>
  );
};

export default ClassDetailsActions;
