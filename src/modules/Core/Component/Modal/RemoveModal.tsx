import React, { Component } from 'react';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import { connect } from 'react-redux';

interface State {
  isOpen: string | null;
}

class RemoveModal extends Component<any, State> {
  render() {
    const actions = [
      { text: 'Remove', onClick: this.props.onRemove },
      { text: 'Cancel', onClick: this.props.hide },
    ];

    return (
      this.props.isOpen ?
        <div>
          <ModalTransition>
              <Modal
                key={'active-modal'}
                actions={actions}
                appearance={'danger'}
                onClose={this.props.hide}
                heading={'Warning!'}
                width={'small'}
              >
                Are you sure you want to remove this item ?
              </Modal>
          </ModalTransition>
        </div>
        : ''
    );
  }
}

export default connect()(RemoveModal);
