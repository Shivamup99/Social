import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import  ProfileCard  from "../components/ProfileCard";
import FriendsCard from '../components/FriendsCard';
import { friends, posts, requests, suggest } from "../constant";
import { Link } from 'react-router-dom';
import { BsFiletypeGif, BsPersonFillAdd } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import {BiImages, BiVideoPlus} from 'react-icons/bi'
import PostsCard from '../components/PostsCard';
function Dashboard() {
  const {user} = useSelector(state=>state.user)
  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  const {register, handleSubmit, formState:{errors}} = useForm();
    const [errMsg, setErrMsg] = useState("");
  const handlePostSubmit = async()=>{}
  const [file, setFile] = useState(null)
  const [posting, setPosting] = useState(false)
  return (
    <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
      <Navbar />

      <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
        {/* left */}
        <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
          <ProfileCard user={user} />
          <FriendsCard friends={user?.friends} />
        </div>
        <div className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto">
          <form
            onSubmit={handleSubmit(handlePostSubmit)}
            className="bg-primary px-4 rounded-lg"
          >
            <div className="flex w-full items-center gap-2 py-4 border-b border-[#666666645]">
              <img
                src={user?.profileUrl}
                alt="iowoo"
                className="w-14 h-14 rounded-full object-cover"
              />
              <input
                type="text"
                className="w-full rounded-full py-5"
                placeholder="What's on your mind..."
                name="description"
                register={register("description", {
                  required: "Write somthing about post",
                })}
                error={errors.description ? errors.description.message : ""}
              />
            </div>
            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status === "failed"
                    ? "text-[#f64949]"
                    : "text-[#2ba150]"
                }`}
              >
                {errMsg?.message}
              </span>
            )}
            <div className="flex items-center justify-between  py-4">
              <label
                htmlFor="imgUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  id="imgUpload"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".jpg, .png, .jpeg"
                />
                <BiImages />
                <span>Images</span>
              </label>

              <label
                htmlFor="videoUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  id="videoUpload"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".mp4, .wav"
                />
                <BiVideoPlus />
                <span>Video</span>
              </label>

              <label
                htmlFor="vgifUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  id="vgifUpload"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".gif"
                />
                <BsFiletypeGif />
                <span>Gif</span>
              </label>
              <div>
                {posting ? ( <span>loading...</span>):(
                  <button type='submit' className='bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm'>Post</button>
                )}
              </div>
            </div>
          </form>
          {posts?.length>0?(
              posts?.map((post)=>(
                <PostsCard key={post._id} post={post} user={user} deletePost={()=>{}} likePost={()=>{}}/>
              ))
          ):(
             <div className="flex w-full h-full items-center justify-center">
              <p className="text-lg text-ascent-2">No Post Available</p>
             </div>
          )}
        </div>

        <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
          <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
            <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#666666645]">
              <span>Friend Request</span>
              <span>{friendRequest?.length}</span>
            </div>
            <div className="w-full flex flex-col gap-4 pt-4">
              {friendRequest?.map(({ _id, requestFrom: from }) => (
                <div key={_id} className="flex items-center justify-between">
                  <Link
                    to={`/profile/${from._id}`}
                    className="w-full flex gap-4 items-center cursor-pointer"
                  >
                    <img
                      src={from?.profileUrl}
                      alt="aaaaaa"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium text-ascent-1">
                        {from?.firstName} {from?.lastName}
                      </p>
                    </div>
                  </Link>
                  <div className="flex gap-1">
                    <button className="bg-[#0444a4] text-xs text-white px-2 py-1 rounded-full">
                      Accept
                    </button>
                    <button className="bg-[#666] text-xs text-white px-2 py-1 rounded-full">
                      Deny
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
            <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
              <span>Friend Suggestion</span>
            </div>
            <div className="w-full flex flex-col gap-4 pt-4">
              {suggestedFriends?.map((sug) => (
                <div
                  key={sug?._id}
                  className="flex items-center justify-between"
                >
                  <Link
                    to={`/profile/${sug?._id}`}
                    className="w-full flex gap-4 items-center cursor-pointer"
                  >
                    <img
                      src={sug?.profileUrl}
                      alt="aaaaaa"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium text-ascent-1">
                        {sug?.firstName} {sug?.lastName}
                      </p>
                    </div>
                  </Link>
                  <div className="flex gap-1">
                    <button
                      className="bg-[#0444a430] text-xs text-white px-2 py-1 rounded-full"
                      onClick={() => {}}
                    >
                      <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard