import React from "react";

function EntryTable({ ticketList, toggle, closeTicket, deleteTicket }) {
  return (
    <>
      <table className="table" id="table">
        <thead>
          <tr>
            <th align="center">Terminal A</th>
            <th align="center">Terminal B</th>
            <th align="center">Vendor</th>
            <th align="center">Impact</th>
            <th align="center">Route</th>
            <th align="center">From</th>
            <th align="center">To</th>
            <th align="center">TTR</th>
            <th align="center">RDT</th>
            <th align="center">SITE ID WIth POWER FAILURE</th>
            <th align="center">PROBABLE/SPECIFIC CAUSE</th>
            <th align="center">ACTION TAKEN</th>
            <th align="center">BY WHOM</th>
            <th align="center">SUB SYSTEM</th>
            <th align="center"></th>
            <th align="center"></th>
            <th align="center"></th>
          </tr>
        </thead>
        <tbody>
          {ticketList.map((ticket) => {
            return (
              <tr
                key={ticket._id}
                className={ticket.timeUp !== "" ? "ticketUp" : undefined}
              >
                <td align="center">{ticket.nodeA}</td>
                <td align="center">{ticket.nodeB}</td>
                <td align="center">{ticket.vendor}</td>
                <td align="center">{ticket.impact}</td>
                <td align="center">{ticket.route}</td>
                <td align="center">{ticket.timeDown}</td>
                <td align="center">{ticket.timeUp}</td>
                <td align="center">{ticket.TTR}</td>
                <td align="center">{ticket.RDT}</td>
                <td align="center">{ticket.siteIDWithPowerFailure}</td>
                <td align="center">{ticket.COF}</td>
                <td align="center">{ticket.action}</td>
                <td align="center">{ticket.byWhom}</td>
                <td align="center">{ticket.subSystem}</td>
                <td align="center">
                  <button
                    className="btn btn-primary"
                    onClick={() => toggle(ticket._id)}
                  >
                    Update Link
                  </button>
                </td>
                <td align="center">
                  {ticket.timeUp === "" && (
                    <button
                      className="btn btn-outline-success"
                      onClick={() => closeTicket(ticket._id)}
                    >
                      Close Link
                    </button>
                  )}
                </td>
                <td align="center">
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
    </>
  );
}

export default EntryTable;
