import React from "react";
import { CustomDialog } from "react-st-modal";
import ModalViewAttendees from "./ModalViewAttendees";

const WebinarAttendeeViewButton = (props) => {
  return (
    <input
      type="submit"
      value="View Attendees"
      onClick={async () => {
        const result = await CustomDialog(
          <ModalViewAttendees listAttendees={props.listAttendees} />,
          {
            title: "Webinar Attendees",
            showCloseIcon: true,
            isCanClose: true,
          }
        );
      }}
      className="event-button"
    />
  );
};

export default WebinarAttendeeViewButton;
