import React, { useState, useEffect } from "react";
import "./AdminTable.css";
import EditRow from "./EditRow";

const AdminTable = (props) => {
  const initial = props.initial;
  const [editVisible, setEditVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [blur, setBlur] = useState({ filter: "blur(0px)" });
  // const [allChecked, setAllChecked] = useState(false);

  return (
    <div className="container">
      <table style={blur}>
        <thead>
          <tr>
            <th
              onClick={() => {
                props.setAllChecked();
                props.selectAllRowsInPage();
              }}
            >
              {props.allChecked ? (
                <span id="p4" class="material-icons">check_box</span>
              ) : (
                <span id="p4" class="material-icons">check_box_outline_blank</span>
              )}
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.data
            .filter((ele, index) => index >= initial && index < initial + 10)
            .filter((ele) => {
              if (props.searchData === "") {
                return true;
              }
              if (
                ele.name
                  .toLowerCase()
                  .includes(props.searchData.toLowerCase()) ||
                ele.email.toLowerCase().includes(props.searchData.toLowerCase()) ||
                ele.role.toLowerCase().includes(props.searchData.toLowerCase())
              ) {
                return true;
              }
            })
            .map((user) => (
              <>
                <tr key={user.id}>
                  <td onClick={() => props.handleRowSelect(user.id)}>
                    {props.selectedRows.includes(user.id) ? (
                      <span id="p4" class="material-icons">check_box</span>
                    ) : (
                      <span id="p4" class="material-icons">
                        check_box_outline_blank
                      </span>
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <div
                      onClick={() => {
                        setEditVisible(!editVisible);
                        setCurrentUser(user);
                        setBlur({ filter: "blur(5px)" });
                      }}
                    >
                      <span id="p4" class="material-icons">edit_note</span>
                    </div>
                    <div onClick={() => props.deleteLocalData(user.id)}>
                      <span id="p4" class="material-icons" style={{ color: "red" }}>
                        delete_outline
                      </span>
                    </div>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
      <div id="editRow">
        {editVisible && (
          <EditRow
            user={currentUser}
            setBlur={setBlur}
            setEditVisible={setEditVisible}
            editSelectedData={props.editSelectedData}
          />
        )}
      </div>
    </div>
  );
};

export default AdminTable;
