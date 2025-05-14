"use client";

export default function Pagination({
  currentPage,
  totalPages,
  startPage,
  onPageClick,
}) {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={() => currentPage > 1 && onPageClick(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          marginRight: "10px",
          padding: "6px 12px",
          backgroundColor: "#eee",
          color: "#000",
          border: "none",
          borderRadius: "4px",
          cursor: currentPage === 1 ? "default" : "pointer",
          opacity: currentPage === 1 ? 0.5 : 1,
        }}
      >
        ◀
      </button>
      {Array.from(
        { length: Math.min(10, totalPages - startPage + 1) },
        (_, i) => {
          const pageNum = startPage + i;
          return (
            <button
              key={pageNum}
              onClick={() => onPageClick(pageNum)}
              style={{
                margin: "0 5px",
                padding: "6px 12px",
                backgroundColor: pageNum === currentPage ? "#0070f3" : "#eee",
                color: pageNum === currentPage ? "#fff" : "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {pageNum}
            </button>
          );
        }
      )}
      <button
        onClick={() => onPageClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
        style={{
          marginLeft: "10px",
          padding: "6px 12px",
          backgroundColor: "#eee",
          color: "#000",
          border: "none",
          borderRadius: "4px",
          cursor: currentPage === totalPages ? "default" : "pointer",
          opacity: currentPage === totalPages ? 0.5 : 1,
        }}
      >
        ▶
      </button>
    </div>
  );
}
