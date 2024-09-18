import './App.scss';
import avatar from './images/bozai.png';
import { useState, useEffect } from 'react';
import _ from 'lodash'; 

// Define the types for comments
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

// current logged in user info
const user: User = {
  uid: '30009257',
  avatar,
  uname: 'John',
};

// Nav Tab
const tabs = [
  { type: 'hot', text: 'Top' },
  { type: 'newest', text: 'Newest' },
];

const App = () => {
  // Set defaultList as state to handle changes
  const [comments, setComments] = useState<Comment[]>([
    {
      rpid: 3,
      user: {
        uid: '13258165',
        avatar: '',
        uname: 'Jay Zhou',
      },
      content: 'Nice, well done',
      ctime: '10-18 08:15',
      like: 88,
    },
    {
      rpid: 2,
      user: {
        uid: '36080105',
        avatar: '',
        uname: 'Song Xu',
      },
      content: 'I search for you thousands of times, from dawn till dusk.',
      ctime: '11-13 11:29',
      like: 88,
    },
    {
      rpid: 1,
      user: {
        uid: '30009257',
        avatar,
        uname: 'John',
      },
      content: 'I told my computer I needed a break... now it will not stop sending me vacation ads.',
      ctime: '10-19 09:00',
      like: 66,
    },
  ]);

  // Handle delete comment
  const handleDelete = (rpid: number, uid: string): void => {
    // Check if the comment belongs to the current logged-in user
    if (uid === user.uid) {
      setComments((prevComments) => prevComments.filter((comment) => comment.rpid !== rpid));
    } else {
      alert('You can only delete your own comments!');
    }
  };

  // Active tab state
  const [activeTab, setActiveTab] = useState<string>('hot');
  const [sortedComments, setSortedComments] = useState<Comment[]>(comments);

  // Sorting logic using lodash
  useEffect(() => {
    if (activeTab === 'hot') {
      // Sort by likes in descending order when 'Top' is active
      setSortedComments(_.orderBy(comments, ['like'], ['desc']));
    } else if (activeTab === 'newest') {
      // Sort by date in descending order when 'Newest' is active
      setSortedComments(_.orderBy(comments, ['ctime'], ['desc']));
    }
  }, [activeTab, comments]);

  // Handle tab click
  const handleTabClick = (tabType: string) => {
    setActiveTab(tabType);
  };

  // State for new comment input
  const [newComment, setNewComment] = useState<string>('');

  // Handle new comment submission
  const handlePostComment = () => {
    if (newComment.trim() === '') {
      alert('Please enter a comment.');
      return;
    }

    // Find the maximum rpid in the current comments and increment it for the new comment
    const maxRpid = comments.length > 0 ? Math.max(...comments.map((c) => c.rpid)) : 0;

    // Create a new comment object
    const newCommentObj: Comment = {
      rpid: maxRpid + 1, // Generate a new rpid
      user: user,
      content: newComment,
      ctime: new Date().toLocaleString(),
      like: 0,
    };

    // Add the new comment to the comments state
    const updatedComments = [newCommentObj, ...comments];
    setComments(updatedComments);

    // Clear the textarea
    setNewComment('');

    // Re-sort the comments after adding the new one
    if (activeTab === 'hot') {
      setSortedComments(_.orderBy(updatedComments, ['like'], ['desc']));
    } else {
      setSortedComments(_.orderBy(updatedComments, ['ctime'], ['desc']));
    }
  };

  return (
    <div className="app">
      {/* Nav Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            <span className="total-reply">{sortedComments.length}</span>
          </li>
          <li className="nav-sort">
            {/* Rendering tabs and adding active class based on activeTab state */}
            {tabs.map((tab) => (
              <span
                key={tab.type}
                className={`nav-item ${activeTab === tab.type ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.type)}
                style={{ cursor: 'pointer' }}
              >
                {tab.text}
              </span>
            ))}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* comments */}
        <div className="box-normal">
          {/* current logged in user profile */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={user.avatar} alt="Profile" />
            </div>
          </div>
          <div className="reply-box-wrap">
            <textarea
              className="reply-box-textarea"
              placeholder="Tell something..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="reply-box-send">
              <div
                className="send-text"
                onClick={handlePostComment}
                style={{ cursor: 'pointer' }}
              >
                Post
              </div>
            </div>
          </div>
        </div>

        {/* comment list */}
        <div className="reply-list">
          {sortedComments.map((comment) => (
            <div key={comment.rpid} className="reply-item">
              <div className="root-reply-avatar">
                <div className="bili-avatar">
                  <img
                    className="bili-avatar-img"
                    src={comment.user.avatar || avatar}
                    alt="Profile"
                  />
                </div>
              </div>

              <div className="content-wrap">
                {/* username */}
                <div className="user-info">
                  <div className="user-name">{comment.user.uname}</div>
                </div>
                {/* comment content */}
                <div className="root-reply">
                  <span className="reply-content">{comment.content}</span>
                  <div className="reply-info">
                    {/* comment created time */}
                    <span className="reply-time">{comment.ctime}</span>
                    {/* total likes */}
                    <span className="reply-time">Like: {comment.like}</span>
                    <span
                      className="delete-btn"
                      onClick={() => handleDelete(comment.rpid, comment.user.uid)}
                      style={{ cursor: 'pointer', color: 'red' }}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
