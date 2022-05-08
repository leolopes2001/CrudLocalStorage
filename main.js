const isValid = () => {
  return document.querySelector("#form").reportValidity();
};

const getDataBase = () => {
  return JSON.parse(localStorage.getItem("database")) ?? [];
};
const postDataBase = (database) => {
  localStorage.setItem("database", JSON.stringify(database));
};

document.querySelector("#add_btn").addEventListener("click", () => {
  if (isValid()) {
    const newClient = {
      name: document.querySelector("#input_name").value,
      email: document.querySelector("#input_email").value,
      number: document.querySelector("#input_number").value,
      city: document.querySelector("#input_city").value,
    };

    const newOrId = document.getElementById("input_name").dataset.index;

    if (newOrId === "new") {
      console.log("entrei 1");
      console.log(newClient);
      add_new_client(newClient);
      open_Or_close()
    } else {
      console.log("entrei 2");
      let index = +newOrId;
      edit_client_2(newClient, index);
      open_Or_close()
    }
    document.getElementById("input_name").dataset.index = "new"
  }
});
const show_all_clients = () => {
  document.querySelector("#all_clients").innerHTML = "";

  getDataBase().forEach((client, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.number}</td>
        <td>${client.city}</td>
        <td>
          <button type="button" class="button green" id="edit-${index}">editar</button>
          <button type="button" class="button red" id="delete-${index}">excluir</button>
        </td>`;
    document.querySelector("#all_clients").appendChild(tr);
  });
};

const clear_fields = () => {
  document.querySelector("#input_name").value = "";
  document.querySelector("#input_email").value = "";
  document.querySelector("#input_number").value = "";
  document.querySelector("#input_city").value = "";
};

const delete_client = (index) => {
  const database = getDataBase();
  database.splice(index, 1);
  postDataBase(database);
  show_all_clients();
};
const edit_client_2 = (client, index) => {
  const database = getDataBase();
  database[index] = client;
  postDataBase(database);
  show_all_clients();
};
const add_new_client = (newClient) => {
  const database = getDataBase();
  database.push(newClient);
  postDataBase(database);
  
  show_all_clients();
};

function open_Or_close() {
  document.querySelector(".modal").classList.toggle("active");
  clear_fields();
}
function fill_fields(client, id) {
  document.getElementById("input_name").value = client.name;
  document.getElementById("input_email").value = client.email;
  document.getElementById("input_number").value = client.number;
  document.getElementById("input_city").value = client.city;
  document.getElementById("input_name").dataset.index = id;
}

const edit_client_1 = (id) => {
  const database = getDataBase();
  const client = database[id];
  fill_fields(client, id);
};

document.querySelector(".records").addEventListener("click", (e) => {
  if (e.target.type === "button") {
    const type_and_id = e.target.id.split("-");
    const type = type_and_id[0];
    const id = +type_and_id[1];

    if (type === "delete") {
      delete_client(id);
    }

    if (type === "edit") {
      open_Or_close();
      edit_client_1(id);
    }
  }
});

document.querySelector(".modal-close").addEventListener("click", open_Or_close);
document.querySelector("#cancel").addEventListener("click", open_Or_close);
document
  .querySelector("#cadastrarCliente")
  .addEventListener("click", open_Or_close);

show_all_clients();
