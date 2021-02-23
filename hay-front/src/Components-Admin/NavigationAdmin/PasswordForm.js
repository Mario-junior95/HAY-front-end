import React, { useState } from "react";
import { CustomDialog } from "react-st-modal";
import PasswordFormModal from "./PasswordFormModal";
import './PasswordForm.css'

const PasswordForm = (props) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <span
       onClick={async () => {
        const result = await CustomDialog(
          <PasswordFormModal history={props.history} />,
          {
            title: "Change Password",
            showCloseIcon: true,
            isCanClose: true,
          }
        );
      }}
      className="btn password_form"
    >
      Change Password
    </span>
  );
};

export default PasswordForm;
