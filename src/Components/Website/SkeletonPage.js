import Skeleton from "react-loading-skeleton";

export default function SkeletonPage(props) {
  const ShowSkeleton = Array.from({ length: props.number }).map((_, index) => (
    <div key={index} style={{ width: props.width }} className="rounded-4 overflow-hidden">
      <Skeleton height={props.height} />
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
