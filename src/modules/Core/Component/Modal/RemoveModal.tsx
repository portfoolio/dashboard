import React, { FunctionComponent } from 'react';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import { connect } from 'react-redux';

interface State {
  isOpen: string | null;
  hide: () => void;
}

const RemoveModal: FunctionComponent<State> = (props) => {
  const actions = [
    { text: 'Remove', onClick: props.onRemove },
    { text: 'Cancel', onClick: props.hide },
  ];

  return props.isOpen ? (
    <div>
      <ModalTransition>
        <Modal
          key={'active-modal'}
          actions={actions}
          appearance={'danger'}
          onClose={props.hide}
          heading={'Warning!'}
          width={'small'}
        >
          Are you sure you want to remove this item ?
        </Modal>
      </ModalTransition>
    </div>
  ) : (
    ''
  );
};

export default connect()(RemoveModal);
