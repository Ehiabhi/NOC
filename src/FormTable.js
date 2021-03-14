import React from "react";

export default function FormTable({
  ticketList,
  toggle,
  closeTicket,
  deleteTicket,
}) {
  return (
    <table className="table text-center">
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
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {ticketList.map((ticket) => {
          return (
            <tr
              key={ticket._id}
              style={{
                color: ticket.timeUp !== "" && "blue",
                fontWeight: ticket.timeUp !== "" && "bold",
              }}
            >
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
                  className="btn btn-primary"
                  onClick={() => toggle(ticket._id, true)}
                >
                  Update Link
                </button>
              </td>
              <td>
                {ticket.timeUp === "" && (
                  <button
                    className="btn btn-outline-success"
                    onClick={() => closeTicket(ticket._id)}
                  >
                    Close Link
                  </button>
                )}
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
  );
}
