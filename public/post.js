function getValue (id) {
    return document.getElementById(id).value;
}

async function create () {
    const name = getValue("name");
    const detail = getValue("detail");
    const status = getValue("status");
    const price = getValue("price");
    const phone = getValue("phone");
    const classification = getValue("type");
    const address = getValue("address");
    const img = getValue('image');
    
    let response = await fetch('/api/product/add', {
        method: "POST",
        body: JSON.stringify({
            name,
            detail,
            status,
            price,
            phone,
            classification,
            address,
            img
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    res = (await response.json());
    if (res.status === 0) {
        alert("publish successfully!");
        window.location.href = '/';
    } else {
        alert(res.msg);
    }
}

// document.getElementById("img-input").addEventListener("input", (e) => {
//    const file = e.target.files[0];
//    const img_dom = document.getElementById("img");
//    const src = URL.createObjectURL(file);
//    img_dom.src = src;
// })