import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../ui/components';
import { ProgressBar } from '../components';

const Timeline = ({ onClickBack, onClickNext, percentProgress, toggleMenu }) => (
  <div className="timeline" onClick={toggleMenu}>
    <div className="timeline-nav timeline-nav--back">
      <Icon
        onClick={(e) => {
          if (e) {
            e.stopPropagation();
            e.preventDefault();
          }
          onClickBack(e);
        }}
        name="chevron-up"
      />
    </div>
    <ProgressBar percentProgress={percentProgress} />
    <div
      className="timeline-nav timeline-nav--next"
      onClick={(e) => {
        if (e) {
          e.stopPropagation();
          e.preventDefault();
        }
        onClickNext(e);
      }}
    >
      <Icon name="chevron-down" />
    </div>
  </div>
);

Timeline.propTypes = {
  onClickBack: PropTypes.func,
  onClickNext: PropTypes.func,
  percentProgress: PropTypes.number,
  toggleMenu: PropTypes.func,
};

Timeline.defaultProps = {
  onClickBack: () => {},
  onClickNext: () => {},
  percentProgress: 0,
  toggleMenu: () => {},
};

export default Timeline;