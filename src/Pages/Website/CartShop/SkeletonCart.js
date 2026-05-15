import SkeletonPage from "../../../Components/Website/SkeletonPage";

export default function SkeletonCart({ num }) {
  const showSkeleton = Array.from({ length: num }).map((_, index) => (
    <div key={index} className="d-flex gap-2">
      <SkeletonPage width={"87px"} height={"49px"} number={1} />
      <div className="d-flex align-items-center justify-content-between w-100">
        <div>
          <SkeletonPage width={"99px"} height={"29px"} number={1} />
          <SkeletonPage width={"99px"} height={"29px"} number={1} />
        </div>
        <SkeletonPage width={"99px"} height={"29px"} number={1} />
      </div>
    </div>
  ));
  return <div>{showSkeleton}</div>;
}
