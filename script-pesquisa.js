$(document).ready(function() {
  $('#searchButton').click(function() {
      let searchInput = $('#searchInput').val();

      $.get('https://fakestoreapi.com/products/category/' + searchInput, function(products) {
          let results = $('#results');
          results.empty();

          if (products.length > 0) {
              for (let i = 0; i < products.length; i++) {
                  let product = products[i];
                  let html = `
                  <div class="col-md-4 mt-2">
                       <div class="card card-hover p-4 ">
                        <img src="${product.image}" class="card-img-top img-container" alt="${product.title}">
                        <div class="card-body">
                          <h5 class="card-title">${product.title}</h5>
                          <p class="card-text">$ ${product.price}</p>
                          <a href="detalhes.html?id=${product.id}" class="btn btn-primary">Detalhes</a>
                        </div>
                      </div>
                  </div>
            `;
                  results.append(html);
              }
          } else {
              results.append('<p class="text-white text-center">Nenhum produto encontrado.</p>');
          }
      });
  });
});
