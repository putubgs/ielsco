"use client";

import ReactPaginate from "react-paginate";
import ArrowIcon from "./ArrowIcon";

interface EventPaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
}

export default function EventPagination({
  pageCount,
  onPageChange,
  currentPage,
}: EventPaginationProps) {
  return (
    <div className="flex justify-center mt-12 select-none">
      <ReactPaginate
        previousLabel={
          <div className="flex items-center gap-2 select-none">
            <ArrowIcon direction="left" />
            <span>Previous</span>
          </div>
        }
        nextLabel={
          <div className="flex items-center gap-2 select-none">
            <span>Next</span>
            <ArrowIcon direction="right" />
          </div>
        }
        pageCount={pageCount}
        onPageChange={onPageChange}
        forcePage={currentPage}
        containerClassName="flex items-center gap-2 select-none"
        pageClassName="px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer hover:bg-gray-100 select-none"
        pageLinkClassName="select-none block w-full h-full"
        activeClassName="bg-gray-800 text-white hover:bg-gray-800 select-none"
        previousClassName="px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer hover:bg-gray-100 select-none"
        nextClassName="px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer hover:bg-gray-100 select-none"
        disabledClassName="text-gray-400 cursor-not-allowed hover:bg-transparent select-none"
        breakLabel="..."
        breakClassName="px-2 py-2 text-sm select-none"
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        className="flex items-center gap-5"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
