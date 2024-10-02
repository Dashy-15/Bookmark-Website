function formSubmit(event) {
    event.preventDefault();
    const details = {
        title: event.target.title.value,
        url: event.target.url.value
    };

    axios
    .post("https://crudcrud.com/api/a7c69f72dc4b4737a712310016929713/bookmark", details)
    .then((response) => displayOnScreen(response.data))
    .catch((error) => console.log(error));

    document.getElementById("title").value = "";
    document.getElementById("url").value = "";

}

function displayOnScreen(details) {
    const list = document.createElement("li");
    list.setAttribute("id", details._id);

    list.appendChild(document.createTextNode(`${details.title}: `));

    const link = document.createElement("a");
    link.href = details.url;
    link.target = "_blank";
    link.textContent = `${details.url} `;

    list.appendChild(link);

    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    list.appendChild(editBtn);

    const dltBtn = document.createElement("button");
    dltBtn.appendChild(document.createTextNode("Delete"));
    list.appendChild(dltBtn);

    const ul = document.getElementById("expense-list");
    ul.appendChild(list);

    editBtn.addEventListener("click", function(event) {
        const editId = list.getAttribute("id");
        axios
        .delete(`https://crudcrud.com/api/a7c69f72dc4b4737a712310016929713/bookmark/${editId}`)
        .then(() => {
            ul.removeChild(event.target.parentElement);
            document.getElementById("title").value = details.title;
            document.getElementById("url").value = details.url;
        })
        .catch((error) => console.log(error))
    });

    dltBtn.addEventListener("click", function(event) {
        const dltId = list.getAttribute("id");
        axios
        .delete(`https://crudcrud.com/api/a7c69f72dc4b4737a712310016929713/bookmark/${dltId}`)
        .then(() => {
            ul.removeChild(event.target.parentElement);
        })
        .catch((error) => console.log(error))
    });
}

window.addEventListener("DOMContentLoaded", () => {
    axios
    .get("https://crudcrud.com/api/a7c69f72dc4b4737a712310016929713/bookmark")
    .then((response) => {
        for(var i=0; i<response.data.length; i++) {
            displayOnScreen(response.data[i]);
        }
    })
    .catch((error) => console.log(error));
});