import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import {
  Button, Modal, Form, InputGroup,
} from 'react-bootstrap';
import { addChannel, removeChannel, renameChannel } from './channelsSlice';

const getSubmitHandler = (handleClose, action) => ({ id, name }) => {
  setTimeout(() => {
    action({ id: id || name, name });
    handleClose();
  }, 300);
};

const ChannelForm = ({
  handleSubmit,
  handleChange,
  isSubmitting,
  values: { id, name },
}) => (
  <Form onSubmit={handleSubmit}>
    <InputGroup>
      <Form.Control
        name="id"
        type="hidden"
        value={id}
        onChange={handleChange}
      />
      <Form.Control
        name="name"
        placeholder="Enter channel name"
        value={name}
        onChange={handleChange}
      />
      <InputGroup.Append>
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {id ? 'Rename' : 'Add'}
        </Button>
      </InputGroup.Append>
      <Form.Control.Feedback type="invalid">
        This channel name exist.
      </Form.Control.Feedback>
    </InputGroup>
  </Form>
);

const AddChannel = ({
  handleClose,
  action,
}) => (
  <Modal show onHide={handleClose}>
    <Modal.Body className="p-4">
      <Formik
        initialValues={{ id: '', name: '' }}
        onSubmit={getSubmitHandler(handleClose, action)}
        component={ChannelForm}
      />
    </Modal.Body>
  </Modal>
);

const RenameChannel = ({
  currentChannel: { id, name },
  handleClose,
  action,
}) => (
  <Modal show onHide={handleClose}>
    <Modal.Body className="p-4">
      <Formik
        initialValues={{ id, name }}
        onSubmit={getSubmitHandler(handleClose, action)}
        component={ChannelForm}
      />
    </Modal.Body>
  </Modal>
);


const RemoveChannel = ({
  currentChannel: { id, name },
  handleClose,
  action,
}) => (
  <Modal show onHide={handleClose} className="p-4">
    <Modal.Body>
      <InputGroup>
        <Form.Control
          name="id"
          plaintext
          value={`Are you sure remove channel: ${name} ?`}
        />
        <InputGroup.Append>
          <Button
            variant="primary"
            onClick={() => {
              action({ id });
              handleClose();
            }}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>No</Button>
        </InputGroup.Append>
      </InputGroup>
    </Modal.Body>
  </Modal>
);

export default {
  add: connect(null, { action: addChannel })(AddChannel),
  remove: connect(null, { action: removeChannel })(RemoveChannel),
  rename: connect(null, { action: renameChannel })(RenameChannel),
};
