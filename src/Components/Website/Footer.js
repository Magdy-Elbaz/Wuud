import { Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <Outlet />
      <div className="p-2 bg-primary">
        <Container>
          <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
            <p className="m-0 text-dark">
              @Copyright 2026.
              <Link to="/" className="text-decoration-none text-light me-1">
                Wuud
              </Link>
              All Rights Reserved.
            </p>
            <p className="m-0 text-dark">
              Developed by:
              <Link
                to="https://magdy-elbaz.vercel.app/"
                target="_blank"
                className="text-light text-decoration-none ms-1"
              >
                Magdy Elbaz
              </Link>
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}
