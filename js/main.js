let settings = document.querySelector(".settings"),
  body = document.querySelector("body"),
  header = document.querySelector(".headers"),
  leftSide = document.querySelector(".leftSide"),
  box = document.querySelector(".box "),
  pic = document.querySelector(".pctr "),
  main = document.querySelector("main"),
  rightSide = document.querySelector(".rightSide"),
  newTaskBtn = document.querySelector(".btn1"),
  addTaskBtn = document.querySelector(".btn2"),
  inner = document.querySelector(".inner"),
  form = document.querySelector("form"),
  allDelete = document.querySelector(".allDelete"),
  done = document.querySelector(".btn3"),
  ul = document.querySelector(".wrapper");

// Showing Settings Parameter Sidebar________________________
settings.addEventListener("click", () => {
  let shadowBar = document.createElement("div");
  shadowBar.classList.add("shadowBar");
  body.appendChild(shadowBar);

  let sideBar = document.createElement("div");
  body.appendChild(sideBar);
  sideBar.classList.add("sideBar");

  shadowBar.addEventListener("click", () => {
    shadowBar.classList.remove("shadowBar");
    // sideBar.classList.add("sideBar");

    sideBar.classList.add("sideBarRemove");
  });
  // Name Setting____________________________________________
  let btnName = document.createElement("button");
  let txtName = document.createElement("p");
  txtName.innerHTML = "<i class='fa fa-user'></i> Change name";
  btnName.classList.add("settingBtn");
  btnName.appendChild(txtName);
  btnName.innerHTML += "<i class='fa fa-chevron-right'></i>";
  sideBar.appendChild(btnName);

  let password = localStorage.getItem("Password");
  let btnPassword = document.createElement("button");
  let txtPassword = document.createElement("p");
  btnPassword.classList.add("settingBtn");
  btnPassword.appendChild(txtPassword);

  sideBar.appendChild(btnPassword);
  if (password === null) {
    txtPassword.innerHTML = "<i class='fa fa-wrench'></i> Set password";
  } else {
    txtPassword.innerHTML = "<i class='fa fa-picture-o'></i> Change password";
  }
  btnPassword.innerHTML += "<i class='fa fa-chevron-right'></i>";

  // Deleting Password Setting___________________________________
  if (password !== null) {
    let btnDeleting = document.createElement("button");
    let txtDeleting = document.createElement("p");
    txtDeleting.style.color = "red";
    btnDeleting.classList.add("settingBtn");
    btnDeleting.appendChild(txtDeleting);
    txtDeleting.innerHTML = "<i class='fa fa-trash-o'></i> Delete password";
    sideBar.appendChild(btnDeleting);
    btnDeleting.innerHTML += "<i class='fa fa-chevron-right'></i>";
  }

  let Photo = localStorage.getItem("Photo");
  let btnPhoto = document.createElement("button");
  let txtPhoto = document.createElement("p");
  btnPhoto.classList.add("settingBtn");
  btnPhoto.appendChild(txtPhoto);
  sideBar.appendChild(btnPhoto);

  let h3 = document.createElement("h3");
  h3.innerText = "Set your profile picture";
  if (Photo === null) {
    txtPhoto.innerHTML = "<i class='fa fa-wrench'></i> Set photo";
  } else {
    h3.innerText = "Change your profile picture";
    txtPhoto.innerHTML = "<i class='fa fa-picture-o'></i> Change photo";
  }
  btnPhoto.innerHTML += "<i class='fa fa-chevron-right'></i>";

  let settingButtons = document.querySelectorAll(".settingBtn");
  settingButtons.forEach((btn) => {
    let btnType = btn.innerText;

    btn.addEventListener("click", () => {
      //   Form Bg Shadow _________________________________
      let shadowSet = document.createElement("div");
      shadowSet.classList.add("shadowSet");
      body.appendChild(shadowSet);

      //   Form____________________________________________
      let form_Settings = document.createElement("form");
      form_Settings.classList.add("form_Settings");
      shadowSet.appendChild(form_Settings);

      //   Header__________________________________________
      let h3 = document.createElement("h3");
      form_Settings.appendChild(h3);

      //   Inputs___________________________________________
      let inputWrapper = document.createElement("div");
      inputWrapper.classList.add("inputWrapper");
      form_Settings.appendChild(inputWrapper);

      //   X-btn____________________________________________
      let x = document.createElement("button");
      x.classList.add("x-btn");
      x.innerHTML = "<i class='fa fa-times' ></i>";
      form_Settings.appendChild(x);

      x.addEventListener("click", () => {
        body.removeChild(shadowSet);
      });

      //   Submit___________________________________________
      let sbt = document.createElement("button");
      sbt.classList.add("sbt");
      sbt.textContent = "Submit";
      form_Settings.appendChild(sbt);

      let label = document.createElement("label");
      label.style = `margin-top:20px`;
      inputWrapper.appendChild(label);

      let inputWrap = document.createElement("div");
      inputWrap.classList.add("inputWrap");
      inputWrapper.appendChild(inputWrap);
      let inputType = document.createElement("input");
      inputType.classList.add("name");

      // Changing the name_______________________________________
      if (btnType.includes("name")) {
        h3.innerText = "Change your user name:";

        //   inputTypeName________________________________________
        label.innerHTML = "Name: ";

        let userIcon = document.createElement("div");
        userIcon.classList.add("user");
        inputWrap.appendChild(userIcon);
        userIcon.innerHTML = "<i class='fa fa-user'></i>";

        inputType.setAttribute("placeholder", "Your name");
        inputType.setAttribute("minlength", "2");
        inputType.setAttribute("maxlength", "25");
        inputType.style.textTransform = "capitalize";
        inputWrap.appendChild(inputType);

        sbt.addEventListener("click", (e) => {
          e.preventDefault();
          let regex = /^[a-zA-Z]{2,25}$/gm;
          if (inputType.value !== "" && regex.test(inputType.value)) {
            let value =
              inputType.value.charAt().toUpperCase() + inputType.value.slice(1);
            localStorage.setItem("Name", value);
            window.location.reload();
          } else {
            inputWrap.style = `border:3px solid red;box-shadow: rgba(243, 5, 5, 0.25) 0px 54px 55px, rgba(255, 0, 0, 0.12) 0px -12px 30px, rgba(255, 0, 0, 0.12) 0px 4px 6px, rgba(255, 3, 3, 0.17) 0px 12px 13px, rgba(255, 0, 0, 0.09) 0px -3px 5px;`;
            userIcon.style.color = "red";
            let info = document.createElement("p");
            let hasNumber = /\d/;
            let hasSpace = /\s/;

            if (hasNumber.test(inputType.value)) {
              info.innerText = "Please fill out 'name' field without numbers";
            } else if (hasSpace.test(inputType.value)) {
              info.innerText = "Please fill out 'name' field without any space";
            } else {
              info.innerText = "Please fill out 'name' field";
            }

            info.style = `color:red; text-align:center`;
            form_Settings.insertBefore(info, sbt);
            setTimeout(() => {
              inputWrap.style = `border:none; box-shadow:none`;
              userIcon.style.color = "";
              form_Settings.removeChild(info);
            }, 2000);
          }
        });
      }

      // Changing or Setting the password________________________
      if (
        btnType.includes("Change password") ||
        btnType.includes("Set password")
      ) {
        //   InputTypePassword__________________________________________

        label.textContent = "Password: ";

        let pswrdIcon = document.createElement("div");
        pswrdIcon.classList.add("user");
        pswrdIcon.innerHTML = "<i class='fa fa-lock'></i>";
        inputWrap.appendChild(pswrdIcon);

        inputType.setAttribute("type", "password");

        if (txtPassword.innerText.includes("Change")) {
          inputType.setAttribute("placeholder", "Change the password");
          h3.innerText = "Change your password:";
        } else {
          inputType.setAttribute("placeholder", "Create password");
          h3.innerText = "Set your password";
        }
        inputWrap.appendChild(inputType);

        //   Submit________________________________________
        sbt.addEventListener("click", (e) => {
          e.preventDefault();
          let regex2 = /^[0-9]{4,8}$/gm;
          if (inputType.value !== "" && regex2.test(inputType.value)) {
            localStorage.setItem("Password", inputType.value);
            window.location.reload();
          } else {
            inputWrap.style = `border:3px solid red;box-shadow: rgba(243, 5, 5, 0.25) 0px 54px 55px, rgba(255, 0, 0, 0.12) 0px -12px 30px, rgba(255, 0, 0, 0.12) 0px 4px 6px, rgba(255, 3, 3, 0.17) 0px 12px 13px, rgba(255, 0, 0, 0.09) 0px -3px 5px;`;
            pswrdIcon.style.color = "red";

            let info2 = document.createElement("p");
            let hasSpace = /\s/;
            if (hasSpace.test(inputType.value)) {
              info2.innerText =
                "Please fill out 'password' field without any space";
            } else {
              info2.innerText = "min~4 max~8 and only numbers allowed";
            }

            info2.style = `color:red; text-align:center`;
            form_Settings.insertBefore(info2, sbt);

            setTimeout(() => {
              inputWrap.style = `border:none; box-shadow:none`;
              pswrdIcon.style.color = "";
              form_Settings.removeChild(info2);
            }, 2000);
          }
        });
      }

      // Deleting the password____________________________________
      if (btnType.includes("Delete")) {
        h3.innerText = "Delete your password:";

        //   InputTypePasswordDelete__________________
        label.textContent = "Current password: ";

        let pswrdIcon = document.createElement("div");
        pswrdIcon.classList.add("user");
        pswrdIcon.innerHTML = "<i class='fa fa-lock'></i>";
        inputWrap.appendChild(pswrdIcon);

        inputType.setAttribute("type", "password");
        inputType.setAttribute("placeholder", "Enter current password");

        inputWrap.appendChild(inputType);

        //   Submit________________________________________
        sbt.addEventListener("click", (e) => {
          e.preventDefault();
          let regex2 = /^[0-9]{4,8}$/gm;
          let info2 = document.createElement("p");
          if (inputType.value !== "" && regex2.test(inputType.value)) {
            let lastPin = localStorage.getItem("Password");
            if (inputType.value === lastPin) {
              localStorage.removeItem("Password");
              window.location.reload();
            } else {
              info2.innerText =
                "Your current password is not matching and incorrect";
              info2.style = `color:red; text-align:center`;

              form_Settings.insertBefore(info2, sbt);

              setTimeout(() => {
                inputWrap.style = `border:none; box-shadow:none`;
                pswrdIcon.style.color = "";
                form_Settings.removeChild(info2);
              }, 2000);
            }
          } else {
            inputWrap.style = `border:3px solid red;box-shadow: rgba(243, 5, 5, 0.25) 0px 54px 55px, rgba(255, 0, 0, 0.12) 0px -12px 30px, rgba(255, 0, 0, 0.12) 0px 4px 6px, rgba(255, 3, 3, 0.17) 0px 12px 13px, rgba(255, 0, 0, 0.09) 0px -3px 5px;`;
            pswrdIcon.style.color = "red";

            let hasSpace = /\s/;
            if (hasSpace.test(inputType.value)) {
              info2.innerText =
                "Please fill out 'password' field without any space";
            } else {
              info2.innerText = "min~4 max~8 and only numbers allowed";
            }

            info2.style = `color:red; text-align:center`;
            form_Settings.insertBefore(info2, sbt);

            setTimeout(() => {
              inputWrap.style = `border:none; box-shadow:none`;
              pswrdIcon.style.color = "";
              form_Settings.removeChild(info2);
            }, 2000);
          }
        });
      }

      // Changing or Setting the photo____________________________
      if (btnType.includes("photo")) {
        h3.textContent = "Upload photo:";

        //   inputTypePhoto__________________________
        let label3 = document.createElement("label");
        label3.innerHTML =
          "<i class='fa fa-picture-o' style='margin-left:15px;margin-right:14px'></i> Choose";
        label3.classList.add("label3");
        label3.setAttribute("for", "getFile");
        inputWrap.appendChild(label3);

        let prImg = document.createElement("img");
        prImg.classList.add("prImg");
        prImg.setAttribute("id", "pr-img");
        inputWrapper.appendChild(prImg);

        inputType.style.display = "none";
        inputWrapper.appendChild(inputType);
        inputType.setAttribute("type", "file");
        inputType.setAttribute("id", "getFile");
        inputType.setAttribute("accept", "image/*");
        let preview = (e) => {
          let imgFiles = e.target.files;
          let imgFilesLength = imgFiles.length;
          if (imgFilesLength > 0) {
            let imgSrc = URL.createObjectURL(imgFiles[0]);
            let imgEl = document.querySelector("#pr-img");
            imgEl.src = imgSrc;
            imgEl.style.display = "block";
          }
        };
        let PhotoPRofile = [];
        inputType.addEventListener("change", (e) => {
          preview(e);
          const image = e.target.files[0];
          PhotoPRofile.unshift(image);
        });

        // Submit________________________________________
        sbt.addEventListener("click", () => {
          let img = PhotoPRofile[0];

          const reader = new FileReader();
          reader.readAsDataURL(img);
          reader.addEventListener("load", () => {
            localStorage.setItem("Photo", reader.result);
          });
        });
      }
    });
  });

  // Mode Setting____________________________________________
  let btnMode = document.createElement("div");
  btnMode.classList.add("darkModeDiv");
  let txtBtn = document.createElement("p");
  txtBtn.innerHTML = "<i class='fa fa-moon-o'></i> Dark Mode";
  btnMode.appendChild(txtBtn);
  sideBar.appendChild(btnMode);

  // ON/OFF BTN______________________________________________
  let onOffBtn = document.createElement("button");
  onOffBtn.classList.add("onOffBtn");
  onOffBtn.innerText = "OFF";
  btnMode.appendChild(onOffBtn);
  onOffBtn.addEventListener("click", () => {
    body.classList.toggle("dark_mode");
    onOffBtn.innerText = onOffBtn.innerText === "ON" ? "OFF" : "ON";
    onOffBtn.style.backgroundColor =
      onOffBtn.style.backgroundColor === "green" ? "red" : "green";
  });

  if (body.classList.contains("dark_mode")) {
    onOffBtn.style = `background-color:green`;
    onOffBtn.innerText = "ON";
  }

  // ON/OFF BTN________________ENDS___________________________
});

