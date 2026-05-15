import { Container } from "react-bootstrap";
import "./about.css";
import OurValues from "./OurValues";
import OurJourney from "./OurJourney";

export default function AboutUs() {
  return (
    <div className="h-screen">
      <div className="bg-image-about position-relative d-flex align-items-center justify-content-center">
        <h2 className="text-light text-center">
          Craftsmanship passed down through generations
        </h2>
      </div>
      <Container>
        <h2 className="mt-3">Why wuud ?</h2>
        <p className="my-5 mt-2 About-description">
          At <spa className="text-primary fw-bold">Wuud</spa>, furniture is more
          than just wood and fabric; it is the soul that breathes life into your
          home. Our journey begins with a deep respect for nature, selecting
          only the premium timber to be shaped by the hands of master artisans.
          Every curve, texture, and joint tells a story of dedication and
          precision. We bridge the gap between timeless craftsmanship and
          contemporary elegance, creating masterpieces designed to evolve with
          your space and endure for generations. Discover the art of living well
          with <spa className="text-primary fw-bold">Wuud</spa>.
        </p>
        <OurValues />
        <OurJourney />
      </Container>
    </div>
  );
}
