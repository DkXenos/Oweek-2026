import "./button.css";
import Link from 'next/link'

export default function Button() {
  return (
    <>
      <Link href="/">
        <button>
          <div className="container">
            <img 
              src="/assets/template/button-decor.png" 
              alt="" 
              className="button-img"
            />
            <div className="button-box">
              <span>HOME</span>
            </div>
          </div>
        </button>
      </Link>
      
      <Link href="/about">
        <button>
          <div className="container">
            <img 
              src="/assets/template/button-decor.png" 
              alt="" 
              className="button-img"
            />
            <div className="button-box">
              <span>ABOUT</span>
            </div>
          </div>
        </button>
      </Link>

      <Link href="/schedule">
        <button>
          <div className="container">
            <img 
              src="/assets/template/button-decor.png" 
              alt="" 
              className="button-img"
            />
            <div className="button-box">
              <span>SCHEDULE</span>
            </div>
          </div>
        </button>
      </Link>

      <Link href="/rules">
        <button>
          <div className="container">
            <img 
              src="/assets/template/button-decor.png" 
              alt="" 
              className="button-img"
            />
            <div className="button-box">
              <span>RULES</span>
            </div>
          </div>
        </button>
      </Link>
    </>
  );
}
