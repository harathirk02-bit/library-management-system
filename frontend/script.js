const API_URL = "http://localhost:5000";

/* ===========================
   Dashboard
=========================== */

async function loadDashboard() {
    try {
        const response = await fetch(`${API_URL}/dashboard`);
        const data = await response.json();

        document.getElementById("totalBooks").textContent = data.totalBooks;
        document.getElementById("availableBooks").textContent = data.availableBooks;
        document.getElementById("issuedBooks").textContent = data.issuedBooks;
        document.getElementById("returnedToday").textContent = data.returnedToday;
        document.getElementById("totalStudents").textContent = data.totalStudents;

    } catch (error) {
        console.log("Dashboard Error:", error);
    }
}

/* ===========================
   Add Book
=========================== */

const bookForm = document.getElementById("bookForm");

if (bookForm) {

    bookForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const book = {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            category: document.getElementById("category").value,
            isbn: document.getElementById("isbn").value,
            year: document.getElementById("year").value,
            quantity: document.getElementById("quantity").value
        };

        try {

            const response = await fetch(`${API_URL}/books`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book)
            });

            const data = await response.json();

            document.getElementById("message").innerHTML = data.message;

            bookForm.reset();

        } catch (error) {

            console.log(error);

            document.getElementById("message").innerHTML =
                "Failed to add book.";

        }

    });

}
/* ===========================
   View All Books
=========================== */

async function loadBooks() {

    const table = document.getElementById("bookTable");

    if (!table) return;

    try {

        const response = await fetch(`${API_URL}/books`);
        const books = await response.json();

        table.innerHTML = "";

        books.forEach(book => {

            table.innerHTML += `
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.category}</td>
                    <td>${book.isbn}</td>
                    <td>${book.year}</td>
                    <td>${book.quantity}</td>
                    <td>${book.available}</td>

                    <td>
                        <button onclick="editBook('${book._id}')">Edit</button>
                        <button onclick="deleteBook('${book._id}')">Delete</button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {
        console.log(error);
    }

}


/* ===========================
   Search Books
=========================== */

async function searchBooks() {

    const keyword = document.getElementById("search").value;

    try {

        const response = await fetch(
            `${API_URL}/books?search=${keyword}`
        );

        const books = await response.json();

        const table = document.getElementById("bookTable");

        table.innerHTML = "";

        books.forEach(book => {

            table.innerHTML += `
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.category}</td>
                    <td>${book.isbn}</td>
                    <td>${book.year}</td>
                    <td>${book.quantity}</td>
                    <td>${book.available}</td>

                    <td>
                        <button onclick="editBook('${book._id}')">Edit</button>
                        <button onclick="deleteBook('${book._id}')">Delete</button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {
        console.log(error);
    }

}


/* ===========================
   Update Book
=========================== */

async function editBook(id) {

    const title = prompt("Enter New Book Title");

    if (!title) return;

    const author = prompt("Enter Author Name");
    const category = prompt("Enter Category");
    const quantity = prompt("Enter Quantity");

    try {

        const response = await fetch(`${API_URL}/books/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                author,
                category,
                quantity
            })

        });

        const data = await response.json();

        alert(data.message);

        loadBooks();

    } catch (error) {

        console.log(error);

    }

}


/* ===========================
   Delete Book
=========================== */

async function deleteBook(id) {

    const confirmDelete = confirm("Delete this book?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`${API_URL}/books/${id}`, {

            method: "DELETE"

        });

        const data = await response.json();

        alert(data.message);

        loadBooks();

    } catch (error) {

        console.log(error);

    }

}
/* ===========================
   Load Books in Dropdown
=========================== */

async function loadBookOptions() {

    const bookSelect = document.getElementById("bookTitle");

    if (!bookSelect) return;

    try {

        const response = await fetch(`${API_URL}/books`);
        const books = await response.json();

        books.forEach(book => {

            if (book.available > 0) {

                bookSelect.innerHTML += `
                    <option value="${book.title}">
                        ${book.title}
                    </option>
                `;

            }

        });

    } catch (error) {

        console.log(error);

    }

}

/* ===========================
   Issue Book
=========================== */

const issueForm = document.getElementById("issueForm");

if (issueForm) {

    issueForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const issueData = {

            studentName: document.getElementById("studentName").value,
            studentId: document.getElementById("studentId").value,
            bookTitle: document.getElementById("bookTitle").value,
            issueDate: document.getElementById("issueDate").value

        };

        try {

            const response = await fetch(`${API_URL}/issue`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(issueData)

            });

            const data = await response.json();

            document.getElementById("message").innerHTML = data.message;

            issueForm.reset();

        } catch (error) {

            console.log(error);

        }

    });

}

/* ===========================
   View Issued Books
=========================== */

async function loadIssuedBooks() {

    const table = document.getElementById("returnTable");

    if (!table) return;

    try {

        const response = await fetch(`${API_URL}/issue`);
        const issuedBooks = await response.json();

        table.innerHTML = "";

        issuedBooks.forEach(issue => {

            table.innerHTML += `
                <tr>
                    <td>${issue.studentName}</td>
                    <td>${issue.studentId}</td>
                    <td>${issue.bookTitle}</td>
                    <td>${issue.issueDate}</td>
                    <td>${issue.status}</td>

                    <td>

                        ${
                            issue.status === "Issued"
                            ? `<button onclick="returnBook('${issue._id}')">Return Book</button>`
                            : "Returned"
                        }

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

/* ===========================
   Return Book
=========================== */

async function returnBook(id) {

    try {

        const response = await fetch(`${API_URL}/return/${id}`, {

            method: "PUT"

        });

        const data = await response.json();

        alert(data.message);

        loadIssuedBooks();

    } catch (error) {

        console.log(error);

    }

}
let members = [
    { id: 1, name: "Rahul", email: "rahul@gmail.com", phone: "9876543210" },
    { id: 2, name: "Anjali", email: "anjali@gmail.com", phone: "9123456780" }
];

// Load members
function loadMembers() {
    let table = document.getElementById("membersTable");
    table.innerHTML = "";

    members.forEach(m => {
        table.innerHTML += `
            <tr>
                <td>${m.id}</td>
                <td>${m.name}</td>
                <td>${m.email}</td>
                <td>${m.phone}</td>
                <td>
                    <button onclick="deleteMember(${m.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Add member
function addMember() {
    let name = document.getElementById("memberName").value;
    let email = document.getElementById("memberEmail").value;
    let phone = document.getElementById("memberPhone").value;

    if (name === "" || email === "" || phone === "") {
        alert("Please fill all fields");
        return;
    }

    let newMember = {
        id: members.length + 1,
        name: name,
        email: email,
        phone: phone
    };

    members.push(newMember);
    loadMembers();

    document.getElementById("memberName").value = "";
    document.getElementById("memberEmail").value = "";
    document.getElementById("memberPhone").value = "";
}

// Delete member
function deleteMember(id) {
    members = members.filter(m => m.id !== id);
    loadMembers();
}
function loadReports() {

    // dummy data (same as dashboard for now)
    let totalBooks = 5;
    let issuedBooks = 2;
    let availableBooks = totalBooks - issuedBooks;
    let totalMembers = 5;

    document.getElementById("totalBooks").innerText = totalBooks;
    document.getElementById("issuedBooks").innerText = issuedBooks;
    document.getElementById("availableBooks").innerText = availableBooks;
    document.getElementById("totalMembers").innerText = totalMembers;
}