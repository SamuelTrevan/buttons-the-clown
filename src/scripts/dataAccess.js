const applicationState = {
  clowns: [],
  partyRequests: [],
  completedParties: [],
};

const mainContainer = document.querySelector("#container");

export const fetchClowns = () => {
  return fetch(`http://localhost:8088/clowns`)
    .then((response) => response.json()) // this is a promis that when the api returns it will turn it into json
    .then((serviceRequests) => {
      //this is a promis that when the previous step on line 9 completes it will store the external state in application state
      applicationState.clowns = serviceRequests;
    });
};

export const fetchPartiesReservations = () => {
  return fetch(`http://localhost:8088/partyRequests`)
    .then((response) => response.json()) // this is a promis that when the api returns it will turn it into json
    .then((serviceRequests) => {
      //this is a promis that when the previous step on line 9 completes it will store the external state in application state
      applicationState.partyRequests = serviceRequests;
    });
};

export const fetchCompletedParties = () => {
  return fetch(`http://localhost:8088/completedParties`)
    .then((response) => response.json()) // this is a promis that when the api returns it will turn it into json
    .then((serviceRequests) => {
      //this is a promis that when the previous step on line 9 completes it will store the external state in application state
      applicationState.completedParties = serviceRequests;
    });
};

export const getClowns = () => {
  return applicationState.clowns.map((clown) => ({ ...clown }));
};
export const getPartyRequests = () => {
  return applicationState.partyRequests.map((partyRequest) => ({
    ...partyRequest,
  }));
};
export const getCompletedParties = () => {
  return applicationState.completedParties.map((completedParty) => ({
    ...completedParty,
  }));
};

export const deleteRequest = (id) => {
  return fetch(`http://localhost:8088/partyRequests/${id}`, {
    method: "DELETE",
  }).then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  });
};

export const sendPostCompletion = (userServiceRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userServiceRequest),
  };

  return fetch(`http://localhost:8088/completedParties`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const sendRequest = (userServiceRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userServiceRequest),
  };

  return fetch(`http://localhost:8088/partyRequests`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};
