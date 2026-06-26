import Skeleton from "react-loading-skeleton";
import { useTheme } from "../../Context/ThemeContext";

export default function SkeletonPage(props) {
  const theme = useTheme();
  const ShowSkeleton = Array.from({ length: props.number }).map((_, index) => (
    <div key={index} style={{ width: props.width }}>
      <Skeleton
        height={props.height}
        borderRadius={props.circle && "50%"}
        baseColor={theme === "dark" ? "#242424" :"#dbdad9"}
      />
    </div>
  ));

  return (
    <div
      className={`d-flex align-items-center justify-content-center ${props.gap || "gap-2"} ${props.wrap && "flex-wrap"}`}
    >
      {ShowSkeleton}
    </div>
  );
}
