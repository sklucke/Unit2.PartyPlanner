const API_URL ="https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FTB-MT-WEB-PT/events";

const state = {
    events: [],
};

// ******************* Selectors*************
const partyList = document.querySelector("#parties");
const addPartyForm = document.querySelector("addParty");

async function render() {
  await getParties();
  renderParties();
}

render();

async function getParties() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.parties =json.data;
  } catch (error) {
    console.error(error);
  }
    
}

function renderParties() {
  if (!state.parties.length) {
    partyList.innerHTML = "<li>No parties.</li>";
    return;
  }

  const partyCards = state.parties.map((party) => {
    const partCard =document.createElement("li");
    partyCards.innerHTML = `
    <h2>${party.name}</h2>
    <p>${party.date}</p>
    <p>${party.location}</p>
    <p>${party.description}</p>
    `;
    const deletButton = document.createElement("button");
    deleteButton.textContent = "Delete Party";
    partyCard.append(deleteButton);
    deletButton.addEventListener("click", () => deleteParty(party.id));
    return partyCard;
  });
  partyList.replaceChildren(...partyCards);
  
}

async function addParty(event) {
  event.preventDefault();
  try {
    const response =await fetch(API_URL,{
      method: "post",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        name: addPartyForm.name.value,
        date: addPartyForm.dateTime.value
        location: addPartyForm.location.value,
        description: addPartyForm.description.value,
      })
    });

    if (!response.ok) {
      throw new Error("Failed to create Party");
    } else {
      addPartyForm.name.value = "";
      addPartyForm.date.value = "";
      addPartyForm.location.value = "";
      addPartyForm.description.value = "";
    }
    render();
  } catch (error) {
    console.error(error);
  }
}

async function deleteParty(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Party could not be deleted!");
    }
    render();
  } catch (error) {
    console.error(error, "There was an error /Delete party");
  }
}
      





  
  


