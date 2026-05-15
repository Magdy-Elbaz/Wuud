import SkeletonPage from "../../../SkeletonPage";

export default function ScaletonSingleProduct() {
  return (
    <div className="d-flex gap-2">
      <div>
        <SkeletonPage width={"440px"} height={"250px"} number={1} />
        <div className="d-flex align-items-center justify-content-center">
          <SkeletonPage width={"88px"} height={"50px"} number={4} />
        </div>
      </div>
      <div>
        <div className="mb-2">
          <SkeletonPage width={"848px"} height={"48px"} number={1} />
        </div>
        <div className="mb-1">
          <SkeletonPage width={"848px"} height={"24px"} number={1} />
        </div>
        <div className="mb-5">
          <SkeletonPage width={"848px"} height={"39px"} number={1} />
        </div>
        <SkeletonPage width={"848px"} height={"2px"} number={1} />
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <SkeletonPage width="159px" height="24px" number={1} />
            <div className="d-flex align-items-center gap-2">
              <SkeletonPage width="20px" height="16px" number={5} />
            </div>
            <div className="d-flex align-items-center gap-2">
              <SkeletonPage width="56px" height="36px" number={1} />
              <SkeletonPage width="35px" height="25px" number={1} />
            </div>
          </div>
          <div className="d-flex align-items-center gap-4 w-50">
            <div className="w-50">
              <SkeletonPage width={"100%"} height={"33px"} number={1} />
            </div>
            <SkeletonPage width={"141px"} height={"33px"} number={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
