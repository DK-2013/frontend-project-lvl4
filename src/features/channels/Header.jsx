import i18next from 'i18next';
import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { currentChannelSelector } from './currentChannelSlice';

const { t } = i18next;

const Header = ({ setAction }) => {
  const currentChannel = useSelector(currentChannelSelector);
  const { removable } = currentChannel || {};
  let removeBtn = (
    <Button size="sm" variant="outline-secondary" disabled>
      {t('channels.name')}
    </Button>
  );
  if (removable) {
    removeBtn = (
      <Dropdown id="manage-channels" title="Channels" size="sm" onSelect={setAction}>
        <Dropdown.Toggle size="sm" variant="outline-secondary">{t('channels.name')}</Dropdown.Toggle>
        <Dropdown.Menu className="m-0">
          <Dropdown.Item eventKey="rename">{t('channels.renameAct')}</Dropdown.Item>
          <Dropdown.Item eventKey="remove">{t('channels.removeAct')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  return (
    <div className="d-flex mb-2">
      {removeBtn}
      <Button className="ms-auto" size="sm" variant="outline-secondary" onClick={() => setAction('add')}>
        {t('channels.addAct')}
      </Button>
    </div>
  );
};

export default Header;
