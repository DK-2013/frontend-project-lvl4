import i18next from 'i18next';
import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';

const Header = ({ currentChannel, setAction }) => {
  const { removable } = currentChannel || {};
  return (
    <div className="d-flex mb-2">
      {removable
        ? (
          <Dropdown id="manage-channels" title="Channels" size="sm" onSelect={setAction}>
            <Dropdown.Toggle size="sm" variant="outline-secondary">{i18next.t('channels.name')}</Dropdown.Toggle>
            <Dropdown.Menu className="m-0">
              <Dropdown.Item eventKey="rename">{i18next.t('channels.renameAct')}</Dropdown.Item>
              <Dropdown.Item eventKey="remove">{i18next.t('channels.removeAct')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : <Button size="sm" variant="outline-secondary" disabled>{i18next.t('channels.name')}</Button>}
      <Button className="ml-auto" size="sm" variant="outline-secondary" onClick={() => setAction('add')}>{i18next.t('channels.addAct')}</Button>
    </div>
  );
};

export default Header;
