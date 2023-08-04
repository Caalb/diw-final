$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
  
    if (productId) {
      $.get('https://diwserver.vps.webdock.cloud/products/' + productId, function(product) {
        console.log(product)
        if (product) {
          $('#productTitle').text(product.title);
          $('#productPrice').text('$ ' + product.price);
          $('#productRating').text(product.rating.rate);
          $('#productDescription').text($(product.description).text()); 
          $('#productImage').attr('src', product.image);
          $('#productImage').attr('alt', product.title);
        } else {
          $('#productNotFound').text('Produto não encontrado.');
        }
      }).catch(function(error) {
        console.log('Ocorreu um erro ao buscar os detalhes do produto:', error);
        $('#productNotFound').text('Ocorreu um erro ao buscar os detalhes do produto.');
      });
    } else {
      $('#productNotFound').text('ID do produto não fornecido.');
    }
  });
  