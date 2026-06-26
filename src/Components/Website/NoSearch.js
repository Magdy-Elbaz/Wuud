import { useTranslation } from "react-i18next";

export default function NoSearch({ category }) {
  const { t } = useTranslation();

  return (
    <div className="d-flex align-items-center justify-content-center flex-column text-center">
      <img
        src={require(`../../Assets/noSearch.png`)}
        width={"200px"}
        height={"150px"}
        alt=""
        data-aos="fade-down"
      />
      <h4 className="fw-bold" data-aos="fade-right">
        {t(`We were unable to find this ${category ? "Category" : "product"}`)}.
      </h4>
      <p className="text-secondary" data-aos="fade-left">
        {t(`Sorry, this ${category ? "section" : "piece of furniture"} is currently unavailable.`)}
      </p>
    </div>
  );
}
