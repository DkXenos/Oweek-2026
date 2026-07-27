import "./ketentuan_penugasan.css";
import { schedulePenugasan } from "../popup-data";

export default function Penugasan({ selectedImageId = "0" }: { selectedImageId?: string }){
    const selectedIndex = Math.max(0, Math.min(schedulePenugasan.length - 1, Number(selectedImageId || "0")));
    const day = schedulePenugasan[selectedIndex];
    
    console.log(selectedImageId);
    console.log(day)
    return(
        <>
            <div className="box-container">
                <h2 className="popup-title">{day.title}</h2>
                {Array.isArray(day.content) ? (
                    day.content?.map((content, id) => (
                        <div key={id} className="content-text-box">
                            <span className="popup-dot" />
                            <span className="content-text">{content}</span>
                        </div> 
                    ))
                ) : (
                    <div className="content-text-box">
                        <span className="popup-dot" />
                        <span className="content-text">{day.content}</span>
                    </div> 
                )}
            </div>
        </>
    )
}