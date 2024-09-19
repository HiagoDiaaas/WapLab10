import React from 'react';
import avatar from '../images/bozai.png';

interface User {
  uid: string;
  avatar: string;
  uname: string;
}

interface Comment {
  rpid: number;
  user: User;
  content: string;
  ctime: string;
  like: number;
}

interface CommentItemProps {
  user: User; // Current logged-in user
  comment: Comment; // Comment to render
  onDelete: (rpid: number, uid: string) => void; // Function to handle comment deletion
}

const CommentItem: React.FC<CommentItemProps> = ({ user, comment, onDelete }) => {
  return (
    <div className="reply-item">
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img
            className="bili-avatar-img"
            src={comment.user.avatar || avatar} // If no avatar, use the default one
            alt="Profile"
          />
        </div>
      </div>
      <div className="content-wrap">
        {/* Username */}
        <div className="user-info">
          <div className="user-name">{comment.user.uname}</div>
        </div>
        {/* Comment content */}
        <div className="root-reply">
          <span className="reply-content">{comment.content}</span>
          <div className="reply-info">
            <span className="reply-time">{comment.ctime}</span>
            <span className="reply-time">Like: {comment.like}</span>
            {/* Delete button (only shown for the logged-in user's comments) */}
            {comment.user.uid === user.uid && (
              <span
                className="delete-btn"
                onClick={() => onDelete(comment.rpid, comment.user.uid)}
                style={{ cursor: 'pointer', color: 'red' }}
              >
                Delete
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
