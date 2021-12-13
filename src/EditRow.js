import React, { useState } from "react";
import "./EditRow.css"

const EditRow = (props) => {
  const user = props.user;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [id, setId] = useState(user.id);

  const editedData = {
    name: name,
    email: email,
    role: role,
    id: id,
  };

  return (
    <div id="editContainer">
      <div>
        <span>
          Name :{"  "}
          <input
            className="editBox"
            defaultValue={user.name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </span>
      </div>
      <div>
        <span>
          Email :{"  "}
          <input
            className="editBox"
            defaultValue={user.email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </span>
      </div>
      <div>
        <span>
          Role :{"  "}
          <input
            className="editBox"
            defaultValue={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          />
        </span>
      </div>
      <button
        onClick={() => {
          props.editSelectedData(editedData);
          props.setBlur({filter:"blur(0px"})
          props.setEditVisible(false);
          console.log(editedData);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default EditRow;
