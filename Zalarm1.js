function time() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let sec = date.getSeconds();
  let month = date.getMonth();
  let year = date.getFullYear();
  let dates = date.getDate();

  document.querySelector(".hour").innerHTML = hours.toString().padStart(2, '0') + " : ";
  document.querySelector(".min").innerHTML = minutes.toString().padStart(2, '0') + " : ";
  document.querySelector(".sec").innerHTML = sec.toString().padStart(2, '0');

  let text = document.querySelector(".textt");
  if (hours >= 0 && hours < 12) {
    text.innerHTML = "AM";
  } else {
    text.innerHTML = "PM";
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  document.querySelector(".month").innerHTML = months[month];
  document.querySelector(".date1").innerHTML = dates + ",";
  document.querySelector(".year").innerHTML = year;
}

// setInterval(time, 1000);
time();
setInterval(time, 1000);

function click() {
  let display = document.querySelector(".display");
  let icon = document.querySelector("#icon");

  if (display.style.display === "none" || display.style.display === "") {
    icon.innerHTML = `<i class="material-symbols-outlined">close</i>`;
    display.style.display = "flex";
  } else {
    document.querySelector("#hour").value = "0";
    document.querySelector("#min").value = "0";
    document.querySelector("#sec").value = "0";
    icon.innerHTML = `<i class="material-symbols-outlined">add</i>`;
    display.style.display = "none";
  }
}
document.querySelector(".heading").addEventListener("click", click);

function addingMoreSet() {
  let hour = document.querySelector("#hour").value;
  let min = document.querySelector("#min").value;
  let sec = document.querySelector("#sec").value;
  let newDiv = document.createElement("div");
  newDiv.className = "footerNEW";
  newDiv.innerHTML = `
        <div class="userTIME">
          <div class="heading4">
            <h4 class="userH">${hour} </h4>
            <h4 class="userM">: ${min}</h4>
            <h4 class="userS">: ${sec}</h4>
          </div>
          <div class="del">
            <i class="material-symbols-outlined icons" id="del">delete</i>
            <i class="material-symbols-outlined icons" id="pau">pause</i>
            <i class="material-symbols-outlined icons" id="play">play_arrow</i>
          </div>
        </div>`;
  document.querySelector(".mainFOOTER").appendChild(newDiv);
}

document.querySelector("#check").addEventListener("click", addingMoreSet);

// Use event delegation for dynamic elements
document.querySelector(".mainFOOTER").addEventListener("click", function (e) {
  if (e.target && e.target.id === "del") {
    removingCHILD(e.target);
  } else if (e.target && e.target.id === "pau") {
    pauseAUD();
  } else if (e.target && e.target.id === "play") {
    playAGAIN();
  }
});

function removingCHILD(target) {
  let footer = target.closest(".footerNEW");
  footer.parentNode.removeChild(footer);
  let audio = document.querySelector(".aud");
  audio.pause();
  alert("Alarm Is Deleted...");
}

function RefreshTONormal() {
  document.querySelector("#hour").value = "0";
  document.querySelector("#min").value = "0";
  document.querySelector("#sec").value = "0";
  // Ensure to reset alarm check variables if needed
}

document.querySelector("#restart").addEventListener("click", RefreshTONormal);

function timeMATCHED() {
  let dates = new Date();
  let hours = dates.getHours();
  let mins = dates.getMinutes();
  let secs = dates.getSeconds();

  // Get all set alarms and check them
  let alarms = document.querySelectorAll(".footerNEW");
  alarms.forEach(alarm => {
    let Uhour = parseInt(alarm.querySelector(".userH").textContent, 10);
    let Umin = parseInt(alarm.querySelector(".userM").textContent.slice(2), 10);
    let Usec = parseInt(alarm.querySelector(".userS").textContent.slice(2), 10);

    if (hours === Uhour && mins === Umin && secs === Usec) {
      playAUD();
    }
  });
}

function playAUD() {
  let aud = document.querySelector(".aud");
  aud.play();
}

setInterval(timeMATCHED, 1000);

function pauseAUD() {
  let aud = document.querySelector(".aud");
  aud.pause();
  aud.currentTime=0;
}

function playAGAIN() {
  let aud = document.querySelector(".aud");
  aud.play();
}
