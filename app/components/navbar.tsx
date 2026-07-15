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
                        src="/assets/template/logo-universitas1.png"
                        alt="Logo Universitas"
                        className="logo-universitas"
                    />
                    <img
                        src="/assets/template/logo-magnify.svg"
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
            </div>
        </>
    );
}
