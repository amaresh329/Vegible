import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SellerRegister() {
    const navigate = useNavigate()
    const [sellerData, setSellerData] = useState({
        userName: "",
        shopName: "",
        shopAddress: "",
        number: "",
        password: ""
    })
    const handleData = (e) => {
        setSellerData({ ...sellerData, [e.target.name]: e.target.value })
    }

    const AddSeller = async (e) => {
        e.preventDefault()
        const { userName, shopName, shopAddress, number, password } = sellerData

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName, shopName, shopAddress, number, password
            })
        })

        await res.json();
        if (res.status === 400) {
            toast.warn("Shop Already Present", {
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
            navigate("/sellerlogin")
        }
    }
    return (
        <>
            <Navbar />
            <section className='login'>
                <div className="form-box1">
                    <div className="form-value">
                        <form method="post">
                            <h2>Become a Seller</h2>
                            <div className="inputbox">
                                <label htmlFor="">UserName</label>
                                <input type="text" name="userName" autoComplete='off' onChange={handleData} />
                            </div>
                            <div className="inputbox">
                                <label htmlFor="">Shop Name</label>
                                <input type="text" name="shopName" autoComplete='off' onChange={handleData} />
                            </div>
                            <div className="inputbox">
                                <label htmlFor="">Shop Address</label>
                                <input type="text" name="shopAddress" autoComplete='off' onChange={handleData} />
                            </div>
                            <div className="inputbox">
                                <label htmlFor="">Ph. Number</label>
                                <input type="number" name="number" autoComplete='off' onChange={handleData} />
                            </div>
                            <div className="inputbox">
                                <label htmlFor="">Password</label>
                                <input type="password" name="password" autoComplete='off' onChange={handleData} />
                            </div>
                            <button onClick={AddSeller}>Submit</button>
                            <div className="register">
                                <p>Already have an account ?
                                    <a onClick={() => navigate("/sellerlogin")}>Log in</a>
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
        </>
    )
}
