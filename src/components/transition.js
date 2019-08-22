import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, Transition } from "react-transition-group";

// source: https://scotch.io/tutorials/animated-page-transitions-in-gatsby-websites

const timeout = 500;
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 0,
  },
};
class PageTransition extends React.PureComponent {
  render() {
    const { children, location } = this.props;
    return (
      <TransitionGroup>
        <Transition
          key={location.pathname}
          timeout={{
            enter: timeout,
            exit: timeout,
          }}
        >
          {status => (
            <div
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </Transition>
      </TransitionGroup>
    );
  }
}

PageTransition.propTypes = {
  children: PropTypes.array.isRequired,
  location: PropTypes.shape().isRequired,
};

export default PageTransition;
