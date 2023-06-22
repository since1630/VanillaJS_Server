const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userid = e.target.userid.value;
  if (!userid) {
    return alert("아이디를 입력하세요");
  }
  try {
    const data = { userid };
    console.log(data);
    fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    // axios.post("/user", userid);
  } catch (err) {
    console.error(err);
  }
});
