if (window.location.pathname.endsWith("/home.html")) {
    function getWaktu() {
  const jam = new Date().getHours();
  if (jam >= 4 && jam < 10) return "Pagi";
  if (jam >= 10 && jam < 15) return "Siang";
  if (jam >= 15 && jam < 18) return "Sore";
  return "Malam";
}

function getIcon(waktu) {
  switch (waktu) {
    case "Pagi": return "ph:sun-dim-duotone";
    case "Siang": return "ph:sun-duotone";
    case "Sore": return "ph:cloud-sunset-duotone";
    case "Malam": default: return "ph:moon-duotone";
  }
}

function getTemperature() {
  return Math.floor(Math.random() * 21) + 20;
}

function updateSalam() {
  const waktu = getWaktu();
  const greetEl = document.getElementById("greet");
  const iconEl = document.getElementById("icon-greet");
  greetEl.textContent = `Selamat ${waktu} Guntur!`;
  iconEl.setAttribute("icon", getIcon(waktu));
}



updateSalam();

setInterval(() => {
  updateSalam();
  
}, 60000);


}