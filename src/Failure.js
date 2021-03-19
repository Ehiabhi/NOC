import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  UtilsUpdateUI,
  UtilsUpdateChangeHandler,
  apiCaller,
} from "./Utilities";
import EntryTable from "./EntryTable";
import InputForm from "./InputForm";
import ExcelDownloader from "./ExcelDownloader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RestoreIcon from "@material-ui/icons/Restore";
import anime from "animejs/lib/anime.es";

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
  let [hideTimeUp, setHideTimeUp] = useState(true);
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

  const toggle = (id) => {
    if (id) {
      // Populate modal form with predefined values from ticketList state.
      setUpdateFormData(() => {
        const val = ticketList.find((entry) => entry._id === id);

        if (val) {
          val.timeUp !== "" ? setHideTimeUp(false) : setHideTimeUp(true);
        }

        return {
          _id: id,
          nodeA: val.nodeA,
          nodeB: val.nodeB,
          vendor: val.vendor,
          timeDown: val.timeDown,
          // No need to update form with value of timeUp since it may be changed.
          OFCsiteWithPowerIssue: val.OFCsiteWithPowerIssue,
          byWhom: val.byWhom,
          COF: val.COF,
          action: val.action,
        };
      });
    }

    setModal(!modal);
  };

  const updateLink = () => {
    apiCaller("/updateFailure", updateFormData, "Failed to update ticket, ")
      .then((response) => {
        if (response.status === 200) {
          UtilsUpdateUI(response, setTicketList);
          notify("Ticket updated successfully", "success");
        }
      })
      .catch((err) => {
        notify("Ticket could not be updated", "error");
        console.log(err.message);
      });
    toggle();
  };

  const registerFailure = (event, data) => {
    event.preventDefault();
    apiCaller("/registerFailure", data, "Failed to register ticket, ")
      .then((response) => {
        if (response.status === 200) {
          UtilsUpdateUI(response, setTicketList);
          notify("Ticket add successfully", "success");
        }
      })
      .catch((err) => {
        notify("Ticket could not be added", "error");
        console.log(err.message);
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
          notify("Ticket deleted successfully", "info");
        }
      })
      .catch((err) => {
        notify("Ticket could not be deleted", "error");
        console.log(err.message);
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
        notify("Tickets could not be fetched from database", "warning");
        console.log(err.message);
      });
  };

  const closeTicket = (_id) => {
    const id = { _id: _id };
    const val = ticketList.find((entry) => entry._id === _id);

    if (val.COF.search("KNOW") !== -1 || val.action.search("STATE/TX") !== -1) {
      if (window.confirm("Do you want to update link?")) {
        toggle(_id);
      }
    }

    apiCaller("/closeTicket", id, "Failed to delete ticket, ")
      .then((response) => {
        if (response.status === 200) {
          UtilsUpdateUI(response, setTicketList);
          notify("Ticket closed successfully", "success");
        }
      })
      .catch((err) => {
        notify("Ticket could not be closed", "error");
        console.log(err.message);
      });
  };

  const handleDoubleClick = () => {
    document.getElementById("restore").style.display = "none";
    anime({
      targets: document.getElementById("restore"),
      left: "0px",
      duration: 5000,
    });
    document.getElementById("_dis1").style.display = "block";
    document.getElementById("_dis2").style.display = "block";
    document.getElementById("table_row").style.minHeight = "50vh";
  };

  const hideElements = () => {
    const test = document.getElementById("_dis1").style.display !== "none";
    document.getElementById("_dis1").style.display = "none";
    document.getElementById("_dis2").style.display = "none";
    document.getElementById("table_row").style.minHeight = "80vh";

    if (test) {
      document.getElementById("restore").style.display = "block";
      anime({
        targets: document.getElementById("restore"),
        left: "240px",
        duration: 1500,
      });
      setTimeout(
        () =>
          alert(
            "Click on the restore button at the bottom right corner to restore form and buttons."
          ),
        3000
      );
    }
  };

  const notify = (mess, state) => toast[state](mess);

  return (
    <div className="container" id="wrapper" onDoubleClick={handleDoubleClick}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
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
      <div className="row">
        <div className="col-xs-12" id="major_header">
          <h1>Fiber Failure Management System</h1>
        </div>
      </div>
      <div className="row" id="_dis1">
        <div className="col-xs-12 col-md-6">
          <InputForm
            UtilsUpdateChangeHandler={UtilsUpdateChangeHandler}
            setFormData={setFormData}
            formData={formData}
            registerFailure={registerFailure}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12" id="download_btn">
          <ExcelDownloader ticketList={ticketList} />
        </div>
      </div>
      <button id="restore" onClick={handleDoubleClick}>
        <RestoreIcon />
      </button>
      <div
        onScroll={window.innerWidth <= 960 ? hideElements : undefined}
        className="row table_row"
        id="table_row"
      >
        <div className="col-xs-12 table_info">
          {ticketList.length === 0 ? (
            <h1>There are no entries to display</h1>
          ) : (
            <EntryTable
              ticketList={ticketList}
              toggle={toggle}
              closeTicket={closeTicket}
              deleteTicket={deleteTicket}
            />
          )}
        </div>
      </div>
    </div>
  );
}
