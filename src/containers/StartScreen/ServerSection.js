import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import { Button } from '@codaco/ui';
import { actionCreators as uiActions } from '../../ducks/modules/ui';
import { actionCreators as serverActions } from '../../ducks/modules/pairedServer';
import { actionCreators as dialogActions } from '../../ducks/modules/dialogs';
import { Section } from '.';
import DiscoveredServerList from '../Server/DiscoveredServerList';
import ServerAddressForm from './ServerAddressForm';
import useOnlineStatus from '../../hooks/useOnlineStatus';
import { ServerCard } from '../../components/Cards';
import { openExternalLink } from '../../components/ExternalLink';
import useServerConnectionStatus from '../../hooks/useServerConnectionStatus';

const ServerSection = () => {
  const showServerAddressForm = useSelector(state => state.showServerAddressForm);
  const pairedServer = useSelector(state => state.pairedServer);

  const onlineStatus = useOnlineStatus();
  const pairedServerConnection = useServerConnectionStatus(pairedServer);

  const dispatch = useDispatch();
  const openDialog = dialog => dispatch(dialogActions.openDialog(dialog));
  const unpairServer = () => dispatch(serverActions.unpairServer());
  const toggleShowServerAddressForm = () => dispatch(uiActions.toggle('showServerAddressForm'));

  const handleUnpairRequest = () => {
    openDialog({
      type: 'Warning',
      title: 'Unpair from Server?',
      confirmLabel: 'Unpair',
      onConfirm: unpairServer,
      message: (
        <p>
          This will remove the connection to your computer running Server. You
          will not be able to upload data or fetch protocols. Are you sure you want to continue?
        </p>
      ),
    });
  };

  const renderServerStatus = () => {
    if (!onlineStatus) {
      return (
        <p>
          Your device does not appear to have an active network connection so
          it cannot communicate with Server. Fetching protocols and uploading
          data are unavailable. Connect to a network, and try again.
        </p>
      );
    }

    if (pairedServerConnection !== 'ok') {
      return (
        <React.Fragment>
          <p>
            This device could not communicate with your paired Server. Fetching
            protocols and uploading data have been disabled. Check Server is
            open on your remote computer, and that your network is configured
            correctly. Use the button below for more troubleshooting information.
          </p>
          <Button size="small" color="neon-coral" onClick={() => openExternalLink('https://documentation.networkcanvas.com/docs/key-concepts/pairing/#troubleshooting')}>More Information</Button>
        </React.Fragment>
      );
    }

    return (
      <p>Connection to Server established. Data upload and protocol fetching are available.</p>
    );
  };

  const serverStatusClasses = cx(
    'server-status',
    { 'server-status--caution': !onlineStatus },
    { 'server-status--error': pairedServerConnection !== 'ok' },
    { 'server-status--ok': onlineStatus && pairedServerConnection === 'ok' },
  );

  return (
    <Section className="start-screen-section server-section">
      <ServerAddressForm
        show={showServerAddressForm}
        handleClose={toggleShowServerAddressForm}
      />
      <main className="server-section__main">
        <div className="content-area">
          <div className="content-area__discover">
            <header>
              <h2>Server Status</h2>
            </header>
            { !pairedServer ? (
              <React.Fragment>
                <p>
                  To begin, open Server on a computer connected to the same network as this device.
                  When the device appears below, click its card to start the pairing process.
                </p>
                <DiscoveredServerList />
              </React.Fragment>
            ) : (
              <div className="paired-server-wrapper">
                <ServerCard
                  name={pairedServer.name}
                  host={pairedServer.host}
                  addresses={pairedServer.addresses}
                  disabled={!onlineStatus || pairedServerConnection !== 'ok'}
                />
                <div className={serverStatusClasses}>
                  <div className="server-status__indicator">
                    <div className="indicator" />
                  </div>
                  <div className="server-status__text">
                    { renderServerStatus() }
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="content-area__buttons">
            <Button color="mustard--dark" onClick={() => openExternalLink('https://documentation.networkcanvas.com/docs/key-concepts/pairing/')}>View Pairing Documentation</Button>
            { !pairedServer ? (
              <Button disabled={!onlineStatus} color="platinum" onClick={toggleShowServerAddressForm}>Provide manual connection details...</Button>
            ) :
              (<Button color="platinum" onClick={handleUnpairRequest}>Unpair</Button>)
            }
          </div>
        </div>
      </main>
    </Section>
  );
};

export default ServerSection;
