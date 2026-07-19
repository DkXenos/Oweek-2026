import ScheduleTemp from "../../components/temp-schedule";
import "./style.css";
import Banner from "./banner"

export default function Schedule(){
    

    return(
        <>
            <div className="background">
                {/* layer background (0)---------------------------------------------------------------------------------------------------- */}
                <div className="layer layer-0">
                    <img 
                        src="/assets/homepage/clouds-background.png" 
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
                        src="/assets/homepage/border-left.png" 
                        alt="" 
                        className="pillar-left"
                    />
                    <img 
                        src="/assets/homepage/border-right.png" 
                        alt="" 
                        className="pillar-right"
                    />
                </div>

                {/* layer circle (4)---------------------------------------------------------------------------------------------------- */}
                 <div className="layer layer-4">
                    <img 
                        src="/assets/homepage/circle-background.png" 
                        alt="" 
                        className="schedule-banner"
                    />
                </div>
                
                {/* layer ferris wheel(5)---------------------------------------------------------------------------------------------------- */}
                <div className="layer layer-5">
                    <img 
                        src="/assets/homepage/home-castle-center.png" 
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
                    <Banner />
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