
function resetInput() {
    let formElement = document.querySelector('.form');
    let inputElement = formElement.querySelectorAll('.form-input');
    for (let i = 0; i < inputElement.length; i++) {
        inputElement[i].value = "";
    }
}
function validateInput (){
    let formElement = document.querySelector('.form');
    let inputElement = formElement.querySelectorAll('.form-input');
    for (let i = 0; i < inputElement.length; i++) {
        if (inputElement[i].value === "") {
            inputElement[i].parentElement.querySelector('.error-message').innerText = `Please enter your ${inputElement[i].id}`;                                 
        }else
            inputElement[i].parentElement.querySelector('.error-message').innerText = "";
    }
}
function hiddenErrorMessage() {
    let errorElement = document.querySelectorAll('.error-message');
    for (let i = 0; i < errorElement.length; i++) {
        errorElement[i].innerText = "";
    }
}
function addNew(){
    validateInput();
    let formElement = document.querySelector('.form');
    let errorElement = formElement.querySelectorAll(".error-message");
    let arrErrorElement = [];
    for (let i = 0; i < errorElement.length; i++){
        // console.log(errorElement[i].innerText);
        arrErrorElement.push(errorElement[i].innerText);
       
    }
   let checkErrorElement = arrErrorElement.every(value => value ==="");
   if(checkErrorElement){
    let name = document.getElementById('name').value;
    let address = document.getElementById("address").value;
    // console.log( `name:`+ name, `address:` + address);

    let listStudent = localStorage.getItem("list-Student")
      ? JSON.parse(localStorage.getItem("list-Student"))
      : [];
    listStudent.push({
        name: name,
        address: address
    });
    localStorage.setItem("list-Student", JSON.stringify(listStudent));
   } 
   resetInput();
   renderStudent();
}
function renderStudent(){
    let listStudent = localStorage.getItem("list-Student")
      ? JSON.parse(localStorage.getItem("list-Student"))
      : [];
    let student =  `<tr>
        <th>ID</th>
        <th>Name</th>
        <th>Address</th>
        <th>Action</th>
    </tr>`;
    listStudent.forEach((value, index) => {
        student += `
        <tr>
            <td>${index + 1}</td>   
            <td>${value.name}</td>
            <td>${value.address}</td>
            <td>
            <button onclick = "editStudent(${index})">Edit</button>
            <button onclick = "deleteStudent()">Delete</button>
            </td>
        </tr>`;
    })
    
    document.getElementById('tableContent').innerHTML = student;
    
}
function editStudent(index){
    let listStudent = localStorage.getItem("list-Student")
      ? JSON.parse(localStorage.getItem("list-Student"))
      : [];
    document.getElementById('name').value = listStudent[index].name;
    document.getElementById("address").value = listStudent[index].address;

    document.getElementById('index').value = index;

    document.getElementById("save").style.display = "none";
    document.getElementById("update").style.display = "inline-block";
}
function changeStudent(){
    let listStudent = localStorage.getItem("list-Student")
      ? JSON.parse(localStorage.getItem("list-Student"))
      : [];
    let index = document.getElementById('index').value;
    listStudent[index] = {
        name: document.getElementById('name').value,
        address: document.getElementById("address").value
    }
    localStorage.setItem("list-Student", JSON.stringify(listStudent));
    renderStudent();
    
    document.getElementById("save").style.display = "inline-block";
    document.getElementById("update").style.display = "none";
    resetInput();
    hiddenErrorMessage();
}
function deleteStudent(){
    let listStudent = localStorage.getItem("list-Student")
      ? JSON.parse(localStorage.getItem("list-Student"))
      : [];
    let index = document.getElementById('index').value;
    listStudent.splice(index, 1);
    localStorage.setItem("list-Student", JSON.stringify(listStudent));
    renderStudent();
    resetInput();
    hiddenErrorMessage();
}

const buttonAddNew = document.getElementById('save');
buttonAddNew.addEventListener("click", addNew);

const buttonUpdate = document.getElementById("update");
buttonUpdate.addEventListener("click", changeStudent);

// onclick = "validateInput()";