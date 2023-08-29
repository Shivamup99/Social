import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import { posts } from '../constant';
const PostsCard = ({post, user, deletePost, likePost}) => {
    const [showAll, setShowAll] = useState(0)
    const [showReplay, setShowReplay] = useState(0);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [replayComments, setReplayComments] = useState(0);
    const [showComments, setShowComments] = useState(0);
  return (
    <div className="mb-2 bg-primary p-4 rounded-xl">
      <div className="flex gap-3 items-center mb-2">
        <Link to={`/profile/${post?.userId?._id}`}>
          <img
            src={post?.userId?.profileUrl}
            alt="jsjjsojojo"
            className="w-14 h-14 object-cover rounded-full"
          />
        </Link>
        <div className="flex w-full justify-between">
          <div className="">
            <Link to={`/profile/${post?.userId?._id}`}>
              <p className="font-semibold text-lg text-ascent-1">
                {post?.userId?.firstName} {post?.userId?.lastName}
              </p>
            </Link>
            <span className="text-ascent-2 text-sm">
              {post?.userId?.location}
            </span>
          </div>

          <span className="text-xs text-ascent-1">
            {moment(user?.createdAt ?? "2023-08-29").fromNow()}
          </span>
        </div>
      </div>
      <div>
        <p className="text-ascent-2">
          {showAll === post?._id
            ? post?.description
            : post?.description?.slice(0, 300)}
          {post?.description?.length > 301 &&
            (showAll === post?._id ? (
              <span
                className="text-blue ml-2 test-sm font-normal cursor-pointer"
                onClick={() => setShowAll(0)}
              >
                show less
              </span>
            ) : (
              <span
                className="text-blue ml-2 test-sm font-normal cursor-pointer"
                onClick={() => setShowAll(post?._id)}
              >
                show more
              </span>
            ))}
        </p>
        {post?.image && (
            <img src={post?.image} alt='ddd' className='w-full mt-2 rounded-lg'/>
        )}
      </div>
    </div>
  );
}

export default PostsCard