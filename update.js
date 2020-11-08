function setNodeContent (id, text) {
    document.getElementById(id).value = text;
}

async function init () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const response = await fetch('/api/product/' + id);
    if (!response.ok)
        return;
    const details = (await response.json()).data;
    console.log(details);
    setNodeContent("img", details.img)
    setNodeContent("name", details.name);
    setNodeContent("price", details.price);
    setNodeContent("detail", details.detail);
    // setNodeContent("address", details.address);
    setNodeContent("status", details.status);
    setNodeContent("phone", details.phone);
}

async function update () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const response = await fetch('/api/product/' + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });

    if (!response.ok) {
        alert("Failed")
    }
    const success = (await response.json()).success;
    if (success) {
        alert("Success")
    }

}

