import React from 'react'
import { Link } from 'react-router-dom'

const FriendsCard = ({friends}) => {
  return (
    <div>
      <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
        <div className="flex items-center justify-between text-ascent-1 pb-2 border-b border-[#66666645]">
          <span>Friends</span>
          <span>{friends?.length}</span>
        </div>
        <div className="w-full flex gap-4 flex-col pt-4">
          {friends?.map((f) => (
            <Link
              to={`/profile/${f?._id}`}
              key={f?._id}
              className="w-full flex gap-4 items-center cursor-pointer"
            >
              <img
                src={f?.profileUrl}
                alt="ssqq"
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1">
                <p className="text-base font-medium text-ascent-1">
                  {f?.firstName} {f?.lastName}
                </p>
                <span className="text-sm text-ascent-2">
                  {f?.profession ?? "No Profession"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FriendsCard