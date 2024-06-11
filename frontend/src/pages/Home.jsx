import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "flowbite-react";

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col gap-5 items-center justify-center'>
      <h1 className='text-2xl font-bold'>Hello</h1>
      <div className='flex gap-3'>
        <Link to={"/login"}><Button gradientDuoTone="purpleToBlue">Login</Button></Link>
        <Link to={"/signUp"}><Button gradientDuoTone="purpleToBlue">Sign Up</Button></Link>
      </div>
    </div>
  )
}

export default Home