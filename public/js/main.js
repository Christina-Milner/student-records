const addStudentBtn = document.querySelector('#addStudent')
const addUserBtn = document.querySelector('#addUser')


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
