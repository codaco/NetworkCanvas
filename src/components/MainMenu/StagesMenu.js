import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Timeline from '../../components/MainMenu/Timeline';
import StatsPanel from '../../containers/MainMenu/StatsPanel';
import { Icon } from '../../ui/components';
import MenuPanel from './MenuPanel';

class StagesMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      stages: this.props.currentStages,
    };
  }

  onInputChange = (event) => {
    this.setState({ stages: this.filterStageList(event.target.value) });
  };

  filterStageList = stageFilterTerm => this.props.currentStages.filter(
    stage => stage.label.toLowerCase().includes(stageFilterTerm.toLowerCase()));

  render() {
    const {
      active,
      onClickInactive,
    } = this.props;
    return (
      <MenuPanel
        active={active}
        panel="stages"
        onClickInactive={onClickInactive}
      >
        <Icon name="menu-default-interface" />
        <div className="stages-menu" >
          <div className="stages-menu__timeline">
            <div className="stages-timeline__header">
              <h1>Interview Stages</h1>
              <input
                className="stages-input"
                type="text"
                placeholder="Filter stages..."
                onChange={this.onInputChange}
              />
            </div>
            <Timeline items={this.state.stages} />
          </div>
          <StatsPanel />
        </div>
      </MenuPanel>
    );
  }
}

StagesMenu.propTypes = {
  currentStages: PropTypes.array.isRequired,
  active: PropTypes.bool,
  onClickInactive: PropTypes.func,
};

StagesMenu.defaultProps = {
  active: false,
  onClickInactive: () => {},
};

export default StagesMenu;
