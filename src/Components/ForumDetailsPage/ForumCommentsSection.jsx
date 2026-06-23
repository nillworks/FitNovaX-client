"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { FaReply, FaEdit, FaTrash, FaUserCircle, FaCommentDots } from 'react-icons/fa';
import { useSession } from '@/lib/auth-client';
import { toast } from 'sonner';
import { addComment, addReply, getComments, updateComment, deleteComment } from '@/lib/api/forumCommentApi';

const CommentCard = ({ comment, currentUser, isReply = false, onReply, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment?.comment || '');
  
  const [isReplying, setIsReplying] = useState(false);
  const [replyValue, setReplyValue] = useState('');

  const isOwner = currentUser?.id === comment?.userId;

  const handleSaveEdit = async () => {
    if (!editValue.trim()) return;
    await onEdit(comment._id, editValue);
    setIsEditing(false);
  };

  const handleSendReply = async () => {
    if (!replyValue.trim()) return;
    await onReply(comment._id, replyValue);
    setIsReplying(false);
    setReplyValue('');
  };

  return (
    <div className={`flex flex-col bg-[#FFFFFF] border border-[#E2E8F0] rounded-[2rem] p-6 shadow-sm transition-all hover:shadow-md ${isReply ? 'ml-6 md:ml-12 border-l-4 border-l-[#4AD27A] mt-4' : 'mt-6'}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-4">
        <div className="flex items-center gap-4">
          {comment?.userImage ? (
            <img 
              src={comment.userImage} 
              alt={comment.userName} 
              className="w-12 h-12 rounded-full object-cover border-2 border-[#C6F4D6]"
            />
          ) : (
            <FaUserCircle className="w-12 h-12 text-[#E2E8F0]" />
          )}
          <div className="flex flex-col">
            <span className="text-base font-black text-[#1E293B]">{comment?.userName || 'Anonymous'}</span>
            <span className="text-sm font-medium text-[#64748B]">
              {comment?.createdAt ? new Date(comment.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Just now'}
            </span>
          </div>
        </div>
        
        {/* Actions UI */}
        <div className="flex items-center gap-2 bg-[#F8FAFC] px-2 py-1.5 rounded-2xl border border-[#E2E8F0]">
          {currentUser && !isReply && (
            <button onClick={() => setIsReplying(!isReplying)} className="text-[#64748B] hover:text-[#22C55E] hover:bg-[#C6F4D6] rounded-xl transition-all p-2.5" title="Reply">
              <FaReply />
            </button>
          )}
          {isOwner && (
            <>
              <button onClick={() => setIsEditing(!isEditing)} className="text-[#64748B] hover:text-[#3B82F6] hover:bg-[#DBEAFE] rounded-xl transition-all p-2.5" title="Edit">
                <FaEdit />
              </button>
              <button onClick={() => onDelete(comment._id)} className="text-[#64748B] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-xl transition-all p-2.5" title="Delete">
                <FaTrash />
              </button>
            </>
          )}
        </div>
      </div>
      
      {isEditing ? (
        <div className="flex flex-col gap-3 mt-2">
           <textarea 
             value={editValue}
             onChange={(e) => setEditValue(e.target.value)}
             className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-[1rem] p-4 text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-all resize-none"
             rows="3"
           />
           <div className="flex justify-end gap-2">
             <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-[#64748B] font-bold hover:bg-[#F8FAFC] rounded-lg">Cancel</button>
             <button onClick={handleSaveEdit} className="bg-[#3B82F6] text-[#FFFFFF] font-bold px-6 py-2 rounded-lg hover:bg-[#2563EB]">Save</button>
           </div>
        </div>
      ) : (
        <p className="text-[#1E293B] text-lg leading-relaxed font-medium px-1">
          {comment?.comment}
        </p>
      )}

      {/* Inline Reply Form */}
      {isReplying && (
        <div className="mt-6 flex flex-col gap-3 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
           <textarea 
             value={replyValue}
             onChange={(e) => setReplyValue(e.target.value)}
             placeholder="Write a reply..."
             className="w-full bg-[#FFFFFF] border-2 border-[#E2E8F0] rounded-[1rem] p-4 text-[#1E293B] focus:outline-none focus:border-[#22C55E] transition-all resize-none"
             rows="2"
           />
           <div className="flex justify-end gap-2">
             <button onClick={() => setIsReplying(false)} className="px-4 py-2 text-[#64748B] font-bold hover:bg-[#E2E8F0] rounded-lg">Cancel</button>
             <button onClick={handleSendReply} className="bg-[#22C55E] text-[#FFFFFF] font-bold px-6 py-2 rounded-lg hover:bg-[#16A34A]">Reply</button>
           </div>
        </div>
      )}

      {/* Render nested replies if they exist */}
      {comment?.replies && comment.replies.length > 0 && (
        <div className="mt-6 flex flex-col gap-2 relative">
          <div className="absolute left-6 top-0 bottom-8 w-px bg-[#E2E8F0] -z-10 hidden md:block"></div>
          {comment.replies.map((reply, idx) => (
            <CommentCard 
              key={reply._id || idx} 
              comment={reply} 
              isReply={true} 
              currentUser={currentUser} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ForumCommentsSection = ({ forumId, comments: initialComments = [] }) => {
  const { data: session } = useSession();
  const currentUser = session?.user;

  const [commentList, setCommentList] = useState(initialComments);
  const [newCommentValue, setNewCommentValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch latest comments
  const refreshComments = async () => {
    if (!forumId) return;
    const res = await getComments(forumId);
    if (res.success) {
      setCommentList(res.data);
    }
  };

  useEffect(() => {
    refreshComments();
  }, [forumId]);

  // Build tree from flat array based on parentId
  const commentTree = useMemo(() => {
    const map = {};
    const roots = [];

    // Initialize map
    commentList.forEach(c => {
      map[c._id] = { ...c, replies: [] };
    });

    // Populate tree
    commentList.forEach(c => {
      if (c.parentId) {
        if (map[c.parentId]) {
          map[c.parentId].replies.push(map[c._id]);
        } else {
          roots.push(map[c._id]); // orphaned reply fallback
        }
      } else {
        roots.push(map[c._id]);
      }
    });

    // Sort replies
    roots.forEach(r => {
      r.replies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    });

    return roots;
  }, [commentList]);

  const handlePostComment = async () => {
    if (!currentUser) return toast.error('You must be logged in to comment.');
    if (!newCommentValue.trim()) return toast.error('Comment cannot be empty.');

    setIsSubmitting(true);
    const data = {
      forumId,
      userId: currentUser.id,
      userName: currentUser.name,
      userImage: currentUser.image || currentUser.imageURL,
      comment: newCommentValue.trim(),
    };

    const res = await addComment(data);
    if (res.success) {
      toast.success('Comment posted successfully!');
      setNewCommentValue('');
      await refreshComments();
    } else {
      toast.error(res.message || 'Failed to post comment.');
    }
    setIsSubmitting(false);
  };

  const handleReply = async (parentId, text) => {
    if (!currentUser) return toast.error('You must be logged in to reply.');
    
    const data = {
      forumId,
      parentId,
      userId: currentUser.id,
      userName: currentUser.name,
      userImage: currentUser.image || currentUser.imageURL,
      comment: text.trim(),
    };

    const res = await addReply(data);
    if (res.success) {
      toast.success('Reply posted successfully!');
      await refreshComments();
    } else {
      toast.error(res.message || 'Failed to post reply.');
    }
  };

  const handleEdit = async (commentId, text) => {
    if (!currentUser) return;
    const res = await updateComment(commentId, currentUser.id, text.trim());
    if (res.success) {
      toast.success('Comment updated!');
      await refreshComments();
    } else {
      toast.error(res.message || 'Failed to update comment.');
    }
  };

  const handleDelete = async (commentId) => {
    if (!currentUser) return;
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    const res = await deleteComment(commentId, currentUser.id);
    if (res.success) {
      toast.success('Comment deleted!');
      await refreshComments();
    } else {
      toast.error(res.message || 'Failed to delete comment.');
    }
  };

  return (
    <section className="w-full pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#E2E8F0]">
         <div className="flex items-center gap-4">
           <div className="w-14 h-14 bg-[#C6F4D6] rounded-[1.25rem] flex items-center justify-center text-[#15803D] shadow-sm">
              <FaCommentDots className="text-2xl" />
           </div>
           <div>
             <h2 className="text-2xl md:text-3xl font-black text-[#1E293B]">Discussion</h2>
             <p className="text-[#64748B] text-base font-bold mt-1">{commentList.length} Comments</p>
           </div>
         </div>
      </div>

      {/* Add Comment Form */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[2rem] p-6 md:p-8 mb-12 shadow-sm focus-within:ring-4 focus-within:ring-[#C6F4D6] transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#22C55E]"></div>
        <h3 className="text-xl font-black text-[#1E293B] mb-5 pl-2">Join the conversation</h3>
        {currentUser ? (
          <>
            <textarea 
              rows="4" 
              value={newCommentValue}
              onChange={(e) => setNewCommentValue(e.target.value)}
              placeholder="Share your thoughts, ask a question, or provide feedback..."
              className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-[1.5rem] p-6 text-[#1E293B] text-lg focus:outline-none focus:border-[#22C55E] focus:bg-[#FFFFFF] transition-all resize-none mb-6 font-medium"
            ></textarea>
            <div className="flex justify-end">
              <button 
                onClick={handlePostComment}
                disabled={isSubmitting}
                className="bg-[#16A34A] disabled:opacity-50 hover:bg-[#15803D] text-[#FFFFFF] font-black tracking-wide py-4 px-10 rounded-2xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </>
        ) : (
          <div className="p-8 bg-[#F8FAFC] rounded-2xl text-center border-2 border-dashed border-[#E2E8F0]">
            <p className="text-[#64748B] font-bold">Please log in to participate in the discussion.</p>
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-4">
        {commentTree.length > 0 ? (
          commentTree.map((comment, idx) => (
            <CommentCard 
              key={comment._id || idx} 
              comment={comment} 
              currentUser={currentUser}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-[#FFFFFF] rounded-[2rem] border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-[#F8FAFC] rounded-full flex items-center justify-center text-[#64748B] mb-6">
               <FaCommentDots className="text-3xl" />
            </div>
            <h3 className="text-2xl font-black text-[#1E293B] mb-3">No Comments Yet</h3>
            <p className="text-[#64748B] text-lg font-medium max-w-md">Be the first to share your thoughts and start the discussion!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForumCommentsSection;
