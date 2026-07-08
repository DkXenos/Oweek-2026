import "./navbar.css";
import Button from "./button";

export default function Navbar(){
    return (
        <>
            <div className="navbar">
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
                <div className="buttons">
                    <Button />
                </div>
            </div>
        </>
    );
}