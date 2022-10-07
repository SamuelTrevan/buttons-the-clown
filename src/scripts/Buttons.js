import { partyRequests } from "./partiesReservations.js";
import { partyForm } from "./ServiceForm.js";

export const Buttons = () => {
  return `
      <h1>Buttons Party Clown</h1>
      <section class="serviceForm">
      ${partyForm()}
      </section>
  
      <section class="serviceRequests">
          <h2>Service Requests</h2>
          ${partyRequests()}
      </section>    
  </section>
      `;
};
