// Initialize data storage
let data = JSON.parse(localStorage.getItem('formData')) || [];

// DOM Elements
const form = document.getElementById('dataForm');
const tableBody = document.querySelector('#dataTable tbody');

// Form submit handler
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const record = Object.fromEntries(formData);
    
    if (form.dataset.editIndex) {
        // Update existing record
        data[form.dataset.editIndex] = record;
        form.dataset.editIndex = '';
    } else {
        // Add new record
        data.push(record);
    }
    
    saveAndRender();
    form.reset();
});


function saveAndRender() {
    localStorage.setItem('formData', JSON.stringify(data));
    renderTable();
}

function renderTable() {
    tableBody.innerHTML = data.map((record, index) => `
        <tr>
            <td>${record.name}</td>
            <td>${record.email}</td>
            <td>${record.message}</td>
            <td>
                <div class="actions">
                    <button class="edit-btn" onclick="editRecord(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteRecord(${index})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}


function editRecord(index) {
    const record = data[index];
    form.name.value = record.name;
    form.email.value = record.email;
    form.message.value = record.message;
    form.dataset.editIndex = index;
}


function deleteRecord(index) {
    data.splice(index, 1);
    saveAndRender();
}

renderTable();
