import { sendRequest } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

export const partyForm = () => {
  let html = `
    <div class="field">
        <label class="label" for="parentName">Parent Name</label>
        <input type="text" name="parentName" class="input" />
    </div>
    
    <div class="field">
        <label class="label" for="childsName">Child's Name</label>
        <input type="text" name="childsName" class="input" />
    </div>

    <div class="field">
        <label class="label" for="partyAddress">Party Address</label>
        <input type="text" name="partyAddress" class="input" />
    </div>

    <div class="field">
        <label class="label" for="partyLength">Party Length (in hours)</label>
        <input type="number" name="partyLength" class="input" />
    </div>

    <div class="field">
        <label class="label" for="partyDate">Date of Party</label>
        <input type="date" name="partyDate" class="input" />
    </div>

    <div class="field">
    <label class="label" for="numberOfAttendes">Number of Children Attending</label>
    <input type="number" name="numberOfAttendes" class="input" />
</div>

<button class="button" id="submitRequest">Submit Request</button>`;

  return html;
};

mainContainer.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "submitRequest") {
    // Get what the user typed into the form fields
    const userParentName = document.querySelector(
      "input[name='parentName']"
    ).value;
    const userChildsName = document.querySelector(
      "input[name='childsName']"
    ).value;
    const userPartyAddress = document.querySelector(
      "input[name='partyAddress']"
    ).value;
    const userPartyLength = document.querySelector(
      "input[name='partyLength']"
    ).value;
    const userPartyDate = document.querySelector(
      "input[name='partyDate']"
    ).value;
    const userNumberOfAttendes = document.querySelector(
      "input[name='numberOfAttendes']"
    ).value;

    // Make an object out of the user input
    const dataToSendToAPI = {
      parentName: userParentName,
      childsName: userChildsName,
      partyAddress: userPartyAddress,
      partyLength: userPartyLength,
      PartyDate: userPartyDate,
      numberOfAttendes: userNumberOfAttendes,
    };

    // Send the data to the API for permanent storage
    sendRequest(dataToSendToAPI);
  }
});
