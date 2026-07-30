import "./footer.css";

const CONTACTS = [
  { label: "Line OA:", value: "@829hzswf" },
  { label: "Instagram:", value: "@oweekucs" },
  { label: "Email:", value: "oweek@ciputra.ac.id" },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* pink gradient lives on .footer itself; this is the leaf/rose pattern overlay */}
      <img
        src="/assets/footer/footer-pattern.png"
        alt=""
        className="footer-pattern"
      />

      {/* crossover assets: absolute flex layers anchored to the footer's TOP edge,
          pulled UP so they straddle it (half over the page above, half in the footer).
          High z-index so they render in front of the page content above. */}
      <div className="bushes-layer">
        <img src="/assets/footer/bushes.png" alt="" className="bushes" />
      </div>
      <div className="pedestal-layer">
        <img src="/assets/footer/pedestal.png" alt="" className="pedestal" />
      </div>

      {/* magnify title — dead-centered by its own flex layer */}
      <div className="footer-magnify-layer">
        <img
          src="/assets/footer/magnify-title.webp"
          alt="Magnify"
          className="footer-magnify"
        />
      </div>

      {/* in-flow content row: logos anchored left, contact anchored right */}
      <div className="footer-content">
        <div className="footer-logos">
          <img src="/assets/footer/hd-uc.png" alt="Universitas Ciputra" className="logo-uc" />
          <img src="/assets/footer/logo-oweek-hd.png" alt="OWeek" className="logo-oweek" />
        </div>

        <div className="footer-contact">
          {CONTACTS.map(({ label, value }) => (
            <p className="contact-line" key={label}>
              <span className="contact-label">{label}</span>{" "}
              <span className="contact-value">{value}</span>
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
