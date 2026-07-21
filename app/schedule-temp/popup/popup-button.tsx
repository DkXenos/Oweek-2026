import "./popup-button.css";

export default function ScheduleButton() {
  return (
    <>
        <button>
          <div className="container">
            <div className="schedule-button-box">
              <span>KETERANGAN</span>
            </div>
          </div>
        </button>
      
        <button>
          <div className="container">
            <div className="schedule-button-box">
              <span>PENUGASAN</span>
            </div>
          </div>
        </button>

        <button>
          <div className="container">
            <div className="schedule-button-box">
              <span>KETENTUAN</span>
            </div>
          </div>
        </button>
    </>
  );
}


