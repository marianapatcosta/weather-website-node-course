const $weatherForm = document.querySelector("form");
const $searchElement = document.querySelector("input");
const $messageOne = document.querySelector("#message-1");
const $messageTwo = document.querySelector("#message-2");
const $sendLocationButton = document.querySelector("#send-location");

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser!");
  }

  $sendLocationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition(position => {
  
    console.log(position);

    fetch(`/weather?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`).then(response => {
      response.json().then(data => {
        if (data.error) {
          return $messageOne.textContent = data.error;
        }  
        $messageTwo.textContent = data.forecast;
      })
    })
  })
})

$weatherForm.addEventListener("submit", event => {
  event.preventDefault();

  const location = $searchElement.value;

  fetch(`/weather?location=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        return $messageOne.textContent = data.error;
      }

      $messageOne.textContent = data.address;
      $messageTwo.textContent = data.forecast;
    })
  })
})

