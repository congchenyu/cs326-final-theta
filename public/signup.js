function getValue (id) {
    return document.getElementById(id).value;
}


async function signup (event) {
    event.preventDefault();
    const email = getValue("email");
    const password = getValue("password");

    const response = await fetch('/api/signup', {
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
        alert('register successfully!');
        window.location.href = '/signin.html';
    } else {
        alert(res.msg);
    }

}