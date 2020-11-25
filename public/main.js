function updateView(products) {
  const node = document.getElementById("products");
  let htmlStr = "";
  products.forEach((element, index) => {
    htmlStr += ` <div class="card">
        ${
          element.is_sold_out === 1
            ? '<span class="sold-out-tag">reserved</span>'
            : ""
        }
        <img class="card-img-top"
            src="${element.img + "?time=" + index}"
            alt="Card image cap">
        <div class="card-body">
            
            <h5 class="card-title"><a href="/details.html?id=${element.id}">${
      element.name
    }</a></h5>
            <p class="card-text">$ ${element.price}</p>
        </div>

    </div>`;
  });
  node.innerHTML = htmlStr;
}

async function requestProducts(classification = "") {
  let response = await fetch(`/api/products?classification=${classification}`);
  let data = await response.json();
  let products = data.data;
  updateView(products);
}

async function requestProductsByKeyword(keyword = "") {
  let response = await fetch(`/api/products/search?keyword=${keyword}`);
  let data = await response.json();
  let products = data.data;
  updateView(products);
}

function bindEvents() {
  const tab = document.getElementById("list-tab");
  const a_tags = tab.children;
  for (let i = 0; i < a_tags.length; i++) {
    const a = a_tags[i];
    a.addEventListener("click", (e) => {
      const target = e.target;
      requestProducts(target.innerHTML.trim());
    });
  }

  const keyword_input = document.getElementById("keyword");
  const search_btn = document.getElementById("search-btn");
  search_btn.addEventListener("click", (e) => {
    const keyword = keyword_input.value;
    requestProductsByKeyword(keyword);
  });
}

bindEvents();

requestProducts("");
