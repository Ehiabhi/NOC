const utilsUIUpdate = async (res) => {
  const jsonResponse = await res.json();
  const closedTicket = await jsonResponse.filter(
    (ticket) => ticket.timeUp !== ""
  );
  const openedTicket = await jsonResponse.filter(
    (ticket) => ticket.timeUp === ""
  );
  const orderedClosedTicket = sortDes(closedTicket, "timeUp");
  const orderedOpenedTicket = sortAsc(openedTicket, "timeDown");
  const reportTicketList = [...orderedOpenedTicket, ...orderedClosedTicket];
  return reportTicketList;
};

function sortAsc(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field] > b[field]) {
      return 1;
    }
    if (b[field] > a[field]) {
      return -1;
    }
    return 0;
  });
}

function sortDes(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field] > b[field]) {
      return -1;
    }
    if (b[field] > a[field]) {
      return 1;
    }
    return 0;
  });
}

export const UtilsUpdateChangeHandler = (e, stateUpdaterFunc) => {
  const name = e.target.name;
  const value = e.target.value;
  // console.log("Name " + name);
  // console.log("Value " + value);
  stateUpdaterFunc((prevState) => {
    return {
      ...prevState,
      [name]: typeof value === "string" ? value.toUpperCase() : value,
    };
  });
};

export const UtilsUpdateUI = async (response, stateUpdateFunc) => {
  const uio = await utilsUIUpdate(response);
  stateUpdateFunc(uio);
};

export const apiCaller = async (route, data, errMess) => {
  const response = await fetch(route, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = errMess + response.text;
    throw new Error(message);
  }

  // console.log(response);
  return response;
};
