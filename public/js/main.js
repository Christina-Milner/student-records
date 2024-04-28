const addStudentBtn = document.querySelector('#addStudent')
const addUserBtn = document.querySelector('#addUser')
/*
document.addEventListener('DOMContentLoaded', function() {
    const students = document.querySelectorAll('.student')
    if (students) {
        students.forEach(e => {
            e.addEventListener('click', viewStudent)
        }) 
    }
 }, false);
*/

if (addStudentBtn) {
    addStudentBtn.addEventListener('click', openAddStudentForm)
}

if (addUserBtn) {
    addUserBtn.addEventListener('click', openAddUserForm)
}

function openAddStudentForm() {
    document.querySelector('#addStudentBox').classList.remove('hidden')
}

function openAddUserForm() {
    document.querySelector('#addUserBox').classList.remove('hidden')
}


function viewStudent() {
    alert("Hello")
}