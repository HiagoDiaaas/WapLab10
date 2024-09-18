import './App.scss';
import avatar from './images/bozai.png';
import { useState, useEffect } from 'react';
import _ from 'lodash'; 

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
  // Initialize comments state
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

  const [newComment, setNewComment] = useState<string>(''); 
  const [activeTab, setActiveTab] = useState<string>('hot'); 
  const [sortedComments, setSortedComments] = useState<Comment[]>([]); 


  useEffect(() => {
    console.log('Active tab:', activeTab);
    console.log('Comments before sorting:', comments);

    if (activeTab === 'hot') {
      setSortedComments(_.orderBy(comments, ['like'], ['desc']));
    } else if (activeTab === 'newest') {
      setSortedComments(_.orderBy(comments, ['ctime'], ['desc']));
    }

    console.log('Sorted comments:', sortedComments);
  }, [comments, activeTab]);

  // Function to handle deletion of a comment
  const handleDelete = (rpid: number, uid: string): void => {
    if (uid === user.uid) {
      console.log('Deleting comment with rpid:', rpid);
      setComments((prevComments) => prevComments.filter((comment) => comment.rpid !== rpid));
    } else {
      alert('You can only delete your own comments!');
    }
  };

  // Function to handle posting a new comment
  const handlePostComment = () => {
    console.log('Post button clicked');
    console.log('New comment content:', newComment);

    if (newComment.trim() === '') {
      alert('Please enter a comment.');
      return;
    }

    const newCommentObj: Comment = {
      rpid: comments.length > 0 ? Math.max(...comments.map((c) => c.rpid)) + 1 : 1,
      user: user,
      content: newComment,
      ctime: new Date().toLocaleString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      like: 0,
    };

    console.log('New comment object:', newCommentObj);

    // Ensure a re-render by immediately updating state
    setComments((prevComments) => {
      const updatedComments = [newCommentObj, ...prevComments];
      console.log('Updated comments after posting:', updatedComments);
      return updatedComments; 
    });

    setNewComment('');
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
            {tabs.map((tab) => (
              <span
                key={tab.type}
                className={`nav-item ${activeTab === tab.type ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.type)}
                style={{ cursor: 'pointer' }}
              >
                {tab.text}
              </span>
            ))}
          </li>
        </ul>
      </div>

      {/* Comment input section */}
      <div className="reply-wrap">
        <div className="box-normal">
          {/* Current logged-in user profile */}
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
              <button
                className="send-text"
                onClick={handlePostComment} 
                style={{ cursor: 'pointer' }}
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {/* Comment list */}
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
