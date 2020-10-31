import i18next from 'i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Button, Modal, Form, InputGroup,
} from 'react-bootstrap';
import { addChannelRequest, renameChannelRequest, removeChannelRequest } from '../../api/http';

const getInitialValue = (action) => {
  if (action === 'add') return { id: '', name: '' };
  const { byId, currentChannelId } = useSelector(({ channels }) => channels);
  const { id, name } = byId[currentChannelId];
  return { id, name };
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
          {i18next.t(`channels.${id ? 'renameAct' : 'addAct'}`)}
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
        value={i18next.t('channels.confirmRemove', { name })}
      />
      <InputGroup.Append>
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {i18next.t('channels.removeAct')}
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
  const { component, getHandler } = actionsStuff[actionName];
  return (
    <Modal show onHide={handleClose}>
      <Modal.Body className="p-4">
        <Formik
          initialValues={getInitialValue(actionName)}
          onSubmit={getHandler(handleClose)}
          component={component}
        />
      </Modal.Body>
    </Modal>
  );
};
