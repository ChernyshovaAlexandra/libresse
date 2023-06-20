import React from "react";
import { connect } from "react-redux";
import {
  setUserData,
  setCoins,
  setFirstOpening,
  setOPenedCardPage,
} from "./store/actions";

export const Hoc = (Components) => {
  const mapStateToProps = (state) => ({ state });
  const mapDispatchToProps = (dispatch) => {
    return {
      setUserData: (data) => dispatch(setUserData(data)),
      setCoins: (data) => dispatch(setCoins(data)),
      setFirstOpening: () => dispatch(setFirstOpening()),
      setOPenedCardPage: (bool) => dispatch(setOPenedCardPage(bool)),
    };
  };

  class HOComponent extends React.Component {
    render() {
      return <Components {...this.props} />;
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(HOComponent);
};
