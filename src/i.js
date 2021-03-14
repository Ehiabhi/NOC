import React, { useEffect, useState } from "react";
import ReactExport from "react-export-excel";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function Failure() {
  const [ticketList, setTicketList] = useState([]);
  const [formData, setFormData] = useState({
    nodeA: "",
    nodeB: "",
    vendor: "",
    timeDown: "",
    OFCsiteWithPowerIssue: "",
    byWhom: "",
  });
  const [updateFormData, setUpdateFormData] = useState({
    nodeA: "",
    nodeB: "",
    vendor: "",
    timeDown: "",
    OFCsiteWithPowerIssue: "",
    byWhom: "",
  });
  const [modal, setModal] = useState(false);

  const toggle = (id) => {
    if (id) {
      setUpdateFormData(() => {
        const val = ticketList.find((entry) => entry._id === id);
        return {
          nodeA: val.nodeA,
          nodeB: val.nodeB,
          vendor: val.vendor,
          timeDown: val.timeDown,
          OFCsiteWithPowerIssue: val.OFCsiteWithPowerIssue,
          byWhom: val.byWhom,
        };
      });
    }
    setModal(!modal);
  };

  useEffect(() => {
    if (ticketList.length === 0) {
      getAllTicket();
    }
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: typeof value === "string" ? value.toUpperCase() : value,
      };
    });
  };

  const updateChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateFormData((prevState) => {
      return {
        ...prevState,
        [name]: typeof value === "string" ? value.toUpperCase() : value,
      };
    });
  };

  const updateUi = (res) => {
    res &&
      res.json().then((data) => {
        const reversedData = data.reverse();
        setTicketList(reversedData);
      });
  };

  const registerFailure = (event, data) => {
    event.preventDefault();
    fetch("/registerFailure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          updateUi(response);
        }
      })
      .catch((err) => {
        alert("Failed to register ticket, " + err);
      });
  };

  const deleteTicket = (_id) => {
    const id = { _id: _id };
    fetch("/deleteTicket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    })
      .then((response) => {
        if (response.status === 200) {
          updateUi(response);
        }
      })
      .catch((err) => {
        alert("Failed to delete ticket, " + err);
      });
  };

  const updateLink = (_id) => {
    toggle();
  };

  const getAllTicket = () => {
    fetch("/getTable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status === 200) {
          updateUi(response);
        }
      })
      .catch((err) => {
        alert("Failed to fetch all ticket, " + err);
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
                  id="fullname"
                  placeholder="Terminal A"
                  name="nodeA"
                  onChange={(e) => updateChangeHandler(e)}
                  value={updateFormData.nodeA}
                  required
                />
              </div>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  placeholder="Terminal B"
                  name="nodeB"
                  onChange={(e) => updateChangeHandler(e)}
                  value={updateFormData.nodeB}
                  required
                />
              </div>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  placeholder="Vendor"
                  name="vendor"
                  onChange={(e) => updateChangeHandler(e)}
                  value={updateFormData.vendor}
                  required
                />
              </div>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  placeholder="From"
                  name="timeDown"
                  onChange={(e) => updateChangeHandler(e)}
                  value={updateFormData.timeDown}
                  required
                />
              </div>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  placeholder="Site with power issue"
                  name="OFCsiteWithPowerIssue"
                  onChange={(e) => updateChangeHandler(e)}
                  value={updateFormData.OFCsiteWithPowerIssue}
                />
              </div>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  placeholder="By Whom"
                  name="byWhom"
                  onChange={(e) => updateChangeHandler(e)}
                  value={updateFormData.byWhom}
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
      <h1>Register Failure</h1>
      <div className="row contact-form">
        <div className="col-sm-12">
          <form
            className="form-horizontal"
            onSubmit={(e) => registerFailure(e, formData)}
            method="POST"
          >
            <div className="form-group">
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  placeholder="Terminal A"
                  name="nodeA"
                  onChange={(e) => onChangeHandler(e)}
                  value={formData.nodeA}
                  required
                />
              </div>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  placeholder="Terminal B"
                  name="nodeB"
                  onChange={(e) => onChangeHandler(e)}
                  value={formData.nodeB}
                  required
                />
              </div>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  placeholder="Vendor"
                  name="vendor"
                  onChange={(e) => onChangeHandler(e)}
                  value={formData.vendor}
                  required
                />
              </div>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  placeholder="From"
                  name="timeDown"
                  onChange={(e) => onChangeHandler(e)}
                  value={formData.timeDown}
                  required
                />
              </div>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  placeholder="Site with power issue"
                  name="OFCsiteWithPowerIssue"
                  onChange={(e) => onChangeHandler(e)}
                  value={formData.OFCsiteWithPowerIssue}
                />
              </div>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  placeholder="By Whom"
                  name="byWhom"
                  onChange={(e) => onChangeHandler(e)}
                  value={formData.byWhom}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-12">
                <button
                  type="submit"
                  className="btn btn-outline-success form-button"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          <ExcelFile
            filename="OFC REPORT"
            element={
              ticketList.length === 0 ? null : (
                <div className="mb-3">
                  <div className="col-sm-offset-2 col-sm-12">
                    <button className="btn btn-outline-success form-button">
                      Download Excel File
                    </button>
                  </div>
                </div>
              )
            }
          >
            <ExcelSheet data={ticketList} name="FIBRE_SWITCH">
              <ExcelColumn label="S/N" value="" />
              <ExcelColumn label="TERMINAL A" value="nodeA" />
              <ExcelColumn label="TERMINAL B" value="nodeB" />
              <ExcelColumn label="VENDOR" value="vendor" />
              <ExcelColumn label="IMPACT" value="impact" />
              <ExcelColumn label="ROUTE" value="route" />
              <ExcelColumn label="FROM (DATE & TIME)" value="timeDown" />
              <ExcelColumn label="TO (DATE & TIME)" value="timeUp" />
              <ExcelColumn label="TTR (HRS)" value="TTR" />
              <ExcelColumn label="RDT (HRS)" value="RDT" />
              <ExcelColumn
                label="SITE ID OF OFC ISSUE WITH POWER"
                value="siteIDWithPowerFailure"
              />
              <ExcelColumn label="PROBLEM/SPECIFIC CAUSE" value="COF" />
              <ExcelColumn label="ACTION TAKEN" value="action" />
              <ExcelColumn label="BY WHOM" value="byWhom" />
              <ExcelColumn label="SUBSYSTEM" value="subSystem" />
            </ExcelSheet>
          </ExcelFile>
          {ticketList.length === 0 ? (
            <h1 style={{ textAlign: "center" }}>
              There are no entries to display
            </h1>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Terminal A</th>
                  <th>Terminal B</th>
                  <th>Vendor</th>
                  <th>Impact</th>
                  <th>Route</th>
                  <th>From</th>
                  <th>To</th>
                  <th>TTR</th>
                  <th>RDT</th>
                  <th>SITE ID WITH POWER FAILURE</th>
                  <th>PROBABLE/SPECIFIC CAUSE</th>
                  <th>ACTION TAKEN</th>
                  <th>BY WHOM</th>
                  <th>SUB SYSTEM</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ticketList.map((ticket) => {
                  return (
                    <tr key={ticket._id}>
                      <td>{ticket.nodeA}</td>
                      <td>{ticket.nodeB}</td>
                      <td>{ticket.vendor}</td>
                      <td>{ticket.impact}</td>
                      <td>{ticket.route}</td>
                      <td>{ticket.timeDown}</td>
                      <td>{ticket.timeUp}</td>
                      <td>{ticket.TTR}</td>
                      <td>{ticket.RDT}</td>
                      <td>{ticket.siteIDWithPowerFailure}</td>
                      <td>{ticket.COF}</td>
                      <td>{ticket.action}</td>
                      <td>{ticket.byWhom}</td>
                      <td>{ticket.subSystem}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => toggle(ticket._id)}
                        >
                          Update Link
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => deleteTicket(ticket._id)}
                        >
                          Close Link
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteTicket(ticket._id)}
                        >
                          Delete Link
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
