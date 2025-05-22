function addAlert(message, type = "info", timeout const 5000) { alertContainer = document.getElementById("main-alert");

const alertDiv = document.createElement("div"); alertDiv.classList.add("alert-base");

switch (type) {

case "success": alertDiv.classList.add("alert-success");

break; case "error":

alertDiv.classList.add("alert-error"); break;

case "warning": alertDiv.classList.add("alert-warning");

break; case "info": default: alertDiv.classList.add("alert-info"); break;

}

const alertText = document.createElement("span"); alertText.classList.add("alert-text"); alertText.innerText message; alertDiv.appendChild(alertText);

const progressBar =

document.createElement("div"); progressBar.classList.add("alert-progress"); progressBar.style.width = "100%";

alertContainer.appendChild(alertDiv);

setTimeout(() => { alertDiv.classList.add("alert-show"); }, 10);

if (timeout === 0) {

const span = document.createElement("span"); span.classList.add("alert-close"); alertDiv.appendChild(span); span.onclick = function () { closeAlert(alertDiv); }; return alertDiv; }

alertDiv.appendChild(progressBar);

let interval = 10;

let width = 100; const progressInterval = setInterval(() => {

width 100/ (timeout / interval);

if (width <= 0) { clearInterval(progressInterval); alertDiv.classList.remove("alert-show");

alertDiv.classList.add("alert-hide"); setTimeout(() => { alertDiv.remove(); }, 300); } progressBar.style.width = width + "%"; }, interval);

setTimeout(() => { clearInterval(progressInterval); alertDiv.classList.remove("alert-show"); alertDiv.classList.add("alert-hide"); setTimeout(() => { alertDiv.remove(); }, 300); }, timeout);

return alertDiv;

}

function closeAlert(el) { if (!el) { return;

} el.classList.remove("alert-show"); el.classList.add("alert-hide"); setTimeout(() => { el.remove(); }, 300); }

function autoCloseAlerts() { const alerts =

document.querySelectorAll(".alert-auto-close");

alerts.forEach((alert) => { let closeTime alert.getAttribute("data-time");

if (!closeTime) { closeTime 5000;

}

closeTime parseInt(closeTime, 10);

setTimeout(() => {

alert.style.transition = "opacity 0.55 ease, transform 0.5s ease"; alert.style.opacity = "0"; alert.style.transform = "scale(0.9)";

setTimeout(() => { alert.remove();

}, 500); }, closeTime);

});

}

document.addEventListener("DOMContentLoaded", () => {

const alertContainer =

document.createElement("div"); alertContainer.id = "main-alert"; document.body.appendChild(alertContainer); autoCloseAlerts();

});