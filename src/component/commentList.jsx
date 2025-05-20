import React, { useEffect, useState } from 'react';
import { getCommentsByProject } from '../api/api';
import CommentItem from './comment';

const CommentList = ({ projectId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await getCommentsByProject(projectId);
        setComments(data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) loadComments();
  }, [projectId]);

  if (loading) return <p>Loading comments...</p>;
  if (comments.length === 0) return <p>No comments for this project.</p>;

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <CommentItem key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;