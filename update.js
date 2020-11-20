function setNodeContent (id, text) {
    document.getElementById(id).value = text;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function setSrc(id, src) {
    document.getElementById(id).src = src;
}

async function init () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const response = await fetch('/api/product/' + id);
    if (!response.ok)
        return;
    const details = (await response.json()).data;
    setNodeContent("img", details.img)
    setNodeContent("name", details.name);
    setNodeContent("price", details.price);
    setNodeContent("detail", details.detail);
    setNodeContent("classification", details.classification)
    setSrc("poster", details.img);
    setNodeContent("address", details.address);
    setNodeContent("status", details.status);
    setNodeContent("phone", details.phone);
}

async function update () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    const name = getValue("name");
    const detail = getValue("detail");
    const status = getValue("status");
    const price = getValue("price");
    const phone = getValue("phone");
    const classification = getValue("classification");
    const address = getValue("address");
    const img = getValue('img');
    

    let res = await fetch('/api/product/update', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item_id: Number(id),
            name,
            detail,
            status,
            price,
            phone,
            classification,
            address,
            img
        })
    });
    res = (await res.json());
    if (res.status === 0) {
        alert("update successfully!");
    } else {
        alert(res.msg)
    }

}

