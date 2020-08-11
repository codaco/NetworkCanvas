import React from 'react';
import PropTypes from 'prop-types';
import { isElectron } from '../utils/Environment';

export const openExternalLink = (href) => {
  if (isElectron()) {
    // eslint-disable-next-line global-require
    const { shell } = require('electron');
    shell.openExternal(href);
    return false;
  }

  window.cordova.InAppBrowser.open(href, '_system', 'location=yes');
  return false;
};

const ExternalLink = ({ children, href }) => {
  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    openExternalLink(href);
  };

  return (
    // eslint-disable-next-line jsx-a11y/href-no-hash
    <a href="#" onClick={handleClick} className="external-link">
      {children}
    </a>
  );
};

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

ExternalLink.defaultProps = {
  params: {},
};

export { ExternalLink };

export default ExternalLink;
