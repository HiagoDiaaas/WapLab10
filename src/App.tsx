import './App.scss';
import avatar from './images/bozai.png';

// Comment List data
const defaultList = [
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
];

// current logged in user info
const user = {
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
  return (
    <div className="app">
      {/* Nav Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            <span className="total-reply">{defaultList.length}</span>
          </li>
          <li className="nav-sort">
            <span className="nav-item">Top</span>
            <span className="nav-item">Newest</span>
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
              placeholder="tell something..."
            />
            <div className="reply-box-send">
              <div className="send-text">Post</div>
            </div>
          </div>
        </div>

        {/* comment list */}
        <div className="reply-list">
          {defaultList.map((comment) => (
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
                    <span className="delete-btn">Delete</span>
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
