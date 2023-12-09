(function Library() {
  const manageLibrary = (function () {
    function Book(name, author, read) {
      this.name = name;
      this.author = author;
      this.read = read;
    }

    let myLibrary = [];

    const deleteBook = (index) => {
      myLibrary.splice(index, 1);
    };

    const addBookToLibrary = (form) => {
      let book = new Book(
        form.elements[0].value,
        form.elements[1].value,
        form.elements[2].value
      );
      myLibrary.push(book);
    };

    const getLibrary = () => myLibrary;

    return { deleteBook, addBookToLibrary, getLibrary };
  })();

  const screenController = (function () {
    const shelf = document.querySelector(".shelf");
    const form = document.querySelector(".bookform");

    const tableController = (function () {
      const showBooks = () => {
        myLibrary = manageLibrary.getLibrary();

        for (let i = 0; i < myLibrary.length; i++) {
          const tableRow = document.createElement("tr");

          const sno = document.createElement("td");
          sno.textContent = `${i + 1}.`;

          const name = document.createElement("td");
          name.textContent = myLibrary[i].name;

          const author = document.createElement("td");
          author.textContent = myLibrary[i].author;

          const read = document.createElement("td");
          const read_btn = document.createElement("button");
          read_btn.textContent = myLibrary[i].read;
          read_btn.classList.add(
            myLibrary[i].read === "Read" ? "read-btn1" : "read-btn2"
          );
          read_btn.addEventListener("click", () => {
            if (read_btn.textContent == "Read") {
              read_btn.textContent = "Not Read";
              read_btn.classList.toggle("read-btn1");
              read_btn.classList.add("read-btn2");
            } else {
              read_btn.textContent = "Read";
              read_btn.classList.add("read-btn1");
              read_btn.classList.toggle("read-btn2");
            }
          });
          read.appendChild(read_btn);

          const del = document.createElement("td");
          const delete_btn = document.createElement("button");
          delete_btn.classList.add("delete-btn");
          delete_btn.textContent = "Delete";
          delete_btn.addEventListener("click", () => {
            manageLibrary.deleteBook(i);
            formController.clear();
            showBooks();
          });
          del.appendChild(delete_btn);

          tableRow.appendChild(sno);
          tableRow.appendChild(name);
          tableRow.appendChild(author);
          tableRow.appendChild(read);
          tableRow.appendChild(del);

          shelf.appendChild(tableRow);
        }
      };

      return { showBooks };
    })();

    const formController = (() => {
      function clear() {
        form.elements[0].value = "";
        form.elements[1].value = "";
        form.elements[2].value = "Read";
        for (let i = shelf.rows.length - 1; i >= 0; i--) {
          shelf.deleteRow(i);
        }
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        manageLibrary.addBookToLibrary(form);
        clear();
        tableController.showBooks();
      });

      return { clear };
    })();
  })();
})();
