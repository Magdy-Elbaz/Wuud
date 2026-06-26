import { Container } from "react-bootstrap";
import { FeatureData } from "./FeatureData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

export default function Featuries() {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-center gap-4 justify-content-md-between flex-wrap py-5 my-5">
        {FeatureData.map((item, key) => (
          <div
            key={key}
            className="d-flex align-items-center gap-2"
            style={{ width: "300px" }}
            data-aos={item.animation}
          >
            <FontAwesomeIcon
              className="bg-primary p-3 rounded-circle text-light fs-5"
              icon={item.icon}
            />
            <div>
              <h5 className="m-0 fw-bold">{t(item.title)}</h5>
              <p className="text-secondary m-0">{t(item.description)}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
