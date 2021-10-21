/*
 * For nasty iOS Safari.
 * Since iOS Safari 11.3+, all touchmove listeners are passive by default.
 * Yet it doesn't fully support CSS touch-action like Chrome does.
 * So here is a component to workaround.
 */

import React from "react";
import PropTypes from "prop-types";

const OPTIONS = { passive: false };
class NonPassiveTouchTarget extends React.Component {
  componentDidMount() {
    this.node.addEventListener("touchmove", this.props.onTouchMove, OPTIONS);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.onTouchMove !== this.props.onTouchMove) {
      this.node.removeEventListener(
        "touchmove",
        prevProps.onTouchMove,
        OPTIONS
      );
      this.node.addEventListener("touchmove", this.props.onTouchMove, OPTIONS);
    }
  }

  componentWillUnmount() {
    this.node.removeEventListener("touchmove", this.props.onTouchMove, OPTIONS);
  }

  ref = (node) => {
    this.node = node;
  };

  render() {
    const { component: Component, onTouchMove, work, ...rest } = this.props;
    return (
      <Component
        ref={this.ref}
        onTouchMove={onTouchMove}
        work={work}
        {...rest}
      />
    );
  }
}

NonPassiveTouchTarget.propTypes = {
  component: PropTypes.string,
  onTouchMove: PropTypes.func,
  work: PropTypes.object,
};

NonPassiveTouchTarget.defaultProps = {
  component: "div",
  onTouchMove() {},
  work: {},
};

export default NonPassiveTouchTarget;
