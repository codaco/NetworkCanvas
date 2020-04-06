import React, { useState } from 'react';
import { compose } from 'recompose';
import { motion, AnimatePresence } from 'framer-motion';
import { getCSSVariableAsNumber, getCSSVariableAsString } from '@codaco/ui/lib/utils/CSSVariables';
import { DropObstacle } from '../../behaviours/DragAndDrop';
import { StagesMenu, SubMenu } from '../../containers/Timeline';
import BackgroundDimmer from '../BackgroundDimmer';
import TimelineButtons from './TimelineButtons';
import CloseButton from '../CloseButton';

export const baseAnimationDuration = getCSSVariableAsNumber('--animation-duration-standard-ms') / 1000;
export const baseAnimationEasing = getCSSVariableAsString('--animation-easing-json');

const Timeline = React.forwardRef((props, ref) => {
  const [expanded, setExpanded] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const resetMenuState = () => {
    setExpanded(false);
    setShowSubMenu(false);
  };

  const menuContent = showSubMenu ?
    (<SubMenu setShowSubMenu={setShowSubMenu} setExpanded={setExpanded} key="sub-menu" />) : <StagesMenu setExpanded={setExpanded} key="stages-menu" />;

  return (
    <React.Fragment>
      <AnimatePresence>
        { expanded && (<BackgroundDimmer clickHandler={resetMenuState} ><CloseButton onClick={() => setExpanded(false)} className="close-button-wrapper" /></BackgroundDimmer>)}
      </AnimatePresence>
      <div className="timeline-drop-obstacle" ref={ref} />
      <motion.div
        className="timeline"
        key="timeline"
        layoutTransition={{
          duration: baseAnimationDuration,
          easing: baseAnimationEasing,
        }}
      >
        { expanded ? menuContent : (
          <TimelineButtons
            onClickNext={props.onClickNext}
            onClickBack={props.onClickBack}
            percentProgress={props.percentProgress}
            setExpanded={setExpanded}
            setShowSubMenu={setShowSubMenu}
            key="timelinebuttons"
          />
        ) }
      </motion.div>
    </React.Fragment>
  );
});

export { Timeline };

export default compose(
  DropObstacle,
)(Timeline);