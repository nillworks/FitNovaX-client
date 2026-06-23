import React from 'react';
import CommunityForumDetailsApi from '@/lib/api/CommunityForumDetailsApi';
import ForumPostDetailsSection from '@/Components/ForumDetailsPage/ForumPostDetailsSection';
import getUserSession from '@/lib/getUserSession';
import { redirect } from 'next/navigation';

const page = async ({ params }) => {
  const user = await getUserSession();

  if (!user) {
    return redirect('/login');
  }

  const { id } = await params;

  // Fetch details
  const response = await CommunityForumDetailsApi(id);
  const post = response?.data || null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <h1 className="text-2xl font-bold text-[#1E293B]">Post Not Found</h1>
      </div>
    );
  }

  // Assuming comments data might come from the post or another API. The instructions say "Assume all data is already available via props"
  // If the backend API `api/community/forum/:id` doesn't include comments, we just pass an empty array or whatever is in `post.comments`.
  const comments = post?.comments || [];

  return (
    <div className="min-h-screen pt-35 bg-[#F8FAFC]">
      <ForumPostDetailsSection post={post} comments={comments} />
    </div>
  );
};

export default page;
