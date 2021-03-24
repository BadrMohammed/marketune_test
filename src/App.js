import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "../src/Redux/Reducers/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "flatpickr/dist/themes/airbnb.css";
import "./assets/style.css";
import Home from "./Components/Home/Home";
const loading = () => (
  <div className="animated fadeIn pt-3 text-center" style={{ color: "white" }}>
    Loading...
  </div>
);

const store = createStore(reducers, {}, compose(applyMiddleware(ReduxThunk)));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Suspense fallback={loading()}>
          <BrowserRouter>
            <React.Suspense fallback={loading()}>
              <Switch>
                <Route exact path="/" render={(props) => <Home {...props} />} />
              </Switch>
            </React.Suspense>
          </BrowserRouter>
        </React.Suspense>
      </Provider>
    );
  }
}

export default App;
//
