import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import getUserSession from '@/lib/getUserSession';
import { subscription } from '@/lib/api/subscription';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;
  const user = await getUserSession();

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const {
    status,
    metadata,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  await subscription({ ...metadata, sessionId: session_id });

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl shadow-indigo-100 p-8 text-center transform transition-all duration-500 hover:scale-[1.02]">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-50"></div>
              <div className="relative bg-white rounded-full p-2 z-10">
                <CheckCircle className="w-20 h-20 text-green-500" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Payment Successful!
          </h1>
          <p className="text-gray-500 mb-8">
            Thank you for your purchase. Your payment was processed
            successfully.
          </p>

          <div className="bg-gray-50/80 rounded-2xl p-6 mb-8 text-left border border-gray-100 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-indigo-500" />
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Order Details
              </h3>
            </div>

            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200/60">
              <span className="text-gray-800 font-medium">
                {metadata?.title || 'Premium Subscription'}
              </span>
              <span className="text-indigo-600 font-bold">
                ${metadata?.price || '0'}
              </span>
            </div>

            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Mail className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-gray-700 font-medium truncate text-sm">
                {customerEmail}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2 ml-11">
              Receipt and access details sent.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <Link
              href={`/dashboard/${user?.role}`}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium transition-all duration-200 group"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/"
              className="w-full flex items-center justify-center py-3.5 px-4 border border-gray-200 rounded-xl shadow-sm text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Need help? Contact{' '}
              <a
                href="mailto:support@fontrend.com"
                className="text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
              >
                support@fontrend.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
