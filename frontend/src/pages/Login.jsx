import React, { useState } from 'react'
import { Input } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Button } from "flowbite-react";
import { instance } from '../config/axios'
import Swal from 'sweetalert2'


const Login = () => {

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    // const navigate = useNavigate()

    //funtion to login
    const handleLogin = async () => {
        try {
            const loginResponse = await instance.post('/login', login)
            // console.log(loginResponse);
            const data = loginResponse.data
            // alert(data.message)
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
            if (data.message === 'Login Successful') {
                Toast.fire({
                    icon: "success",
                    title: `${data.message}`
                });
                // navigate("/")
                setTimeout(() => {
                    window.localStorage.setItem("name", data.user)
                    setLogin({
                        email: '',
                        password: ''
                    })
                    window.location.replace('/')
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
                <h1 className='text-2xl font-bold'>Welcome Back!</h1>
                <Input
                    isClearable
                    type="email"
                    label="Email"
                    value={login.email}
                    variant="bordered"
                    placeholder="Enter your email"
                    onClear={() => setLogin({ ...login, email: '' })}
                    className="w-2/3"
                    onChange={(e) => setLogin({ ...login, email: e.target.value })}
                />
                <Input
                    label="Password"
                    variant="bordered"
                    value={login.password}
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
                    onChange={(e) => setLogin({ ...login, password: e.target.value })}
                />
                <Button onClick={handleLogin} gradientDuoTone="purpleToBlue">Login</Button>
            </div>
            <p>Don't have an account? &nbsp;<a className='underline font-semibold' href="/signUp">Sign Up</a> </p>
        </div>
    )
}

export default Login