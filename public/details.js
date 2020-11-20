function setNodeContent (id, text) {
    document.getElementById(id).innerHTML = text;
}

async function init () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const response = await fetch('/api/product/' + id);
    if (!response.ok)
        return;
    const details = (await response.json()).data;
    console.log(details);
    document.getElementById("img").src = details.img;
    setNodeContent("name", details.name);
    setNodeContent("price", "$" + details.price);
    setNodeContent("address", details.address);
    setNodeContent("status", details.status);
    setNodeContent("phone", details.phone);
}

async function buy () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const response = await fetch('/api/buy/' + id, {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        alert("Failed")
    }
    const success = (await response.json()).success;
    if (success) {
        alert("Success")
    }

}

function update () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    window.location.href = "update.html?id=" + id;
}

