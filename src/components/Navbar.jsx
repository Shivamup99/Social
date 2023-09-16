import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {TbSocial} from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import {BsMoon, BsSunFill} from 'react-icons/bs'
import { SetTheme } from '../redux/slices/theme'
import { Logout } from '../redux/slices/userSlice'
const Navbar = () => {
    const {theme} = useSelector(state=> state.theme)
    const {user} = useSelector(state=> state.user)
    const dispatch = useDispatch();
    const {register, handleSubmit,formState:{errors}} = useForm();
    const handleSearch = async(data)=>{};
    const handleTheme = ()=>{
        const themeValue = theme ==="light"?"dark":"light";
        dispatch(SetTheme(themeValue))
    };
  return (
    <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary">
      <Link to="/" className="flex gap-2 items-center">
        <div className="p-1 md:p-2 bg-[#065ad2] rounded text-white">
          <TbSocial />
        </div>
        <span className="text-xl md:text-2xl text-[#065ad8] font-semibold">
          SHAREFORFUN
        </span>
      </Link>

      <form
        onSubmit={handleSubmit(handleSearch)}
        className="hidden md:flex items-center  justify-center"
      >
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[18rem] lg:w-[36rem]"
            required
            register={register("search")}
            placeholder="Search...."
          />
          <button
            type="submit"
            className="text-white bg-[#0444a4] absolute right-2.5 bottom-2.5  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <button onClick={() => handleTheme()}>
          {theme ? <BsMoon /> : <BsSunFill />}
        </button>
      </div>
      <div>
        <button
          onClick={() => dispatch(Logout)}
          className="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar