document.querySelector('#inputBox').addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addItem(this.value);
        this.value = ""; // Clear the input after adding
    }
});

function addItem(input) {
    if (input === '') return; // Avoid adding empty items

    const list = document.querySelector("#list");
    const listItem = document.createElement("li");

    // Create a checkbox for the list item
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add('checkbox');

    // Append the checkbox and the item text to the list item
    listItem.appendChild(checkbox);
    listItem.innerHTML += ` ${input} <span class="delete">X</span>`;
    list.appendChild(listItem);

    // Toggle background color and "done" class on the list item when checkbox is clicked
    checkbox.addEventListener("change", function() {
        listItem.classList.toggle('done');
        listItem.style.backgroundColor = checkbox.checked ? '#5a5a5a' : '#007bff'; // Change color based on checkbox state
    });

    // Remove item when delete button is clicked
    listItem.querySelector('.delete').addEventListener("click", function(e) {
        e.stopPropagation(); // Avoid triggering the 'done' class toggle
        listItem.remove();
    });
}

// Function to download the list as a PDF
document.getElementById('downloadBtn').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const listItems = document.querySelectorAll('#list li');
    let y = 10; // Starting vertical position

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("To Do List", 10, y);
    y += 10;

    listItems.forEach(item => {
        const text = item.innerText.replace("X", "").trim(); // Remove the delete button text
        doc.text(text, 10, y);
        y += 10;
    });

    doc.save("todo_list.pdf");
});
