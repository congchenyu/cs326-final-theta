async function init () {
    let response = await fetch('/api/products');
    let data = await response.json();
    let products = data.data;
    console.log(products);
    const node = document.getElementById('products');
    let htmlStr = ""
    products.forEach((element, index) => {
        htmlStr += ` <div class="card">
        <img class="card-img-top"
            src="${element.img + '?time=' + index}"
            alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title"><a href="/details.html?id=${element.id}">${element.name}</a></h5>
            <p class="card-text">$ ${element.price}</p>
        </div>

    </div>`
    });
    node.innerHTML = htmlStr;
}