import SkeletonPage from "../../SkeletonPage";

export default function SkeletonProfileAndCart() {
  return (
    <div className="w-100 h-100">
      <div className="d-flex align-items-center gap-2">
        <div
          className="rounded-circle overflow-hidden"
          style={{ width: "40px", height: "40px" }}
        >
          <SkeletonPage number={1} height={"40px"} width={"40px"} />
        </div>
        <div className="flex-grow-1">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center gap-2">
              <SkeletonPage number={1} height={"24px"} width={"63px"} />
              <SkeletonPage number={1} height={"28.2px"} width={"55px"} />
            </div>
            <SkeletonPage number={1} width={"24px"} height={"24px"} />
          </div>
          <SkeletonPage number={1} width={"212px"} height={"24px"} />
        </div>
      </div>
      <hr />
      <div className="d-flex flex-column gap-2 mb-2">
        <SkeletonPage number={1} width={"260px"} height={"40px"} />
        <SkeletonPage number={1} width={"260px"} height={"40px"} />

        <hr />
        <SkeletonPage number={1} width={"260px"} height={"37.6px"} />
      </div>
    </div>
  );
}
