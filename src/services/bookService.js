export const getAllBooks = (stateSetter) => {
  const url = "http://localhost:3000/books";
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      stateSetter(data)
    });
};

export const add = (book, callback) => {
  const url = "http://localhost:3000/books";
  
  fetch(url, {
    method: "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(book)
  })
    .then(res => res.json())
    .then(book => {
      console.log("Dodana ksiązka: ");
      console.log(book);
      callback(book);
    });
};

export const remove = (id, callback) => {
  const url = `http://localhost:3000/books/${id}`;
  fetch(url, {
    method: "delete",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(res => {
    callback(id);
  });
};