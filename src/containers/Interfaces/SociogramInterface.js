/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Sociogram,
  SociogramBackground,
  NodeLayout,
  EdgeLayout,
  NodeBucket,
  PromptSwiper,
} from '../Elements';
import {
  unplacedNodes as getUnplacedNodes,
  placedNodes as getPlacedNodes,
} from '../../selectors/nodes';
import {
  prompt as getPrompt,
} from '../../selectors/session';

/**
  * Sociogram Interface
  * @extends Component
  */
const SociogramInterface = ({ prompt, prompts, unplacedNodes, placedNodes }) => (
  <div className="sociogram-interface">
    <div className="sociogram-interface__prompts">
      <PromptSwiper prompts={prompts} />
    </div>
    <div className="sociogram-interface__sociogram">
      <Sociogram>
        <SociogramBackground {...prompt.background} />
        <EdgeLayout />
        <NodeLayout nodes={placedNodes} />
        <NodeBucket nodes={unplacedNodes} />
      </Sociogram>
    </div>
  </div>
);

SociogramInterface.propTypes = {
  config: PropTypes.object.isRequired,
  prompts: PropTypes.array.isRequired,
  prompt: PropTypes.object.isRequired,
  placedNodes: PropTypes.array.isRequired,
  unplacedNodes: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    unplacedNodes: getUnplacedNodes(state),
    placedNodes: getPlacedNodes(state),
    prompt: getPrompt(state),
    prompts: ownProps.config.params.prompts,
  };
}

export default connect(mapStateToProps)(SociogramInterface);
