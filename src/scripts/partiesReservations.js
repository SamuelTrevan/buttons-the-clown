import {
  getClowns,
  getCompletedParties,
  getPartyRequests,
  deleteRequest,
  sendPostCompletion,
} from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

export const partyRequests = () => {
  const completions = getCompletedParties();
  const requests = getPartyRequests();
  const completedRequests = requests.filter((requestObj) =>
    completions.find((completion) => completion.id === requestObj.id)
  );
  const imcompleteRequest = requests.filter(
    (requestObj) =>
      !completions.find((completion) => completion.id === requestObj.id)
  );

  let html = `
          <ul>
              ${imcompleteRequest.map(incomplete).join("")}
              ${completedRequests.map(completed).join("")}
          </ul>
      `;

  return html;
};

const completed = (requestObj) => {
  return `<li class="completed">${requestObj.childsName}'s Party at ${requestObj.partyAddress}
                    <button class="request_delete"
                     id="request--${requestObj.id}">
                    Delete
                    </button>
                      </li>`;
};

const incomplete = (requestObj) => {
  const clowns = getClowns();
  return `<li>${requestObj.childsName}'s Party at ${requestObj.partyAddress}
    <select class="clowns" id="clowns">
    <option value="">Choose</option>
    ${clowns
      .map((clown) => {
        return `<option value="${requestObj.id}--${clown.id}">${clown.name}</option>`;
      })
      .join("")}
      </select>
      
      <button class="request__delete" id="request--${requestObj.id}">
        Delete
      </button>
            </li>`;
};

mainContainer.addEventListener("change", (event) => {
  if (event.target.id === "clowns") {
    const [requestId, clownId] = event.target.value.split("--");
    const completion = {
      requestId: parseInt(requestId),
      clownId: parseInt(clownId),
      date_created: Date.now(),
    };
    sendPostCompletion(completion);
  }
});

mainContainer.addEventListener("click", (click) => {
  if (click.target.id.startsWith("request--")) {
    const [, requestId] = click.target.id.split("--");
    deleteRequest(parseInt(requestId));
  }
});
