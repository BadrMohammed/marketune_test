import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/index";
import { Col, Container, Row, Spinner } from "reactstrap";
import Search from "./Search";
import Statistics from "./Statistics";
class Home extends Component {
  componentDidMount() {
    this.props.getData();
  }
  render() {
    const { general, dataList } = this.props;

    return (
      <Container className="mt-5 mb-5 conatiner">
        {dataList.isLoading === true ? (
          <Row
            className="container_spinner"
            style={{
              display: "flex",
              height: "100%",
              WebkitAlignItems: "center",
            }}
          >
            <Col className="text-center">
              <Spinner color="primary" className="spinner" />
            </Col>
          </Row>
        ) : (
          <>
            <Row>
              <Col xl={12} lg={12} md={12} xs={12} sm={12}>
                <Search general={general} dataList={dataList} />
              </Col>
            </Row>

            <Row className="mt-5">
              <Col xl={12} lg={12} md={12} xs={12} sm={12}>
                <Statistics dataList={dataList} />
              </Col>
            </Row>
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ UserR }) => {
  return { dataList: UserR.dataList };
};

export default connect(mapStateToProps, actions)(Home);
