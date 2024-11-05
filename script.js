document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/Products'); 
        const products = await response.json();

        const productItems = document.getElementById('productItem');

        products.forEach((product) => {
    productItem.innerHTML += `
        <div class="box"> 
            <div class="image" data-id="${product.ProductID}">
                <img src="images/${product.Image}"  alt="">
                <div class="icons">
                  <a href="#" class="fas fa-heart"></a>
                  <a href="#" class="cart-btn">Add to cart</a>
                  <a href="#" class="fas fa-share"></a>
                </div>
            </div>
            <div class="content">
                  <h3>${product.ProductName}</h3>
                  <div class="price"> ${product.Price} </span> </div>
            </div>
        </div>`;
});



    } catch (error) {
        console.error('Error fetching products:', error);
        
    }
});


    