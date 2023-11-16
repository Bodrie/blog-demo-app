function handleDeleteBlog() {
  const element = document.querySelector("a.delete");
  element.addEventListener("click", (e) => {
    const endpoint = `/blogs/${element.dataset.doc}`;
    fetch(endpoint, {
      method: "DELETE",
    })
      .then((response) => {
        response.json().then((data) => {
          {
            window.location.href = data.redirect;
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

handleDeleteBlog();
