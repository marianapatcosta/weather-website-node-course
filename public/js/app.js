const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();

  const location = searchElement.value;

  fetch(`/weather?location=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        return messageOne.textContent = data.error;
      }

      messageOne.textContent = data.address;
      messageTwo.textContent = data.forecast.summary;
    })
  })
})
