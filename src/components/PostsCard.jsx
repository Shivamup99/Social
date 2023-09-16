import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import {MdOutlineDeleteOutline} from 'react-icons/md'
import CommentForm from './CommentForm';
import { postComments, posts } from '../constant';
import { BiComment, BiLike, BiSolidLike } from 'react-icons/bi';
const PostsCard = ({post, user, deletePost, likePost}) => {
    const [showAll, setShowAll] = useState(0)
    const [showReplay, setShowReplay] = useState(0);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [replayComments, setReplayComments] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const getComments = async()=>{
        setReplayComments(0);
        setComments(postComments)
        setLoading(false);
    }
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
          <img src={post?.image} alt="ddd" className="w-full mt-2 rounded-lg" />
        )}
      </div>
      <div className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-2 text-base border-t border-[#666666645]">
        <p className=" flex gap-2 items-center text-base cursor-pointer">
          {post?.likes?.includes(user?._id) ? (
            <BiSolidLike size={20} color="blue" />
          ) : (
            <BiLike size={20} />
          )}
          {post?.likes?.length} Likes
        </p>
        <p
          className=" flex gap-2 items-center text-base cursor-pointer"
          onClick={() => {
            setShowComments(showComments === post?._id ? null : post._id);
            getComments(post?._id);
          }}
        >
          <BiComment size={20} />
          {post?.comments?.length} Comments
        </p>
        {user?._id === post?.userId?._id && (
          <div
            onClick={() => deletePost(post?._id)}
            className="flex gap-1 items-center text-base cursor-pointer text-ascent-1"
          >
            <MdOutlineDeleteOutline size={20} />
            <span>Delete</span>
          </div>
        )}
      </div>

      {/* comments section */}

      {showComments === post?._id && (
        <div className="w-full mt-4 border-t border-[#666666] pt-4">
          <CommentForm
            user={user}
            id={post._id}
            replyAt={replayComments}
            getComments={() => getComments(post?._id)}
          />
          {loading ? (
            <span>loading....</span>
          ) : comments?.length > 0 ? (
            comments?.map((comment) => (
              <div className="w-full py-2" key={comment?._id}>
                <div className="flex gap-3 items-center mb-1">
                  <Link to={"/profile/" + comment?.userId?._id}>
                    <img
                      src={comment?.userId?.profileUrl}
                      alt="dssa"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                  <div>
                    <Link to={"/profile/" + comment?.userId?._id}>
                      <p className="font-medium text-base text-ascent-1">
                        {comment?.userId.firstName} {comment?.userId?.lastName}{" "}
                      </p>
                    </Link>
                    <span className="text-sm text-ascent-2">
                      {moment(comment?.createdAt ?? "2023-07-24").format()}
                    </span>
                  </div>
                </div>
                <div className="ml-12">
                  <p className="text-ascent-2">{comment?.comment}</p>
                  <div className="mt-2 flex gap-6">
                    <p className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer'>
                      {comment?.likes?.includes(user?._id) ? (
                        <BiSolidLike size={20} color="blue" />
                      ) : (
                        <BiLike size={20} />
                      )}
                      {comment?.likes?.length} Likes
                    </p>
                    <span onClick={()=> setReplayComments(comment?._id)} className='text-blue cursor-pointer'>
                        Reply
                    </span>
                  </div>
                    {replayComments === comment?._id && (
                        <CommentForm user={user} id={comment?._id} replyAt={comment.from} getComments={()=> getComments(post?._id)}/>
                    )}

                </div>
                <div className="py-2 px-8 mt-6">
                    {comment?.replies?.length > 0 && (
                        <p className='text-base text-ascent-1 cursor-pointer'
                         onClick={()=> setShowReplay( showReplay === comment?.replies?._id? 0 : comment?.replies?._id)}
                        >
                            Show Replies ({comment?.replies?.length})
                        </p>
                    )}
                </div>
              </div>
            ))
          ) : (
            <span className="flex text-sm py-4 text-ascent-2 text-center">
              No comments, Give first compliment about post
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default PostsCard