import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swiper from 'react-id-swiper';

import ProtocolCard from '../../components/Setup/ProtocolCard';
import { actionCreators as protocolActions } from '../../ducks/modules/protocol';
import { actionCreators as sessionsActions } from '../../ducks/modules/sessions';

/**
  * Display available protocols
  */
class ProtocolList extends Component {
  onClickNewProtocol = (protocol) => {
    const isFactoryProtocol = protocol.isFactoryProtocol || protocol.type === 'factory'; // `.type` used in alpha.4

    if (!(isFactoryProtocol || protocol.path)) {
      return;
    }

    this.props.addSession();
    if (isFactoryProtocol) {
      this.props.loadFactoryProtocol(protocol.path);
    } else if (protocol.path) {
      this.props.loadProtocol(protocol.path);
    }
  }

  render() {
    const { protocols } = this.props;
    const params = {
      containerClass: 'protocol-list swiper-container',
      pagination: {
        el: '.swiper-pagination.protocol-list__pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next.swiper-button-white',
        prevEl: '.swiper-button-prev.swiper-button-white',
      },
      loop: false,
      shouldSwiperUpdate: true,
      rebuildOnUpdate: true,
    };

    return (
      <Swiper {...params}>
        { protocols.map(protocol => (
          <div key={protocol.path}>
            <ProtocolCard
              size="large"
              protocol={protocol}
              selectProtocol={() => this.onClickNewProtocol(protocol)}
            />
          </div>
        )) }
      </Swiper>
    );
  }
}

ProtocolList.propTypes = {
  addSession: PropTypes.func.isRequired,
  loadFactoryProtocol: PropTypes.func.isRequired,
  loadProtocol: PropTypes.func.isRequired,
  protocols: PropTypes.array.isRequired,
};

ProtocolList.defaultProps = {
};

function mapStateToProps(state) {
  return {
    protocols: state.protocols,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addSession: bindActionCreators(sessionsActions.addSession, dispatch),
    loadProtocol: bindActionCreators(protocolActions.loadProtocol, dispatch),
    loadFactoryProtocol: bindActionCreators(protocolActions.loadFactoryProtocol, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtocolList);

export { ProtocolList as UnconnectedProtocolList };
