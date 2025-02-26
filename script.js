let spareParts = JSON.parse(localStorage.getItem('spareParts')) || {};

document.getElementById('sparePartForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const unitPrice = document.getElementById('unitPrice').value;
    const quantity = document.getElementById('quantity').value;
    const supplier = document.getElementById('supplier').value;

    addSparePart(id, name, description, unitPrice, quantity, supplier);
    document.getElementById('sparePartForm').reset();
});

function addSparePart(id, name, description, unitPrice, quantity, supplier) {
    spareParts[id] = {
        name: name,
        description: description,
        unitPrice: unitPrice,
        quantity: quantity,
        supplier: supplier
    };
    localStorage.setItem('spareParts', JSON.stringify(spareParts));
    alert('Spare part added successfully!');
    getAllSpareParts(); // Refresh the list after adding
}

function getAllSpareParts() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
    for (const [id, part] of Object.entries(spareParts)) {
        const partInfo = document.createElement('div');
        partInfo.innerHTML = `
            <p>ID: ${id}</p>
            <p>Name: ${part.name}</p>
            <p>Description: ${part.description}</p>
            <p>Unit Price: ${part.unitPrice}</p>
            <p>Quantity: ${part.quantity}</p>
            <p>Supplier: ${part.supplier}</p>
            <button onclick="deleteSparePart('${id}')">Delete</button>
            <hr>
        `;
        outputDiv.appendChild(partInfo);
    }
}

function deleteSparePart(id) {
    if (confirm('Are you sure you want to delete this spare part?')) {
        delete spareParts[id];
        localStorage.setItem('spareParts', JSON.stringify(spareParts));
        alert('Spare part deleted successfully!');
        getAllSpareParts(); // Refresh the list after deleting
    }
}