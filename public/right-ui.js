function setRightUi(username) {
  if (username === null) {
    document.getElementById('user-email').style.display = 'none';
    document.getElementById('sign-in').style.display = 'inline';
    document.getElementById('sign-up').style.display = 'inline';
    document.getElementById('sign-out').style.display = 'none';
  } else {
    document.getElementById('user-email').style.display = 'inline';
    document.getElementById('sign-in').style.display = 'none';
    document.getElementById('sign-up').style.display = 'none';
    document.getElementById('sign-out').style.display = 'inline';
    document.getElementById('user-email').innerHTML = username;
  }
}
function getUserName() {
  return new Promise((resolve) => {
    fetch("/api/user-info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
      return res.json();
    }).then(res => {
      if (res.status === 1) {
        setRightUi(null);
      } else {
        setRightUi(res.data.username);
      }
    })
  });
}

getUserName();

document.getElementById('sign-out').addEventListener('click', () => {
  fetch("/api/signout", {
    method: "GET"
  }).then(res => {
    return res.json();
  }).then(res => {
    if (res.status === 0) {
      alert(res.msg);
      window.location.href = '/signin.html';
    }
  });
});
