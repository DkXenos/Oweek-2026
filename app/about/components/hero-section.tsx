import "./hero-section.css";

export default function HeroSection() {
  return (
    <section className="about-hero-container">
      <img
        src="/assets/about/fireworks.png"
        alt=""
        className="hero-fireworks"
      />

      <img
        src="/assets/about/pillar-left-top.png"
        alt=""
        className="hero-pillar-left"
      />
      <img
        src="/assets/about/pillar-right-top.png"
        alt=""
        className="hero-pillar-right"
      />

      {/* in-flow content; flex centers the tentang frame in the section */}
      <div className="hero-content">
        <img
          src="/assets/about/tentang-desc-hd.png"
          alt="Tentang Orientation Week"
          className="tentang-desc"
        />
      </div>
    </section>
  );
}
