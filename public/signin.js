function getValue (id) {
    return document.getElementById(id).value;
}


async function signin (event) {
    event.preventDefault();
    const email = getValue("email");
    const password = getValue("password");

    const response = await fetch('/api/signin', {
        method: "POST",
        body: JSON.stringify({
            username: email,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    res = (await response.json());
    if (res.status === 0) {
        alert('login successfully!');
        window.location.href = "/"
    } else {
        alert('login failly!' + res.msg);
    }


}