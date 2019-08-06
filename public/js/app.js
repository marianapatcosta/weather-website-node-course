console.log("Client side js file is loaded!");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();

  const location = searchElement.value;

  fetch(`http://localhost:3000/weather?location=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        return messageOne.textContent = datahero.error;
      }

      messageOne.textContent = data.address;
      messageTwo.textContent = data.forecast.summary;
    })
  })
})
