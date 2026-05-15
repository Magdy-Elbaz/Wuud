import { faAward, faLeaf, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const showData = data.map((data) => (
    <div className="ourValues-item p-3 rounded-3">
      <div className="d-flex align-items-center justify-content-center">
        <FontAwesomeIcon
          icon={data.icon}
          className="py-3 px-3 text-light bg-primary rounded-circle fs-4 mb-2"
        />
      </div>
      <h4 className="text-center">{data.name}</h4>
      <p>{data.description}</p>
      <h4 className="d-flex align-items-center gap-2">
        {data.StatsSection} :
        <span className="fw-bold rounded-circle text-StatsSection text-primary d-flex align-items-center justify-content-center">
          {data.stats}
        </span>
      </h4>
    </div>
  ));
  return (
    <>
      <h2 className="text-center fw-bold">
        Our <span className="text-primary">Values</span>
      </h2>
      <div className="d-flex align-items-center justify-content-center gap-5 flex-wrap my-4">
        {showData}
      </div>
    </>
  );
}
