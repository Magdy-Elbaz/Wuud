import SkeletonPage from "../../SkeletonPage";

export default function SkeletonProfileAndCart() {
  return (
    <div className="w-100 h-100">
      <div className="d-flex align-items-center gap-2">
        <SkeletonPage number={1} height={"50px"} width={"50px"} circle={true} />
        <div className="flex-grow-1">
          <div className="d-flex align-items-center justify-content-between w-100">
            <SkeletonPage number={2} height={"28px"} width={"63px"} />
            <SkeletonPage
              number={1}
              width={"24px"}
              height={"24px"}
              circle={true}
            />
          </div>
          <SkeletonPage number={1} width={"190px"} height={"24px"} />
        </div>
      </div>
      <hr />
      <div className="d-flex flex-column gap-2 mb-2">
        <SkeletonPage number={2} width={"260px"} height={"40px"} wrap={true} />

        <hr />
        <SkeletonPage number={2} width={"50%"} height={"37.6px"} />
      </div>
    </div>
  );
}
