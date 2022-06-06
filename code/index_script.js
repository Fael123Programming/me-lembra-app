const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlayDiv = document.getElementById('overlay-div');

openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = document.querySelector(btn.dataset.modalTarget);
        openModal(modal);
    })
});

closeModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        closeModal(modal);
    });
});

function openModal(modal) {
    if (modal == null) {
        return;
    }
    modal.classList.add('active');
    overlayDiv.classList.add('active');
    setDeadline();
    setTitleInputAsFocused();
}

function closeModal(modal) {
    if (modal == null) {
        return;
    }
    modal.classList.remove('active');
    overlayDiv.classList.remove('active');
    emptyModalForm();
}

function emptyModalForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}

function setDeadline() {
    const date = new Date();
    const formattedCurrentDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
    const deadline = document.getElementById('deadline');
    deadline.value = formattedCurrentDate;
    deadline.min = formattedCurrentDate;
} 

function setTitleInputAsFocused() {
    document.getElementById('title').focus();
}

function saveTask() {
    const title = document.getElementById('title').value.toString();
    const description = document.getElementById('description').value.toString();
    const deadline = document.getElementById('deadline').value.toString(); 
    if (isDataInvalid(title, description)) {
        return; //Do not save the task.
    }
}

function isDataInvalid(title, description) {
    if (title.length == 0 || description.length == 0) {
        return true;
    }
    if (title.trim().length == 0) {
        window.alert('A not empty title is required');
        return true;
    }
    if (description.trim().length == 0) {
        window.alert('A not empty description is required');
        return true;
    }
    return false;
}