import React from 'react'
import { Button } from "flowbite-react";
import Swal from 'sweetalert2'

const LoggedIn = ({ name }) => {

  const handleLogout = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Logged Out"
    });
    setTimeout(() => {
      window.localStorage.clear()
      window.location.reload()
    }, 2000)
  }


  return (
    <div className='min-h-screen flex flex-col gap-5 items-center justify-center'>
      <h1 className='text-2xl font-bold'>Hello {name}</h1>
      <div className='flex gap-3'>
        <Button onClick={handleLogout} gradientDuoTone="purpleToBlue">Logout</Button>
      </div>
    </div>
  )
}

export default LoggedIn