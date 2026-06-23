import React from 'react';
import ForumPostContent from './ForumPostContent';
import ForumCommentsSection from './ForumCommentsSection';

const ForumPostDetailsSection = ({ post, comments }) => {
  return (
    <main className="w-full bg-[#F8FAFC] min-h-screen pb-24">
      <ForumPostContent post={post}>
        {/* We pass the comments section as children to place it seamlessly at the bottom of the main content column */}
        <ForumCommentsSection comments={comments} forumId={post?._id} />
      </ForumPostContent>
    </main>
  );
};

export default ForumPostDetailsSection;
