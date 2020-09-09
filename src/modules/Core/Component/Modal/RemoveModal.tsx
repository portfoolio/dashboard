import React, { ReactElement } from 'react';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

export default (props: any): ReactElement => {
  const actions = [
    { text: 'Remove', onClick: props.onRemove },
    { text: 'Cancel', onClick: props.hide },
  ];

  return (
    props.isOpen ?
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
      : (<></>)
  );
}
