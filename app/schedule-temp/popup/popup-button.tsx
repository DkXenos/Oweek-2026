import "./popup-button.css";

type PopupTab = "keterangan" | "penugasan" | "ketentuan";

interface ScheduleButtonProps {
  selectedTab: PopupTab;
  onSelectTab: (tab: PopupTab) => void;
}

export default function ScheduleButton({ selectedTab, onSelectTab }: ScheduleButtonProps) {
  return (
    <>
      <button type="button" onClick={() => onSelectTab("keterangan")}> 
        <div className="container">
          <div className={`schedule-button-box ${selectedTab === "keterangan" ? "active" : ""}`}>
            <span>KETERANGAN</span>
          </div>
        </div>
      </button>

      <button type="button" onClick={() => onSelectTab("penugasan")}> 
        <div className="container">
          <div className={`schedule-button-box ${selectedTab === "penugasan" ? "active" : ""}`}>
            <span>PENUGASAN</span>
          </div>
        </div>
      </button>

      <button type="button" onClick={() => onSelectTab("ketentuan")}> 
        <div className="container">
          <div className={`schedule-button-box ${selectedTab === "ketentuan" ? "active" : ""}`}>
            <span>KETENTUAN</span>
          </div>
        </div>
      </button>
    </>
  );
}


