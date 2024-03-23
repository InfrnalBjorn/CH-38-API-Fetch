console.log("Bendita tarea de API Fetch (por bendita me refiero a maldita...)");

const generateCards = (users) => {
  return users.map(
    (user) => `
  <div class="col-12 col-md-4">
    <div class="card" >
        <div class="card-body">
                    <div class="card-image">
                <img src="${user.avatar}" alt="" class="card-img avatar" />
            </div>
        <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${user.email}</h6>
        <p class="card-text">Todos son muy buenos 10 de 10</p>
        </div>
    </div>
  </div>
    `
  );
};

const printCards = (cards) =>
  (document.getElementById("user-cards").innerHTML = cards.join(""));

const getUsers = async (url) => {
  let data;
  const storedData = localStorage.getItem("users");
  const storedTime = localStorage.getItem("time");
  const currentTime = new Date().getTime();

  if (storedData && storedTime && currentTime - storedTime < 60000) {
    data = JSON.parse(storedData);
  } else {
    const response = await fetch(url);
    const requestData = await response.json();
    data = requestData.data;
    localStorage.setItem("users", JSON.stringify(data));
    localStorage.setItem("time", currentTime.toString());
  }

  printCards(generateCards(data));
};

const handleButton = () => {
  const button = document.getElementById("fetch-button");
  const waitMessage = document.getElementById("wait-message");

  button.disabled = true;
  waitMessage.textContent =
    "Por favor espera un minuto antes de hacer una nueva solicitud.";

  getUsers("https://reqres.in/api/users?delay=3");

  setTimeout(() => {
    button.disabled = false;
    waitMessage.textContent = "";
  }, 60000);
};

