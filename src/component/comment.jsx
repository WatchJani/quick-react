const CommentItem = ({ comment }) => {
    return (
        <div>
            <p>{comment.content}</p>
            <div>
                User ID: {comment.user_id} | {new Date(comment.created_at).toLocaleString()}
            </div>
        </div>
    );
};

export default CommentItem;