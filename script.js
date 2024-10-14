document.addEventListener('DOMContentLoaded', () => {
    // Sample customer data (hardcoded for now, but this can be dynamically loaded)
    let customers = [
        { name: "John Doe", amountDue: 5000, amountPaid: 2000, balance: 3000 },
        { name: "Jane Smith", amountDue: 3000, amountPaid: 1000, balance: 2000 },
        { name: "Bob Johnson", amountDue: 2000, amountPaid: 500, balance: 1500 }
    ];

    // Function to display customer data in the table
    function displayCustomers() {
        const tbody = document.querySelector('#customer-table tbody');
        tbody.innerHTML = '';  // Clear existing rows
        
        customers.forEach((customer, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${customer.name}</td>
                <td>R ${customer.amountDue}</td>
                <td><input type="number" id="paid-${index}" value="${customer.amountPaid}" /></td>
                <td>R ${customer.balance}</td>
                <td><button onclick="updateBalance(${index})">Update</button></td>
            `;

            tbody.appendChild(row);
        });
    }

    // Update customer balance based on payment input
    window.updateBalance = (index) => {
        const paidAmount = parseFloat(document.getElementById(`paid-${index}`).value);
        customers[index].amountPaid = paidAmount;
        customers[index].balance = customers[index].amountDue - paidAmount;
        displayCustomers();  // Refresh the table
    };

    // Export customer data to Excel
    document.getElementById('export-button').addEventListener('click', () => {
        const worksheet = XLSX.utils.json_to_sheet(customers);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

        // Download the Excel file
        XLSX.writeFile(workbook, 'customers.xlsx');
    });

    // Initial display of customers
    displayCustomers();
});
