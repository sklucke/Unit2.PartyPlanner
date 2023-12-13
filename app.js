const API_URL ="https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FTB-MT-WEB-PT/events";

const state = {
    events: [],
};

// ******************* Selectors*************
const partyPlanner = document.querySelector("#addEvent");
const partyPlanner2 = document.querySelector("#events");

async function getPlanner() {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      console.log("json", json.data);
      state.recipes = json.data;
    } catch (error) {
      console.error(error, "There was an error /GET recipes");
    }
  }

  getPlanner()
  
