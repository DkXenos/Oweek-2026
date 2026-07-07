import "./button.css";

export default function Button() {
  return (
    <>
      <button>
        <div className="container">
          <img
            src="/assets/template/button-decor.png"
            alt=""
            className="button-img"
          />
          <div className="relatice z-[-1] px-2 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] h-[2rem] w-full rounded-full">
            <div className="inset-0 bg-[#ff9a00] opacity-50 rounded-[inherit] pointer-events-none"></div>
            <span className="text-md font-bold text-gray-200 drop-shadow-md">
              ABOUT
            </span>
          </div>
        </div>
      </button>
    </>
  );
}
