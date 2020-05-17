import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';

const Header = ({ currentChannel, setAction }) => {
  const { removable } = currentChannel || {};
  return (
    <div className="d-flex mb-2">
      {removable
        ? (
          <Dropdown id="manage-channels" title="Channels" size="sm" onSelect={setAction}>
            <Dropdown.Toggle size="sm" variant="outline-secondary">Channels</Dropdown.Toggle>
            <Dropdown.Menu className="m-0">
              <Dropdown.Item eventKey="rename">rename</Dropdown.Item>
              <Dropdown.Item eventKey="remove">remove</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : <Button size="sm" variant="outline-secondary" disabled>Channels</Button>}
      <Button className="ml-auto" size="sm" variant="outline-secondary" onClick={() => setAction('add')}>add</Button>
    </div>
  );
};

export default Header;
