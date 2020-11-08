function getValue (id) {
    return document.getElementById(id).value;
}

async function create () {
    const name = getValue("name");
    const type = getValue("type");
    const detail = getValue("detail");
    const status = getValue("status");
    const price = getValue("price");
    const phone = getValue("phone");
    let response = await fetch('/api/product', {
        method: "POST",
        body: JSON.stringify({
            name,
            type,
            detail,
            status,
            price,
            phone
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (!response.ok) {
        alert("Failed");
        return;
    }
    res = (await response.json());
    if (res.success) {
        let product = res.data;
        console.log(product);
        alert("success");
    }

}