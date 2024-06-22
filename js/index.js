let btn = document.querySelector("button");
let body = document.querySelector("body");

// Form submission___________________________________________
btn.addEventListener("click", () => {
  //   Shadow_________________________________________
  let shadow = document.createElement("div");
  shadow.classList.add("shadow");
  body.appendChild(shadow);

  //   Form____________________________________________

  let form = document.createElement("form");
  form.classList.add("form");
  shadow.appendChild(form);

  //   Header__________________________________________
  let p = document.createElement("p");
  p.innerHTML = "<h2>A little info about you:</h2>";
  form.appendChild(p);

  //   Inputs__________________________________________
  let inputs = document.createElement("div");
  inputs.classList.add("inputs");
  form.appendChild(inputs);

  //   Input1__________________________________________
  let label = document.createElement("label");
  label.innerHTML =
    "Name:   <span style='color:red; margin-left:3px;'>*</span>";
  inputs.appendChild(label);

  let input1 = document.createElement("div");
  input1.classList.add("input1");
  inputs.appendChild(input1);

  let userIcon = document.createElement("div");
  userIcon.classList.add("user");
  input1.appendChild(userIcon);
  userIcon.innerHTML = "<i class='fa fa-user'></i>";

  let name = document.createElement("input");
  name.classList.add("name");
  input1.appendChild(name);
  name.setAttribute("placeholder", "Your name");
  name.setAttribute("required", "true");
  name.style.textTransform = "capitalize";

  //   Input2__________________________________________
  let label2 = document.createElement("label");
  label2.textContent = "Password: ";
  inputs.appendChild(label2);

  let input2 = document.createElement("div");
  input2.classList.add("input1");
  inputs.appendChild(input2);

  let pswrdIcon = document.createElement("div");
  pswrdIcon.classList.add("user");
  input2.appendChild(pswrdIcon);
  pswrdIcon.innerHTML = "<i class='fa fa-lock'></i>";

  let password = document.createElement("input");
  password.classList.add("name");
  input2.appendChild(password);
  password.setAttribute("placeholder", "Create password");
  password.setAttribute("type", "password");

  //   Input3__________________________________________
  let label4 = document.createElement("label");
  label4.textContent = "Upload photo:";
  inputs.appendChild(label4);

  let input3 = document.createElement("div");
  input3.classList.add("input3");
  inputs.appendChild(input3);

  let label3 = document.createElement("label");
  label3.innerHTML =
    "<i class='fa fa-picture-o' style='margin-left:15px;margin-right:14px'></i> Choose";
  label3.classList.add("label3");
  label3.setAttribute("for", "getFile");
  input3.appendChild(label3);

  let prImg = document.createElement("img");
  prImg.classList.add("prImg");
  prImg.setAttribute("id", "pr-img");
  inputs.appendChild(prImg);

  let photo = document.createElement("input");
  photo.style.display = "none";
  inputs.appendChild(photo);
  photo.setAttribute("type", "file");
  photo.setAttribute("id", "getFile");
  photo.setAttribute("accept", "image/*");

  photo.addEventListener("change", (e) => {
    preview(e);
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener("load", () => {
      localStorage.setItem("Photo", reader.result);
    });
  });

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

  let allLabels = document.querySelectorAll("label");
  allLabels.forEach((label) => {
    if (label.textContent !== "Choose" && label.textContent !== "Name: *") {
      label.style.marginTop = "12px";
    }
    if (label.textContent !== "Choose") {
      label.style.marginBottom = "5px";
    }
  });

  //   X-btn_________________________________________

  let x = document.createElement("btn");
  x.classList.add("x-btn");
  x.innerHTML = "<i class='fa fa-times' ></i>";
  form.appendChild(x);

  x.addEventListener("click", () => {
    body.removeChild(shadow);
  });

  //   Submit________________________________________
  let sbt = document.createElement("button");
  sbt.classList.add("sbt");
  sbt.textContent = "Submit";
  form.appendChild(sbt);

  //   Submission process_______________________________

  sbt.addEventListener("click", (e) => {
    e.preventDefault();
    let regex = /^[a-zA-Z]{2,25}$/gm;
    let regex2 = /^[0-9]{4,8}$/gm;

    if (name.value !== "" && regex.test(name.value)) {
      let value = name.value.charAt().toUpperCase() + name.value.slice(1);
      localStorage.setItem("Name", value);
      if (password.value === "") {
        window.location.href = "./main.html";
        photo.addEventListener("change", (e) => {
          const image = e.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.addEventListener("load", () => {
            localStorage.setItem("Photo", reader.result);
          });
        });
      } else {
        if (regex2.test(password.value)) {
          if (photo.value == "") {
            window.location.href = "./main.html";
          } else {
            photo.addEventListener("change", (e) => {
              const image = e.target.files[0];

              const reader = new FileReader();
              reader.readAsDataURL(image);
              reader.addEventListener("load", () => {
                localStorage.setItem("Photo", reader.result);
              });
            });
          }
          window.location.href = "./main.html";
          localStorage.setItem("Password", password.value);
        } else {
          input2.style = `border:3px solid red;box-shadow: rgba(243, 5, 5, 0.25) 0px 54px 55px, rgba(255, 0, 0, 0.12) 0px -12px 30px, rgba(255, 0, 0, 0.12) 0px 4px 6px, rgba(255, 3, 3, 0.17) 0px 12px 13px, rgba(255, 0, 0, 0.09) 0px -3px 5px;`;
          pswrdIcon.style.color = "red";

          let info2 = document.createElement("p");
          let hasSpace = /\s/;
          if (hasSpace.test(password.value)) {
            info2.innerText =
              "Please fill out 'password' field without any space";
          } else {
            info2.innerText = "min~4 max~8 and only numbers allowed";
          }

          info2.style = `color:red; text-align:center`;
          form.insertBefore(info2, sbt);

          setTimeout(() => {
            input2.style = `border:none; box-shadow:none`;
            pswrdIcon.style.color = "";
            form.removeChild(info2);
          }, 2000);
        }
      }
    } else {
      input1.style = `border:3px solid red;box-shadow: rgba(243, 5, 5, 0.25) 0px 54px 55px, rgba(255, 0, 0, 0.12) 0px -12px 30px, rgba(255, 0, 0, 0.12) 0px 4px 6px, rgba(255, 3, 3, 0.17) 0px 12px 13px, rgba(255, 0, 0, 0.09) 0px -3px 5px;`;
      userIcon.style.color = "red";
      let info = document.createElement("p");
      let hasNumber = /\d/;
      let hasSpace = /\s/;

      if (hasNumber.test(name.value)) {
        info.innerText = "Please fill out 'name' field without numbers";
      } else if (hasSpace.test(name.value)) {
        info.innerText = "Please fill out 'name' field without any space";
      } else {
        info.innerText = "Please fill out 'name' field";
      }

      info.style = `color:red; text-align:center`;
      form.insertBefore(info, sbt);
      setTimeout(() => {
        input1.style = `border:none; box-shadow:none`;
        userIcon.style.color = "";
        form.removeChild(info);
      }, 2000);
    }
  });
});

// Directing to the main page________________________________
let userName2 = localStorage.getItem("Name");
if (userName2.length > 0) {
  window.location.href = "./main.html";
}
