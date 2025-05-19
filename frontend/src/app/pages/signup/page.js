"use client";
import React, { useState } from 'react';
import logo from "@/app/assets/log.png";
import Image from 'next/image';
import '../login/login.css';
import Link from 'next/link';

const Page = () => {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
        <section className='signupSec'>
            <div className="container py-3">
            <div className="row align-items-center">
                <div className="col-md-6 p-0">
                    <div className='login-welcome-content'>
                        <div className='login-welcome-image'>
                            <Image src={logo} alt="King Logo" />
                        </div>
                        <div className='login-welcome-text'>
                            <h1 className='text-light'>Welcome to Smart Part Export<span style={{ color: 'var(--blue)' }}></span></h1>
                            <p>Smart Parts Exports, is a leading exporter of Automotive Spare Parts from India .</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="auth-section">
                        <div className="auth-card">
                            <div className="text-center mb-3">
                                <h4 className='text-light'>Register Now</h4>
                                <p>Create an account to continue</p>
                            </div>

                            <form>
                                <input type="text" placeholder="Full Name" className="mb-3 login-input" />
                                <input type="email" placeholder="Email" className="login-input mb-3" />
                                <div className="password-input mb-3 position-relative">
                                    <input
                                        type={showPassword.password ? 'text' : 'password'}
                                        placeholder="Password"
                                        className="login-input w-100"
                                    />
                                    <p
                                        className="show-password-btn position-absolute"
                                        style={{ top: '50%', right: '15px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                        onClick={() => togglePasswordVisibility('password')}
                                    >
                                        {showPassword.password ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                                    </p>
                                </div>
                                <div className="password-input mb-3 position-relative">
                                    <input
                                        type={showPassword.confirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                        className="login-input w-100"
                                    />
                                    <p
                                        className="show-password-btn position-absolute"
                                        style={{ top: '50%', right: '15px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                    >
                                        {showPassword.confirmPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                                    </p>
                                </div>

                                <button className="login-btn w-100 mb-3">Get Started</button>

                                <p className="text-center">
                                    Already have an account? <Link href="/pages/login" className="text-primary">Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
};

export default Page;