// Profile picture_____________________________________
let img = localStorage.getItem("Photo");
if (img === null) {
  pic.innerHTML = "<i>No picture yet</i>";
  pic.style = `background-color:#6e9bf6`;
} else {
  let photo = document.createElement("img");
  photo.src = img;
  pic.appendChild(photo);
}

// Getting Name_____________________________________
let userName = localStorage.getItem("Name");
let user = document.createElement("h1");
user.innerText = userName;
header.appendChild(user);

if (userName.length > 9) {
  let h1 = document.querySelectorAll("h1");
  h1.forEach((el) => {
    el.style = `font-size:50px;line-height:60px;`;
  });
}

// Getting Date and Time______________________________
let today = new Date();
let d = today.toString().split(" ");
let dayPlus = d[0];
let month = today.getMonth();

switch (dayPlus) {
  case "Tue":
    dayPlus = "Tuesday";
    break;
  case "Wed":
    dayPlus = "Wednesday";
    break;
  case "Thu":
    dayPlus = "Thursday";
    break;
  case "Sat":
    dayPlus = "Saturday";
    break;

  default:
    dayPlus += "day";
    break;
}

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let whatMonth = months[month];

let fullDate = dayPlus + " " + whatMonth + " " + d.splice(3, 1).join("  ");

let date = document.createElement("h3");
date.innerHTML = `<i>${fullDate} </i>`;
date.style = `color:#6E9BF6;  margin-top:20px`;
let span = document.createElement("span");
date.appendChild(span);
setInterval(() => {
  let clock = new Date();
  let current = clock.toString().split(" ");
  span.textContent = current[4];
}, 1000);
leftSide.insertBefore(date, box);

