import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Button, Modal, Form, InputGroup,
} from 'react-bootstrap';
import { addChannelRequest, renameChannelRequest, removeChannelRequest } from '../../api/http';

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

const RemoveChannelForm = ({
  handleSubmit,
  isSubmitting,
  values: { name },
}) => (
  <Form onSubmit={handleSubmit}>
    <InputGroup>
      <Form.Control
        name="id"
        plaintext
        readOnly
        value={`Are you sure remove channel: ${name} ?`}
      />
      <InputGroup.Append>
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
        >
          Remove
        </Button>
      </InputGroup.Append>
    </InputGroup>
  </Form>
);

const actionsStuff = {
  add: {
    component: ChannelForm,
    getHandler: (handleClose) => async ({ name }) => {
      try {
        await addChannelRequest({ name });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    },
  },
  remove: {
    component: RemoveChannelForm,
    getHandler: (handleClose) => async ({ id }) => {
      try {
        await removeChannelRequest({ id });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    },
  },
  rename: {
    component: ChannelForm,
    getHandler: (handleClose) => async ({ id, name }) => {
      try {
        await renameChannelRequest({ id, name });
        handleClose();
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default ({
  actionName,
  handleClose,
}) => {
  if (!actionName) return null;
  const currentChannel = useSelector(({
    channels: { byId, currentChannelId },
  }) => byId[currentChannelId]);

  if (actionName === 'remove' && !currentChannel) return null;
  const { id, name } = (actionName !== 'add' && currentChannel) || { id: '', name: '' };
  const { component, getHandler } = actionsStuff[actionName];
  return (
    <Modal show onHide={handleClose}>
      <Modal.Body className="p-4">
        <Formik
          initialValues={{ id, name }}
          onSubmit={getHandler(handleClose)}
          component={component}
        />
      </Modal.Body>
    </Modal>
  );
};
