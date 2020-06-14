//Create link with user name
//Create delete user button
//Create 'Create Bill Group' button
//Create View Bill Groups button
export let addUserList = {};
addUserList.resArray = [];

addUserList.addDOMElements = function () {
  //For each object, get property and store in li with same ID
  let list = document.getElementById("user-list");
  this.resArray.forEach((object) => {
    console.log("first name", object.firstName);
    console.log("last name", object.lastName);

    //Create link with user name
    let hrefNode = document.createElement("a");
    hrefNode.href = "user-details.html";
    let listItem = document.createElement("li");
    listItem.setAttribute("class", "user-list-item");
    hrefNode.appendChild(listItem);
    let textnode = document.createTextNode(
      `${object.firstName} ${object.lastName}`,
    );
    listItem.appendChild(textnode);
    list.appendChild(hrefNode);

    //Create delete button
    let deleteButton = document.createElement("button");
    // let buttonId = `${object.firstName}${object.lastName}`;
    // deleteButton.setAttribute('id', buttonId);
    deleteButton.setAttribute("class", "delete-user-button");
    let textnode2 = document.createTextNode("Delete");
    deleteButton.appendChild(textnode2);
    list.appendChild(deleteButton);

    //Create 'Create Bill Group' button
    let createBillGroupButton = document.createElement("button");
    let textnode3 = document.createTextNode("Create Bill Group");
    createBillGroupButton.appendChild(textnode3);
    createBillGroupButton.setAttribute("class", "create-bill-group-button");
    list.appendChild(createBillGroupButton);
    createBillGroupButton.firstName = object.firstName;
    createBillGroupButton.lastName = object.lastName;
  });
};
