import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  UtilsUpdateUI,
  UtilsUpdateChangeHandler,
  apiCaller,
} from "./Utilities";
import FormTable from "./FormTable";
import InputForm from "./InputForm";
import ExcelDownloader from "./ExcelDownloader";

export default function Failure() {
  const [ticketList, setTicketList] = useState([]);
  const [formData, setFormData] = useState({
    nodeA: "",
    nodeB: "",
    vendor: "",
    timeDown: "",
    timeUp: "",
    OFCsiteWithPowerIssue: "",
    byWhom: "",
    // deleteConfirm: false,
  });
  const [modal, setModal] = useState(false);
  const [hideTimeUp, setHideTimeUp] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    nodeA: "",
    nodeB: "",
    vendor: "",
    timeDown: "",
    timeUp: "",
    OFCsiteWithPowerIssue: "",
    byWhom: "",
    COF: "",
    action: "",
  });

  useEffect(() => {
    if (ticketList.length === 0) {
      getAllTicket();
    }
  });

  const toggle = (id, visible) => {
    if (id) {
      // Populate modal form with predefined values from ticketList state.
      setUpdateFormData(() => {
        const val = ticketList.find((entry) => entry._id === id);
        return {
          _id: id,
          nodeA: val.nodeA,
          nodeB: val.nodeB,
          vendor: val.vendor,
          timeDown: val.timeDown,
          // No need to set value of timeUp since it was never up.
          OFCsiteWithPowerIssue: val.OFCsiteWithPowerIssue,
          byWhom: val.byWhom,
          COF: val.COF,
          action: val.action,
        };
      });
    }
    setHideTimeUp(visible);
    setModal(!modal);
  };

  const updateLink = () => {
    apiCaller("/updateFailure", updateFormData, "Failed to update ticket, ")
      .then((response) => {
        if (response.status === 200) {
          UtilsUpdateUI(response, setTicketList);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
    toggle();
  };

  const registerFailure = (event, data) => {
    event.preventDefault();
    apiCaller("/registerFailure", data, "Failed to register ticket, ")
      .then((response) => {
        if (response.status === 200) {
          UtilsUpdateUI(response, setTicketList);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteTicket = (_id) => {
    if (!formData.deleteConfirm) {
      if (
        !window.confirm(
          "Are you sure you want to delete link?\nThis action is irreversible."
        )
      )
        return false;
    }
    const id = { _id: _id };
    apiCaller("/deleteTicket", id, "Failed to delete ticket, ")
      .then((response) => {
        if (response.status === 200) {
          UtilsUpdateUI(response, setTicketList);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getAllTicket = () => {
    apiCaller("/getTable", undefined, "Failed to fetch all ticket, ")
      .then((response) => {
        if (response.status === 200) {
          UtilsUpdateUI(response, setTicketList);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const closeTicket = (_id) => {
    const id = { _id: _id };
    const val = ticketList.find((entry) => entry._id === _id);

    if (val.timeUp !== "") {
      alert("Ticket has been declared up");
      return false;
    }

    if (val.COF.search("KNOW") !== -1 || val.action.search("STATE/TX") !== -1) {
      if (window.confirm("Do you want to update link?")) {
        toggle(_id);
      }
    }

    apiCaller("/closeTicket", id, "Failed to delete ticket, ")
      .then((response) => {
        if (response.status === 200) {
          UtilsUpdateUI(response, setTicketList);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <Modal isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>Update Link</ModalHeader>
        <ModalBody>
          <form
            className="form-horizontal"
            onSubmit={(e) => registerFailure(e, formData)}
            method="POST"
          >
            <div className="form-group">
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Terminal A"
                  name="nodeA"
                  onChange={(e) =>
                    UtilsUpdateChangeHandler(e, setUpdateFormData)
                  }
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
                  onChange={(e) =>
                    UtilsUpdateChangeHandler(e, setUpdateFormData)
                  }
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
                  onChange={(e) =>
                    UtilsUpdateChangeHandler(e, setUpdateFormData)
                  }
                  value={updateFormData.vendor}
                  required
                />
              </div>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  name="timeDown"
                  onChange={(e) =>
                    UtilsUpdateChangeHandler(e, setUpdateFormData)
                  }
                  value={updateFormData.timeDown}
                />
              </div>
              <div className="col-sm-12">
                <input
                  type="datetime-local"
                  className="form-control"
                  name="timeUp"
                  onChange={(e) =>
                    UtilsUpdateChangeHandler(e, setUpdateFormData)
                  }
                  value={updateFormData.timeUp}
                  hidden={hideTimeUp}
                  required
                />
              </div>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Site with power issue"
                  name="OFCsiteWithPowerIssue"
                  onChange={(e) =>
                    UtilsUpdateChangeHandler(e, setUpdateFormData)
                  }
                  value={updateFormData.OFCsiteWithPowerIssue}
                />
              </div>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="By Whom"
                  name="byWhom"
                  onChange={(e) =>
                    UtilsUpdateChangeHandler(e, setUpdateFormData)
                  }
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
                  onChange={(e) =>
                    UtilsUpdateChangeHandler(e, setUpdateFormData)
                  }
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
                  onChange={(e) =>
                    UtilsUpdateChangeHandler(e, setUpdateFormData)
                  }
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
          <Button color="secondary" onClick={() => toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <h1 className="text-center">Fiber Failure Management System</h1>
      <div className="row contact-form">
        <div className="col-sm-12">
          <InputForm
            UtilsUpdateChangeHandler={UtilsUpdateChangeHandler}
            setFormData={setFormData}
            formData={formData}
            registerFailure={registerFailure}
          />
          <ExcelDownloader ticketList={ticketList} />
          {ticketList.length === 0 ? (
            <h1 style={{ textAlign: "center" }}>
              There are no entries to display
            </h1>
          ) : (
            <FormTable
              ticketList={ticketList}
              toggle={toggle}
              closeTicket={closeTicket}
              deleteTicket={deleteTicket}
            />
          )}
        </div>
      </div>
    </>
  );
}
