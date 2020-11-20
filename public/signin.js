function getValue (id) {
    return document.getElementById(id).value;
}


async function signin (event) {
    event.preventDefault();
    console.log(event)
    const email = getValue("email");
    const password = getValue("password");

    const response = await fetch('/api/signin', {
        method: "POST",
        body: JSON.stringify({
            email,
            password
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
        let user = res.user;
        console.log(user);
        alert("success");
        window.location.href = "/"
    }


}