import React, { useState } from 'react'
import { Input } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Button } from "flowbite-react";
import { instance } from '../config/axios.js'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const SignUp = () => {

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [register, setRegister] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    //funtion to sign user
    const handleSignUp = async () => {
        try {
            const registerResponce = await instance.post('/register', register)
            const data = registerResponce.data
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
            if (data.message === 'Registered Successfully!') {
                Toast.fire({
                    icon: "success",
                    title: `${data.message}`
                });
                setRegister({
                    name: '',
                    email: '',
                    password: ''
                })
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            } else {
                Toast.fire({
                    icon: 'error',
                    title: `${data.message}`
                })
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='min-h-screen gap-5 flex flex-col items-center justify-center m-5'>
            <a className='underline font-semibold absolute top-10 right-20' href="/">Home</a>
            <div className='border lg:w-1/3 w-full flex flex-col gap-5 items-center justify-center rounded-3xl py-10'>
                <div>
                    <h1 className='text-2xl font-bold'>Create your account here.</h1>
                    <p>Enter your details below.</p>
                </div>
                <Input
                    isClearable
                    type="name"
                    label="Name"
                    value={register.name}
                    variant="bordered"
                    placeholder="Enter your name"
                    onClear={() => setRegister({...register, name:''})}
                    className="w-2/3"
                    onChange={(e) => setRegister({ ...register, name: e.target.value })}
                />
                <Input
                    isClearable
                    type="email"
                    label="Email"
                    value={register.email}
                    variant="bordered"
                    placeholder="Enter your email"
                    onClear={() => setRegister({...register, email:''})}
                    className="w-2/3"
                    onChange={(e) => setRegister({ ...register, email: e.target.value })}
                />
                <Input
                    label="Password"
                    value={register.password}
                    variant="bordered"
                    placeholder="Enter your password"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <FaEyeSlash className="text-lg" />
                            ) : (
                                <FaEye className="text-lg" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="w-2/3"
                    onChange={(e) => setRegister({ ...register, password: e.target.value })}
                />
                <Button onClick={handleSignUp} gradientDuoTone="purpleToBlue">Register</Button>
            </div>
            <p>Already have an account? &nbsp;<a className='underline font-semibold' href="/login">Login</a> </p>
        </div>
    )
}

export default SignUp