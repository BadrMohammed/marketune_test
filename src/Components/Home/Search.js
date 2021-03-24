import React from "react";
import { Card, Row, Col, Button } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { UPDATE_USER_PROPS } from "../../Redux/Actions/types";
const Search = ({ general, dataList }) => {
  const updateErrorMessage = (v) => {
    general(
      [
        {
          prop: "dataList.searchForm.errorMessage",
          value: v,
        },
      ],
      UPDATE_USER_PROPS
    );
  };

  const onReset = (e) => {
    e.preventDefault();
    updateErrorMessage("");
    if (dataList.allItems !== null) {
      general(
        [
          {
            prop: "dataList",
            value: {
              items: dataList.allItems,
              allItems: dataList.allItems,
              isLoading: false,
              isSearch: false,
              searchForm: { createdAt: "", errorMessage: "" },
            },
          },
        ],
        UPDATE_USER_PROPS
      );
    } else {
      general(
        [
          {
            prop: "dataList",
            value: {
              items: null,
              allItems: null,
              isLoading: false,
              isSearch: false,
              searchForm: { createdAt: "", errorMessage: "" },
            },
          },
        ],
        UPDATE_USER_PROPS
      );
    }
  };
  const onSearch = (e) => {
    e.preventDefault();

    if (dataList.searchForm.createdAt === "") {
      updateErrorMessage("created At field is required");
    } else {
      let searchValue = dataList;
      let result = searchValue.allItems.filter(
        (x) =>
          new Date(x.createdAt).toDateString() ===
          new Date(searchValue.searchForm.createdAt).toDateString()
      );

      if (result.length > 0) {
        updateErrorMessage("");
        general([{ prop: "dataList.items", value: result }], UPDATE_USER_PROPS);
      } else {
        updateErrorMessage(
          "No Result Found,Please tray again For Example choose(6/3)"
        );
      }
    }
  };
  return (
    <Card className="card_style">
      <Row className="mt-3 ml-5 mr-5">
        <Col xl={12} lg={12} md={6} sm={12} xs={12}>
          <p>Search</p>
        </Col>
      </Row>
      <Row className="mb-3 ml-5 mr-5">
        <Col className="mt-1" xl={5} lg={5} md={6} sm={12} xs={12}>
          <Flatpickr
            data-enable-time
            placeholder="Created At"
            value={dataList.searchForm.createdAt}
            options={{
              enableTime: false,
              altInput: true,
              maxDate: new Date(),
            }}
            onChange={(date) => {
              general(
                [
                  {
                    prop: "dataList.searchForm.createdAt",
                    value: new Date(date[0]).toISOString(),
                  },
                ],
                UPDATE_USER_PROPS
              );
            }}
          />
          <br />
          <span className="error_message mt-1">
            {dataList.searchForm.errorMessage}
          </span>
        </Col>
        <Col className="mt-1" xl={6} lg={6} md={6} sm={12} xs={12}>
          <Button onClick={onSearch}>Search</Button>{" "}
          <Button onClick={onReset}>Reset</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Search;
