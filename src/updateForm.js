import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  utilsUIUpdate,
  UtilsUpdateChangeHandler,
  utilsToggle,
} from "./Utilities";

export default function UpdateForm({ ticketList }) {
  const [modal, setModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    nodeA: "",
    nodeB: "",
    vendor: "",
    timeDown: "",
    OFCsiteWithPowerIssue: "",
    byWhom: "",
    COF: "",
    action: "",
  });

  const updateLink = () => {
    fetch("/updateFailure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateFormData),
    })
      .then((response) => {
        if (response.status === 200) {
          utilsUIUpdate(response);
        }
      })
      .catch((err) => {
        alert("Failed to update ticket, " + err);
      });
    utilsToggle(null, setModal, modal);
  };

  return (
    <Modal isOpen={modal} toggle={() => utilsToggle(null, setModal, modal)}>
      <ModalHeader toggle={() => utilsToggle(null, setModal, modal)}>
        Update Link
      </ModalHeader>
      <ModalBody>
        <form
          className="form-horizontal"
          //   onSubmit={(e) => registerFailure(e, formData)}
          method="POST"
        >
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Terminal A"
                name="nodeA"
                onChange={(e) => UtilsUpdateChangeHandler(e, setUpdateFormData)}
                value={updateFormData.nodeA}
                required
              />
            </div>
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Terminal B"
                name="nodeB"
                onChange={(e) => UtilsUpdateChangeHandler(e, setUpdateFormData)}
                value={updateFormData.nodeB}
                required
              />
            </div>
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Vendor"
                name="vendor"
                onChange={(e) => UtilsUpdateChangeHandler(e, setUpdateFormData)}
                value={updateFormData.vendor}
                required
              />
            </div>
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="From"
                name="timeDown"
                onChange={(e) => UtilsUpdateChangeHandler(e, setUpdateFormData)}
                value={updateFormData.timeDown}
                required
              />
            </div>
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Site with power issue"
                name="OFCsiteWithPowerIssue"
                onChange={(e) => UtilsUpdateChangeHandler(e, setUpdateFormData)}
                value={updateFormData.OFCsiteWithPowerIssue}
              />
            </div>
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="By Whom"
                name="byWhom"
                onChange={(e) => UtilsUpdateChangeHandler(e, setUpdateFormData)}
                value={updateFormData.byWhom}
                required
              />
            </div>
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Cause of failure"
                name="COF"
                onChange={(e) => UtilsUpdateChangeHandler(e, setUpdateFormData)}
                value={updateFormData.COF}
                required
              />
            </div>
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Action taken"
                name="action"
                onChange={(e) => UtilsUpdateChangeHandler(e, setUpdateFormData)}
                value={updateFormData.action}
                required
              />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={updateLink}>
          Update entry
        </Button>{" "}
        <Button
          color="secondary"
          onClick={() => utilsToggle(null, setModal, modal)}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
