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
    <div className='topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary'>
        <Link to='/' className='flex gap-2 items-center'>
            <div className='p-1 md:p-2 bg-[#065ad2] rounded text-white'>
                <TbSocial/>
            </div>
            <span className='text-xl md:text-2xl text-[#065ad8] font-semibold'>SHAREFORFUN</span>
        </Link>

        <form onSubmit={handleSubmit(handleSearch)} className='hidden md:flex items-center  justify-center'>
            <input register={register("search")} type="text" re placeholder='Search....' className='w-[18rem] lg:w-[36rem] rounded-l-full py-3' />
             <button type='submit' className='bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full'>Search</button>
        </form>

        <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
            <button onClick={()=> handleTheme()}>{theme? <BsMoon/>:<BsSunFill/>}</button>
        </div>
        <div>
            <button onClick={()=>dispatch(Logout)} className='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full'>Logout</button>
        </div>
    </div>
  )
}

export default Navbar