// + NEW Task Button_____________________________________
newTaskBtn.addEventListener("click", () => {
  form.style = "display:flex";
  newTaskBtn.style.display = "none";
  inner.style.paddingTop = "0px";

  form.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// Add Task Btn____________________________________________
let inputTask = addTaskBtn.previousElementSibling;
let onlyNumbers =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
let select = document.querySelector("#select");
let val = "text";
select.addEventListener("change", (e) => {
  val = e.target.value;
  if (val === "text") {
    inputTask.setAttribute("placeholder", "Add Task");
  } else {
    inputTask.setAttribute("placeholder", "dd.mm.yy, dd/mm/yy, dd-mm-yy");
  }
});

let listOfTasks = JSON.parse(localStorage.getItem("Tasks"))
  ? JSON.parse(localStorage.getItem("Tasks"))
  : [];

if (listOfTasks.length) {
  showToDo();
  ul.style.paddingTop = "25px";
}

// Setting listOfTasks to localStorage__________
let setToDo = () => {
  localStorage.setItem("Tasks", JSON.stringify(listOfTasks));
};

// Showing listOfTasks inside ul________________
function showToDo() {
  let getListOfTasks = JSON.parse(localStorage.getItem("Tasks"));

  ul.innerHTML = "";
  getListOfTasks.forEach((task, i) => {
    if (body.classList.contains("dark_mode")) {
      ul.style = `color:black`;
    } else {
      ul.style = `color:black`;
    }
    let tasks = document.createElement("div");
    tasks.classList.add("tasks");
    ul.appendChild(tasks);

    let textOfTasks = document.createElement("div");
    textOfTasks.classList.add("text");
    tasks.appendChild(textOfTasks);

    let checked = document.createElement("input");
    checked.setAttribute("type", "checkbox");
    checked.classList.add("inputCheck");
    textOfTasks.appendChild(checked);
    checked.addEventListener("change", function () {
      let completedToDo = listOfTasks.map((item, id) => {
        if (id === i && checked.checked) {
          return {
            ...item,
            completed: item.completed === true ? false : true,
          };
        } else {
          return { ...item };
        }
      });

      listOfTasks = completedToDo;
      setToDo();
      showToDo();
      ul.style.paddingTop = "25px";
    });

    let p = document.createElement("p");
    p.innerHTML = task.text;
    textOfTasks.appendChild(p);
    if (task.completed === true) {
      p.style.textDecoration = "line-through";
    } else {
      p.style.textDecoration = "";
    }

    let btn = document.createElement("button");
    btn.innerHTML = "<i class='fa fa-trash'></i>";
    btn.classList.add("trashBtn");
    tasks.appendChild(btn);
    btn.addEventListener("click", () => {
      let deleteTodo = getListOfTasks.filter((item, id) => {
        return id !== i;
      });
      listOfTasks = deleteTodo;
      setToDo();
      showToDo();
      let children = ul.childElementCount;
      ul.style.paddingTop = "25px";
      if (children === 3) {
        rightSide.style.height = "50vh";
      }
    });
  });
}

addTaskBtn.addEventListener("click", () => {
  if (val === "text") {
    if (inputTask.value === "") {
      let close = document.querySelector(".close");
      form.appendChild(close);
      inputTask.style = ` border:2px solid red;box-shadow: rgba(255, 255, 255, 0.25) 0px 54px 55px, rgba(255, 255, 255, 0.12) 0px -12px 30px, rgba(254, 254, 254, 0.12) 0px 4px 6px, rgba(255, 255, 255, 0.17) 0px 12px 13px, rgba(255, 255, 255, 0.09) 0px -3px 5px;`;
      let info = document.createElement("p");
      info.innerText = `Nothing is written`;
      close.appendChild(info);
      info.style = `color:white; text-align:center; font-size:18px`;

      setTimeout(() => {
        inputTask.style = `border:none`;
        info.innerText = ``;
      }, 2000);
    } else {
      listOfTasks.push({ text: inputTask.value, completed: false });

      setToDo();
      showToDo();
    }
  } else {
    if (onlyNumbers.test(inputTask.value)) {
      listOfTasks.push({ text: inputTask.value, completed: false });
      setToDo();
      showToDo();
    } else {
      let close = document.querySelector(".close");
      form.appendChild(close);
      inputTask.style = ` border:2px solid red;box-shadow: rgba(255, 255, 255, 0.25) 0px 54px 55px, rgba(255, 255, 255, 0.12) 0px -12px 30px, rgba(254, 254, 254, 0.12) 0px 4px 6px, rgba(255, 255, 255, 0.17) 0px 12px 13px, rgba(255, 255, 255, 0.09) 0px -3px 5px;`;
      let info = document.createElement("p");

      if (inputTask.value === "") {
        info.innerText = `Nothing is written`;
      } else if (typeof inputTask.value === "string") {
        info.innerText = `Only formats:dd.mm.yy ... allowed`;
        info.style.textAlign = "right";
      }
      close.appendChild(info);
      info.style = `color:white; text-align:center; font-size:18px`;

      setTimeout(() => {
        inputTask.style = `border:none`;
        info.innerText = ``;
      }, 3000);
    }
  }

  done.style.display = "block";
  done.addEventListener("click", () => {
    form.style = "display:none";

    newTaskBtn.style.display = "block";
    ul.style.paddingTop = "25px";
  });

  // inputTask.value = "";

  let children = ul.childElementCount;
  let windowWidth = window.innerWidth;

  // Solving media problem____________________________
  if (children >= 3 && windowWidth < 700) {
    rightSide.style = `height:fit-content`;
  }

  if (children === 5) {
    main.style.height = "fit-content";
  }
  if (children === 7) {
    rightSide.style = `justify-content:flex-start; padding: 2.24vw 0;height:fit-content`;
  }

  form.reset();
});

// Solving media problem__________________________
let children = ul.childElementCount;

if (children >= 5) {
  main.style.height = "fit-content";
}
if (children >= 7) {
  rightSide.style = `justify-content:flex-start; padding: 2.24vw 0;height:fit-content`;
}

// Delete All Btn__________________________________
allDelete.addEventListener("click", () => {
  let allTasks = inner.getElementsByClassName("tasks");
  if (allTasks.length >= 2) {
    let shadowConfirmation = document.createElement("div");
    shadowConfirmation.classList.add("shadowSet");
    body.appendChild(shadowConfirmation);

    //   Form____________________________________________
    let form_Settings = document.createElement("div");
    form_Settings.style = `background-color:red`;
    form_Settings.classList.add("confirmation");

    shadowConfirmation.appendChild(form_Settings);

    //   Header__________________________________________
    let h3 = document.createElement("p");
    h3.innerText =
      "Are you sure you want to delete all the lists of to do? They will be permanently removed and can not be recovered";
    h3.style = `text-align:center`;
    form_Settings.appendChild(h3);

    //   Confirm___________________________________________
    let confirmPart = document.createElement("div");
    confirmPart.style =
      "display:flex; width:100%;justify-content:space-between";
    form_Settings.appendChild(confirmPart);

    let noBtn = document.createElement("button");
    noBtn.style = `background-color:#01ED03`;
    noBtn.classList.add("yes-no_Btn");
    noBtn.textContent = "No, keep them";
    confirmPart.appendChild(noBtn);

    noBtn.addEventListener("click", () => {
      body.removeChild(shadowConfirmation);
    });

    let yesBtn = document.createElement("button");
    yesBtn.style = `color:red`;
    yesBtn.classList.add("yes-no_Btn");
    yesBtn.textContent = "Yes, delete them all";
    confirmPart.appendChild(yesBtn);

    yesBtn.addEventListener("click", () => {
      while (allTasks[0]) {
        allTasks[0].parentNode.removeChild(allTasks[0]);
        localStorage.removeItem("Tasks");
      }
      window.location.reload();
    });
  }
});

// isPasswordSet or not________________________________
let isPasswordSet = localStorage.getItem("Password");
let shadowPassword = document.createElement("div");
shadowPassword.style = `z-index:10; background-color:#000000e3`;
shadowPassword.classList.add("shadowSet");
if (isPasswordSet === null) {
  shadowPassword.classList.remove("shadowSet");
} else {
  let checkPasswordSet = () => {
    body.appendChild(shadowPassword);

    //   Form____________________________________________
    let form_Settings = document.createElement("form");
    form_Settings.classList.add("form_Settings");

    shadowPassword.appendChild(form_Settings);

    //   Header__________________________________________
    let h3 = document.createElement("h3");
    h3.innerText = "Please enter your password:";
    form_Settings.appendChild(h3);

    //   Inputs___________________________________________
    let inputWrapper = document.createElement("div");
    inputWrapper.classList.add("inputWrapper");
    form_Settings.appendChild(inputWrapper);

    let label = document.createElement("label");
    label.style = `margin-top:20px`;
    label.textContent = "Password: ";
    inputWrapper.appendChild(label);

    let inputWrap = document.createElement("div");
    inputWrap.classList.add("inputWrap");
    inputWrapper.appendChild(inputWrap);

    let inputType = document.createElement("input");
    inputType.setAttribute("type", "password");
    inputType.classList.add("name");
    inputType.setAttribute("placeholder", "Enter your password");

    let pswrdIcon = document.createElement("div");
    pswrdIcon.classList.add("user");
    pswrdIcon.innerHTML = "<i class='fa fa-lock'></i>";
    inputWrap.appendChild(pswrdIcon);

    inputWrap.appendChild(inputType);
    //   Submit___________________________________________
    let sbt = document.createElement("button");
    sbt.classList.add("sbt");
    sbt.textContent = "Submit";
    form_Settings.appendChild(sbt);
    sbt.addEventListener("click", (e) => {
      e.preventDefault();
      let regex2 = /^[0-9]{4,8}$/gm;
      let info2 = document.createElement("p");
      if (inputType.value !== "" && regex2.test(inputType.value)) {
        if (inputType.value !== isPasswordSet) {
          info2.innerText =
            "Incorrect. Not matching with the last submitted password ";
          inputWrap.style = `border:3px solid red;box-shadow: rgba(243, 5, 5, 0.25) 0px 54px 55px, rgba(255, 0, 0, 0.12) 0px -12px 30px, rgba(255, 0, 0, 0.12) 0px 4px 6px, rgba(255, 3, 3, 0.17) 0px 12px 13px, rgba(255, 0, 0, 0.09) 0px -3px 5px;`;
          pswrdIcon.style.color = "red";

          info2.style = `color:red; text-align:center; margin-top:15px`;
          form_Settings.insertBefore(info2, sbt);
          setTimeout(() => {
            inputWrap.style = `border:none; box-shadow:none`;
            pswrdIcon.style.color = "";
            form_Settings.removeChild(info2);
          }, 2000);
        } else {
          body.removeChild(shadowPassword);
        }
      } else {
        let hasSpace = /\s/;

        if (hasSpace.test(inputType.value)) {
          info2.innerText =
            "Please fill out 'password' field without any space";
        } else if (inputType.value == "") {
          info2.innerText = "Please fill out 'password' field";
        } else {
          if (!regex2.test(inputType.value)) {
            info2.innerText = "min~4 max~8 and only numbers allowed";
          }
        }

        inputWrap.style = `border:3px solid red;box-shadow: rgba(243, 5, 5, 0.25) 0px 54px 55px, rgba(255, 0, 0, 0.12) 0px -12px 30px, rgba(255, 0, 0, 0.12) 0px 4px 6px, rgba(255, 3, 3, 0.17) 0px 12px 13px, rgba(255, 0, 0, 0.09) 0px -3px 5px;`;
        pswrdIcon.style.color = "red";

        info2.style = `color:red; text-align:center;margin-top:15px`;
        form_Settings.insertBefore(info2, sbt);

        setTimeout(() => {
          inputWrap.style = `border:none; box-shadow:none`;
          pswrdIcon.style.color = "";
          form_Settings.removeChild(info2);
        }, 2000);
      }
    });
  };
  location.reload = checkPasswordSet();
}
