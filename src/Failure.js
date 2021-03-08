import React, { useEffect, useState } from "react";

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

  const downloadExcelFile = (e) => {
    e.preventDefault();
    fetch("/downloadFile", {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Download started");
        }
      })
      .catch((err) => {
        alert("Failed to fetch all ticket, " + err);
      });
  };

  return (
    <>
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
          {/* <form
            className="form-horizontal"
            onSubmit={(e) => downloadExcelFile(e)}
            method="POST"
          >
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-12">
                <button
                  type="submit"
                  className="btn btn-outline-success form-button"
                >
                  Download Excel File
                </button>
              </div>
            </div>
          </form> */}
          <a href="/downloadFile" download>
            Download File
          </a>
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
                          className="btn btn-outline-danger"
                          onClick={() => deleteTicket(ticket._id)}
                        >
                          Delete Ticket
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
