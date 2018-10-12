import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button, Icon } from '../../ui/components';
import StagesMenu from '../../containers/MainMenu/StagesMenu';
import SettingsMenu from '../../containers/MainMenu/SettingsMenu';

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePanel: 'stages',
    };
  }

  handleToggleActivePanel = (activePanel) => {
    this.setState({ activePanel });
  }

  render() {
    const {
      isOpen,
      handleCloseMenu,
      handleReturnToStart,
    } = this.props;

    return (
      <div className={cx('menu-container', { 'menu-container--show': isOpen })}>
        <div className="menu-container__content">
          <div className="menu-container__header">
            <Icon name="close" onClick={handleCloseMenu} />
          </div>
          <div className="menu-container__panels">
            <div className="menu-panels">
              <SettingsMenu
                active={this.state.activePanel === 'settings'}
                onClickInactive={() => this.handleToggleActivePanel('settings')}
              />
              <StagesMenu
                active={this.state.activePanel === 'stages'}
                onClickInactive={() => this.handleToggleActivePanel('stages')}
              />
            </div>
          </div>
          <div className="menu-container__footer">
            <Button color="neon-coral" onClick={handleReturnToStart}>Return to start screen</Button>
          </div>
        </div>
      </div>
    );
  }
}

MainMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  handleReturnToStart: PropTypes.func.isRequired,
};

export default MainMenu;
