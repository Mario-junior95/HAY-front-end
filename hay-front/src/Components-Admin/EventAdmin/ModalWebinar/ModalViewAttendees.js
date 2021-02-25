import React from "react";

const ModalViewAttendees = (props) => {
  return (
    <div>
      <div className="table">
        <div>
          <div className="row1" style={{ justifyContent: "space-between" }}>
            <div className="col0 col3">Name</div>
            <div className="col0 col3">Email</div>
            <div className="col0 col3">Phone</div>
          </div>
        </div>
        {props.listAttendees.user.map((user) => {
          return (
            <div key={user.id}>
              <div className="row1" style={{ justifyContent: "space-between" }}>
                <div className="col0 col3">{user.name}</div>
                <div className="col0 col3">{user.email}</div>
                <div className="col0 col3">{user.phone}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModalViewAttendees;
