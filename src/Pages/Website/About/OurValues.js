import { faAward, faLeaf, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../Context/ThemeContext";

const data = [
  {
    icon: faAward,
    name: "Quality",
    description:
      "We use natural beech wood to ensure a piece that lasts a long time.",
    StatsSection: "Happy customer",
    stats: "500+",
  },
  {
    icon: faPalette,
    name: "Creativity",
    description:
      "Our designs combine the heritage of the past with the simplicity of the future.",
    StatsSection: "Natural wood",
    stats: "100%",
  },
  {
    icon: faLeaf,
    name: "Sustainability",
    description:
      "We care about the environment and choose our resources carefully.",
    StatsSection: "Years warranty",
    stats: "3",
  },
];

export default function OurValues() {
  const { t } = useTranslation();
  const theme = useTheme();

  const showData = data.map((data, key) => (
    <div
      key={key}
      className={`ourValues-item ${theme === "dark" ? "bg-dark-card" : "bg-light-card"} d-flex align-items-center justify-content-between flex-column p-3 rounded-3`}
      data-aos="fade-up"
    >
      <div className="d-flex align-items-center justify-content-center">
        <FontAwesomeIcon
          icon={data.icon}
          className="py-3 px-3 text-light bg-primary rounded-circle fs-4 mb-2"
        />
      </div>
      <h4 className="text-center">{t(data.name)}</h4>
      <p>{t(data.description)}</p>
      <h4 className="d-flex align-items-center gap-2 m-0">
        <span className="mb-2">{t(data.StatsSection)} :</span>
        <span className={`fw-bold rounded-circle text-StatsSection ${theme === "light" ? "shadow-dark" : "shadow-light"} text-primary d-flex align-items-center justify-content-center`}>
          {data.stats}
        </span>
      </h4>
    </div>
  ));

  return (
    <>
      <h2 className="text-center fw-bold">{t("Our Values")} 🤝</h2>
      <div className="d-flex align-items-center justify-content-center gap-5 flex-wrap my-4">
        {showData}
      </div>
    </>
  );
}
