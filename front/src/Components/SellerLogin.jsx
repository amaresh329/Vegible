import React, { useState } from 'react';
import "./seller.css";
import { useNavigate } from "react-router-dom"
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SellerLogin() {
    const navigate = useNavigate()
    const [sellerData, setSellerData] = useState({
        shopName: "",
        password: ""
    })
    const handleData = (e) => {
        setSellerData({ ...sellerData, [e.target.name]: e.target.value })
    }

    const LoginSeller = async (e) => {
        e.preventDefault()
        const { shopName, password } = sellerData

        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                shopName, password
            })
        })

        await res.json();
        if (res.status === 400) {
            toast.error('Invalid Credentials', {
                position: "top-center",
                autoClose: 13,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        }
        else if (res.status === 422) {
            toast.warn('Fill The Form', {
                position: "top-center",
                autoClose: 13,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast.success('Success', {
                position: "top-center",
                autoClose: 13,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
            navigate("/sellerhome")
        }
    }
    return (
        <html>
        <Navbar/>
            <section className='login'>
                <div className="form-box">
                    <div className="form-value">
                        <form method="post">
                            <h2>Login</h2>
                            <div className="inputbox">
                                <label htmlFor="">Seller Shop Name</label>
                                <input type="text" name="shopName" onChange={handleData} />
                            </div>
                            <div className="inputbox">
                                <label htmlFor="">Password</label>
                                <input type="password" name="password" onChange={handleData} />
                            </div>
                            <button onClick={LoginSeller}>Submit</button>
                            <div className="register">
                                <p>Don't have an account yet?
                                    <a onClick={() => navigate("/sellerregister")}>Register</a>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
            <ToastContainer
                position="top-center"
                autoClose={13}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="dark"
            />
        </html>
    )
}
