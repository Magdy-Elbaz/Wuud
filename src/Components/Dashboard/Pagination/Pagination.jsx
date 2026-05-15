import ReactPaginate from "react-paginate";
import "./pagination.css";

export default function PaginatedItems({ limit, total, setPage }) {
  const pageCount = total / limit;

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-center flex-wrap p-0 m-0"
        pageLinkClassName="links-pagination mx-2 text-secondary rounded-circle "
        activeLinkClassName="text-white bg-primary"
        nextLinkClassName="text-decoration-none"
        previousLinkClassName="text-decoration-none"
      />
    </>
  );
}
