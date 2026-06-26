import { Link } from "react-router-dom";
import "./404.css";
import { Container } from "react-bootstrap";

export default function Err404() {
  return (
    <div className="error-container d-flex align-items-center justify-content-center">
      <Container className="d-flex align-items-center justify-content-center">
          <div className="col-md-9 col-lg-7">
            <div className="box-container">
              <div className="error-code text-primary">404</div>
              <h1 className="error-title">Page Not Fund</h1>
              <p className="error-message">
                The page you are looking for has been moved or no longer exists.
                Let's get you back to finding the perfect piece for your home.
              </p>
              <Link to="/" className="btn btn-primary">
                Return to Home Page
              </Link>
            </div>
          </div>
      </Container>
    </div>
  );
}
