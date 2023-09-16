import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const CommentForm = ({user, id, getComments, replyAt}) => {
    console.log('sjsjs',id )
    const [loading, setLoading] = useState(false);
    const [ errMsg, setErrMsg] = useState("");
    const { register, handleSubmit, reset, formState:{errors}} = useForm({mode:"onChange"})
    const onSubmit = async(data)=>{

    }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full border-b border-[#666666]"
      >
        <div className="w-full flex items-center gap-2 py-2">
          <img
            src={user?.profileUrl}
            alt="sh"
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            name="comment"
            className="w-full rounded-full py-3"
            placeholder={replyAt ? `Reply at ${replyAt}` : " Comment this post"}
            register={register("comment", {
              required: "Comment can not be blank",
            })}
            error={errors.comment ? errors.comment.message : ""}
          />
        </div>
        {errMsg?.message && (
          <span
            className={`text-sm ${
              errMsg?.status === "failed" ? "text-[#f64949]" : "text-[#2ba150]"
            }`}
          >
            {errMsg?.message}
          </span>
        )}
        <div className='flex items-end justify-end pb-2'>
          {loading ? (
            <span>loading...</span>
          ) : (
            <button
              type="submit"
              className="bg-[#0444a4] text-white py-2 px-6 rounded-full font-semibold text-sm"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CommentForm