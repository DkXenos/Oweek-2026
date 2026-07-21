import HeroSection from "./components/hero-section";
import Mascots from "./components/mascots";
import "./styles.css";

export default function About() {
  return (
    <div className="about-container">
      {/* one continuous gradient + pattern overlay spans both sections */}
      <div className="about-gradient-bg" />
      <img
        src="/assets/about/bg-overlay.png"
        alt=""
        className="about-bg-overlay"
      />

      <HeroSection />
      <Mascots />
    </div>
  );
}
