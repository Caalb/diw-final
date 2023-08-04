$(document).ready(function () {
    $.get('https://diwserver.vps.webdock.cloud/products', function (response) {
        let results = $('#product-list');

        results.empty();
        const { products } = response;
        console.log(products)
        if (response?.products.length > 0) {
            for (let i = 0; i < products.length; i++) {
                let product = products[i];

                let html = `
                <div class="col-md-4 mt-2">
                      <div class="card card-container card-hover p-4 ">
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

    $('#searchButton').click(function () {
        let searchInput = $('#searchInput').val();

        $.get('https://diwserver.vps.webdock.cloud/products/search?query=' + searchInput, function (products) {
            let results = $('#product-list');
            results.empty();

            if (products.length > 0) {
                for (let i = 0; i < products.length; i++) {
                    let product = products[i];
                    let html = `
                    <div class="col-md-4 mt-2">
                         <div class="card card-container card-hover p-4 ">
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

    $.get('https://diwserver.vps.webdock.cloud/products/categories', function (categories) {
        let select = $('#select');
        categories.forEach(function (category) {
            select.append('<option value="' + category + '">' + category + '</option>');
        });
    });

    $('#select').change(function () {
        let selectedCategory = $(this).val();

        // Checking if a category is selected
        if (selectedCategory) {
            // Fetching products based on the selected category
            $.get('https://diwserver.vps.webdock.cloud/products/category/' + selectedCategory, function (response) {
                let results = $('#product-list');
                results.empty();

                const { products} = response;

                if (products.length > 0) {
                    for (let i = 0; i < products.length; i++) {
                        let product = products[i];
                        let html = `
                        <div class="col-md-4 mt-2">
                              <div class="card card-container card-hover p-4 ">
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
        } else {
            // If no category is selected, display all products or perform a different action
            console.log('No category selected');
        }
    });
});