import React from "react";

interface GridListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const GridList = <T,>({ items, renderItem }: GridListProps<T>) => {
  return (
    <div className="row justify-content-center gx-3 gy-3">
      {items.map((item, index) => (
        <div
          className="prdct-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3"
          key={index}
        >
          <div className="d-flex justify-content-center">
            {renderItem(item)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridList;
