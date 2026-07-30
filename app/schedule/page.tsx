import { getScheduleData } from "../../lib/schedule-data";
import "./style.css";
import Banner from "./banner"

// Prerendered, not re-rendered per request. Admin edits stay visible because
// the save action calls revalidatePath("/schedule"), which rebuilds this page
// on demand. On deployed hosts the filesystem is read-only anyway, so the JSON
// only ever changes at deploy time.

export default async function Schedule(){
    const scheduleData = await getScheduleData();
    return(
        <>
            <div className="background">
                {/* layer background (0)---------------------------------------------------------------------------------------------------- */}
                <div className="layer layer-0">
                    <img 
                        src="/assets/homepage/clouds-background.webp" 
                        alt="" 
                        className="clouds-background"
                    />
                </div>

                {/* layer firework (1)---------------------------------------------------------------------------------------------------- */}
                <div className="layer layer-1">
                    <img 
                        src="/assets/schedule/firework-left.png" 
                        alt="" 
                        className="firework-left"
                    />
                    <img 
                        src="/assets/schedule/firework-right.png" 
                        alt="" 
                        className="firework-right"
                    />
                </div>

                {/* layer tree (2)---------------------------------------------------------------------------------------------------- */}
                <div className="layer layer-2">
                    <img 
                        src="/assets/schedule/tree.png" 
                        alt="" 
                        className="tree-left"
                    />
                    <img 
                        src="/assets/schedule/tree.png" 
                        alt="" 
                        className="tree-right"
                    />
                </div>

                {/* layer pillar (3)---------------------------------------------------------------------------------------------------- */}
                <div className="layer layer-3">
                    <img 
                        src="/assets/homepage/border-left.webp" 
                        alt="" 
                        className="pillar-left"
                    />
                    <img 
                        src="/assets/homepage/border-right.webp" 
                        alt="" 
                        className="pillar-right"
                    />
                </div>

                {/* layer circle (4)---------------------------------------------------------------------------------------------------- */}
                 <div className="layer layer-4">
                    <img 
                        src="/assets/homepage/sun-asset.webp" 
                        alt="" 
                        className="schedule-banner"
                    />
                </div>
                
                {/* layer ferris wheel(5)---------------------------------------------------------------------------------------------------- */}
                <div className="layer layer-5">
                    <img 
                        src="/assets/homepage/home-castle-center.webp" 
                        alt="" 
                        className="castle-center"
                    />
                </div>

                {/* layer schedule and banner(6)---------------------------------------------------------------------------------------------------- */}
                <div className="layer layer-6">
                    <div className="schedule-text">
                        <img 
                            src="/assets/schedule/schedule-banner.png" 
                            alt="" 
                            className="schedule-banner"
                        />
                    </div>
                    
                    <Banner data={scheduleData} />
                </div>

                {/* layer cup (8)---------------------------------------------------------------------------------------------------- */}
                <div className="layer layer-8">
                    <img 
                        src="/assets/schedule/cup-left.png" 
                        alt="" 
                        className="cup-left"
                    />
                    <img 
                        src="/assets/schedule/cup-right.png" 
                        alt="" 
                        className="cup-right"
                    />
                </div>
            </div> 
        </>
    )
}