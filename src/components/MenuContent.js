import React from 'react';
import PropTypes from 'prop-types';

import { scrollable } from '../behaviors';

/**
  * Renders the internal content of a menu
  * @param props {object}
  * props: searchField, items, toggleMenu
  * @return div
  */
function MenuContent(props) {
  const { items, searchField, toggleMenu } = props;

  return (
    <div>
      <div className="menu__cross">
        <button onClick={toggleMenu} className="ui large button">
          <i className="download icon" />
          Cross
        </button>
      </div>
      <header>
        <h1 className="menu__title">Stages</h1>
      </header>
      {searchField}
      <nav>
        {items}
      </nav>
    </div>
  );
}

MenuContent.propTypes = {
  items: PropTypes.array,
  searchField: PropTypes.object,
  toggleMenu: PropTypes.func.isRequired,
};

MenuContent.defaultProps = {
  items: [],
  searchField: null,
};

/**
  * Wrapper for menu content to allow scrolling
  */
export default scrollable(MenuContent);
