"use client";

import "./navbar.css";
import { useState } from "react";
import Button from "./button";

export default function Navbar(){
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={`navbar${open ? " open" : ""}`}>
                <img
                    src="/assets/template/bottom-decor.svg"
                    alt=""
                    className="decoration"
                    id="bottom-decor1"
                />
                <img
                    src="/assets/template/top-decor.svg"
                    alt=""
                    className="decoration"
                    id="top-decor1"
                />
                <img
                    src="/assets/template/bottom-decor.svg"
                    alt=""
                    className="decoration"
                    id="bottom-decor2"
                />
                <img
                    src="/assets/template/top-decor.svg"
                    alt=""
                    className="decoration"
                    id="top-decor2"
                />
                <div className="logo">
                    <img
                        src="/assets/navbar/uc-logo.png"
                        alt="Logo Universitas"
                        className="logo-universitas"
                    />
                    <img
                        src="/assets/navbar/magnify-new.png"
                        alt="Logo Magnify"
                        className="logo-magnify"
                    />
                </div>
                <button
                    type="button"
                    className={`navbar-toggle${open ? " open" : ""}`}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div
                    className={`buttons${open ? " open" : ""}`}
                    onClick={() => setOpen(false)}
                >
                    <Button />
                </div>
                <img
                    src="/assets/navbar/nav-kiri.png"
                    alt=""
                    className="decor-kiri"
                />
                <img
                    src="/assets/navbar/nav-kanan.png"
                    alt=""
                    className="decor-kanan"
                />
            </div>
            {open && (
                <div
                    className="navbar-backdrop"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
}
