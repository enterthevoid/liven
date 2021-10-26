/*
 * For nasty iOS Safari.
 * Since iOS Safari 11.3+, all touchmove listeners are passive by default.
 * Yet it doesn't fully support CSS touch-action like Chrome does.
 * So here is a component to workaround.
 */

import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useEventListener } from "../../../utils/helpers";

const NonPassiveTouchTarget = ({
  component: Component,
  onTouchMove,
  ...rest
}) => {
  const componentRef = useRef();

  useEventListener("touchmove", onTouchMove, componentRef);

  return <Component ref={componentRef} onTouchMove={onTouchMove} {...rest} />;
};

NonPassiveTouchTarget.propTypes = {
  component: PropTypes.string,
  onTouchMove: PropTypes.func,
};

NonPassiveTouchTarget.defaultProps = {
  component: "div",
  onTouchMove: () => {},
};

export default NonPassiveTouchTarget;
