function setNodeContent(id, text) {
  document.getElementById(id).innerHTML = text;
}

async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const response = await fetch("/api/product/" + id);
  if (!response.ok) return;
  const details = (await response.json()).data;
  console.log(details);
  document.getElementById("img").src = details.img;
  setNodeContent("name", details.name);
  setNodeContent("price", "$" + details.price);
  setNodeContent("address", details.address);
  setNodeContent("status", details.status);
  setNodeContent("phone", details.phone);
}

async function buy() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  let res = await fetch("/api/product/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item_id: id,
    }),
  });
  res = await res.json();
  if (res.status === 0) {
    alert("buy successfully!");
    window.location.href = "/";
  } else {
    alert(res.msg);
  }
}

function update() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  window.location.href = "update.html?id=" + id;
}

async function del() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  let res = await fetch("/api/product/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item_id: id,
    }),
  });
  res = await res.json();
  if (res.status === 0) {
    alert("delete successfully!");
    window.location.href = "/";
  } else {
    alert(res.msg);
  }
}
