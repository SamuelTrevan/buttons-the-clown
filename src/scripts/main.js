import {
  fetchClowns,
  fetchCompletedParties,
  fetchPartiesReservations,
} from "./dataAccess.js";
import { Buttons } from "./Buttons.js";

const mainContainer = document.querySelector("#container");

const render = () => {
  fetchPartiesReservations()
    .then(() => fetchClowns())
    .then(() => fetchCompletedParties())
    .then(() => {
      mainContainer.innerHTML = Buttons();
    });
};

render();

mainContainer.addEventListener("stateChanged", (customEvent) => {
  render();
});
