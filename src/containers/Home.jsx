import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FaSearchMinus } from "react-icons/fa";
import { Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";

import { getItems, itemsFilterChange } from "redux/actions/getItem";
import Charts from "components/Charts";

const Home = props => {
  let { dispatch, items, filters, totalItemCount } = props;
  let { limit, skip, search } = filters;
  useEffect(() => {
    dispatch(getItems());
    // eslint-disable-next-line
  }, []);
  const penderPage = () => {
    let renderPages = [];
    for (let i = 0; i < totalItemCount / limit; i++) {
      if (renderPages.length < 7) {
        if (
          i > skip / limit - 4 ||
          (skip + limit >= totalItemCount && i > skip / limit - 7) ||
          (skip + 2 * limit >= totalItemCount && i > skip / limit - 6) ||
          (skip + 3 * limit >= totalItemCount && i > skip / limit - 5)
        ) {
          renderPages.push(
            <PaginationItem
              key={i.toString()}
              active={skip / limit === i ? true : false}
            >
              <PaginationLink
                onClick={() => {
                  scrollTop();
                  dispatch(itemsFilterChange({ search, skip: i * limit }));
                  dispatch(getItems());
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        break;
      }
    }
    return renderPages;
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="Home">
      {items.length ? (
        <div className="center Home_body_container">
          <Charts items={items} />
          <div className="Home_table">
            <Table hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Account No</th>
                  <th>Date</th>
                  <th>Transaction Details</th>
                  <th>Value Date</th>
                  <th>Withdrawal AMT</th>
                  <th>Deposit AMT</th>
                  <th>Balance AMT</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{skip + index + 1}</th>
                      <td>{row["Account No"]}</td>
                      <td>{row.Date}</td>
                      <td>{row["Transaction Details"]}</td>
                      <td>{row["Value Date"]}</td>
                      <td>{row["Withdrawal AMT"]}</td>
                      <td>{row["Deposit AMT"]}</td>
                      <td>{row["Balance AMT"]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <Pagination aria-label="pagination navigation example">
            <PaginationItem disabled={!skip}>
              <PaginationLink
                first
                onClick={() => {
                  scrollTop();
                  dispatch(itemsFilterChange({ search, skip: 0 }));
                  dispatch(getItems());
                }}
              />
            </PaginationItem>
            <PaginationItem disabled={!skip}>
              <PaginationLink
                previous
                onClick={() => {
                  scrollTop();
                  dispatch(itemsFilterChange({ search, skip: skip - limit }));
                  dispatch(getItems());
                }}
              />
            </PaginationItem>
            {penderPage()}
            <PaginationItem disabled={skip >= totalItemCount - limit}>
              <PaginationLink
                next
                onClick={() => {
                  scrollTop();

                  dispatch(itemsFilterChange({ search, skip: skip + limit }));
                  dispatch(getItems());
                }}
              />
            </PaginationItem>
            <PaginationItem disabled={skip >= totalItemCount - limit}>
              <PaginationLink
                last
                onClick={() => {
                  scrollTop();
                  dispatch(
                    itemsFilterChange({
                      search,
                      skip: ((totalItemCount / limit).toFixed(0) - 1) * limit
                    })
                  );
                  dispatch(getItems());
                }}
              />
            </PaginationItem>
          </Pagination>
        </div>
      ) : (
        <div className="Home_noResult">
          <FaSearchMinus size={60} />
          <h4 className="title">No result found</h4>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    items: state.itemsReducer.items,
    totalItemCount: state.itemsReducer.totalItemCount,
    filters: state.itemsReducer.filters
  };
};
export default connect(mapStateToProps)(Home);
