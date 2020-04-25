import React, { useState } from 'react';

const MessageBar = () => {
  const [inputMessage, setInputMessage] = useState('');
  const inputHandle = ({ target: { value } }) => setInputMessage(value);

  return (
    <form noValidate="" className="">
      <div className="form-group">
        <div className="input-group">
          <input name="body" className="form-control" onChange={inputHandle} value={inputMessage} />
          <div className="d-block invalid-feedback">&nbsp;</div>
        </div>
      </div>
    </form>
  );
};

export default MessageBar;
