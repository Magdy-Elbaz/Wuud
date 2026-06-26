import { useContext } from "react";
import SkeletonPage from "../../../Components/Website/SkeletonPage";
import { WindowSize } from "../../../Context/WindowContext";

export default function Skeletonhop({ number }) {
  const { windowSize } = useContext(WindowSize);
  const showSkaleton = Array.from({ length: number }).map((_, i) => (
    <div className="my-5" key={i}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <SkeletonPage number={1} width="75px" height="50px" />
          <SkeletonPage number={1} width="50px" height="50px" />
        </div>
        <SkeletonPage number={1} width="82px" height="38px" />
      </div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ padding: "20px 0px 35px" }}
      >
        <SkeletonPage
          number={windowSize <= "768" ? 1 : windowSize <= "991" ? 2 : 4}
          width={windowSize <= "768" ? "260px" : "250px"}
          height="350px"
          gap="gap-5"
        />
      </div>
    </div>
  ));

  return showSkaleton;
}
