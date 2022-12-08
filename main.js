$(document).ready(() => {
  $(".regexbtn").on("click", (e) => {
    //copied popup message
    navigator.clipboard.writeText(passwordRegex);
    $(".cursor").removeClass("none");
    $(".cursor").css("left", e.pageX + 20);
    $(".cursor").css("top", e.pageY - 10);
    console.log(e.pageX, e.pageY);
    setTimeout(() => {
      $(".cursor").addClass("none");
    }, 1000);
  });

  // credit card checker
  let validation = /^\d+\d*$/;
  let visaChecker = /^4\d{12}$|^4\d{15}$/;
  let masterChecker = /^5[1-5]\d{14}$/;
  let dinersClub = /(^30[0-5]|^36|^38)\d{11}$/;
  let ccn = $("#creditcardnumber");
  let ccc = $("#creditcardcompany");
  ccn.on("keyup", () => {
    if (ccn.val() === "") {
      ccc.text("").removeClass("invalidText");
      console.log("empty");
    } else if (visaChecker.test(ccn.val())) {
      ccc.html("visa").removeClass("invalidtext").addClass("validtext");
      console.log("visa");
    } else if (masterChecker.test(ccn.val())) {
      ccc.html("mastercard").removeClass("invalidtext").addClass("validtext");
      console.log("mastercard");
    } else if (!validation.test(ccn.val())) {
      ccc
        .html("invalid format")
        .addClass("invalidtext")
        .removeClass("validtext");
      ccn.addClass("invalid");
    } else {
      ccc
        .html("card not supported")
        .addClass("invalidtext")
        .removeClass("validtext");
      console.log("card not supported");
    }
  });

  // end of credit card checker

  // credentials validator
  let emailRegex = /^\w+([\.-_]\w+)*@\w+([\.-]\w+)*\.([A-Za-z]{2,3})$/i;
  $("#email").on("keyup", () => {
    console.log($("#email").val());
    if (emailRegex.test($("#email").val())) {
      $("#emailcheck").removeClass("none");
      $("#emailx").addClass("none");
    } else {
      $("#emailcheck").addClass("none");
      $("#emailx").removeClass("none");
    }
  });

  let passwordRegex =
    /(?=^.*[A-Z]+)(?=^.*[a-z]+)(?=^.*\d+)(?=^.*\W+)(?!=.*\s+.*)^.{8,16}$/;
  let uppercaseRegex = /(?=.*[A-Z]+)/;
  let lowerCaseRegex = /(?=^.*[a-z]+)/;
  let digitRegex = /(?=.*\d+)/;
  let noSpaceRegex = /(?=^\S*$)/;
  let nonalphaRegex = /(?=.*\W+)/;
  let passwordLengthRegex = /^.{8,16}$/;
  let passXs = document.getElementsByClassName("passwordx");
  let passChecks = document.getElementsByClassName("passwordcheck");
  $("#password").on("keyup", () => {
    if (uppercaseRegex.test($("#password").val())) {
      passXs[0].classList.add("none");
      passChecks[0].classList.remove("none");
    } else {
      passXs[0].classList.remove("none");
      passChecks[0].classList.add("none");
    }
    if (lowerCaseRegex.test($("#password").val())) {
      passXs[1].classList.add("none");
      passChecks[1].classList.remove("none");
    } else {
      passXs[1].classList.remove("none");
      passChecks[1].classList.add("none");
    }
    if (digitRegex.test($("#password").val())) {
      passXs[2].classList.add("none");
      passChecks[2].classList.remove("none");
    } else {
      passXs[2].classList.remove("none");
      passChecks[2].classList.add("none");
    }
    if (noSpaceRegex.test($("#password").val())) {
      passXs[3].classList.add("none");
      passChecks[3].classList.remove("none");
    } else {
      passXs[3].classList.remove("none");
      passChecks[3].classList.add("none");
    }
    if (nonalphaRegex.test($("#password").val())) {
      passXs[4].classList.add("none");
      passChecks[4].classList.remove("none");
    } else {
      passXs[4].classList.remove("none");
      passChecks[4].classList.add("none");
    }
    if (passwordLengthRegex.test($("#password").val())) {
      passXs[5].classList.add("none");
      passChecks[5].classList.remove("none");
    } else {
      passXs[5].classList.remove("none");
      passChecks[5].classList.add("none");
    }
  });

  $("#copyemailregex").on("click", () => {
    navigator.clipboard.writeText(emailRegex);
    console.log(emailRegex);
  });

  $("#copypasswordregex").on("click", () => {
    navigator.clipboard.writeText(passwordRegex);
  });

  // end of credentials validator

  // date line search
  $("#searchDate").on("click", () => {
    $("#dateSearchOutput").empty();
    let jsDateFormat = $("#inputDate").val().split("-");
    console.log(jsDateFormat);
    let date;
    let splitLines = $("#paragraph").val().split("\n");
    console.log(splitLines);
    let dateInLineRegex = new RegExp(`.*` + date + `.*`, "g");
    for (let j = 0; j < splitLines.length; j++) {
      if ($("#rb1").is(":checked")) {
        console.log("rb1");
        date = `${jsDateFormat[2]}/${jsDateFormat[1]}/${jsDateFormat[0]}`;
        console.log(date);
        dateInLineRegex = RegExp(`.*` + date + `.*`, "g");
        console.log(dateInLineRegex);
        if (dateInLineRegex.test(splitLines[j])) {
          $("#dateSearchOutput").append(
            `<p>&#8226 line#${j + 1} - ${splitLines[j].replace(
              date,
              `<markup class='bgyellow navy'>${date}</markup>`,
            )}</p>`,
          );
        } else {
          console.log("no match");
        }
      } else if ($("#rb2").is(":checked")) {
        date = `${jsDateFormat[1]}/${jsDateFormat[2]}/${jsDateFormat[0]}`;
        dateInLineRegex = RegExp(`.*` + date + `.*`, "g");
        console.log(date);
        console.log(dateInLineRegex);
        if (dateInLineRegex.test(splitLines[j])) {
          $("#dateSearchOutput").append(
            `<p>&#8226 line#${j + 1} - ${splitLines[j].replace(
              date,
              `<markup class='bgyellow navy'>${date}</markup>`,
            )}</p>`,
          );
        }
      } else if ($("#rb3").is(":checked")) {
        let month;
        let months = [
          "january",
          "february",
          "march",
          "april",
          "may",
          "june",
          "july",
          "august",
          "september",
          "october",
          "november",
          "december",
        ];
        for (let i = 0; i < 12; i++) {
          if (jsDateFormat[1] == i + 1) {
            month = months[i];
            console.log(month);
            date = `${month} ${jsDateFormat[2]}, ${jsDateFormat[0]}`;
            dateInLineRegex = RegExp(`.*` + date + `.*`, "gi");
            console.log(date);
            if (dateInLineRegex.test(splitLines[j])) {
              $("#dateSearchOutput").append(
                `<p>&#8226 line#${j + 1} - ${splitLines[j].replace(
                  date,
                  `<markup class='bgyellow navy'>${date}</markup>`,
                )}</p>`,
              );
            }
          }
        }
      }
    }
  });
});
// end of date line search

// word counter
$("#countWords").on("click", () => {
  let wordCountRegex = /\S+/g;
  let whitespacesRegex = /^\s|\s$/g;
  let result = $("#words")
    .val()
    .replace(whitespacesRegex, "")
    .match(wordCountRegex);
  $("#countedWords").html(result.length);
});
// end of word counter

// ip validator
let ipv4regex =
  /([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|2[0-4][0-9]|25[0-5])$/;
let ipv6regex =
  /^([a-f0-9]{4}:|[a-f1-9][a-f0-9]{2}:|[a-f1-9][a-f0-9]:|[a-f1-9]:){7}([a-f0-9]{4}|[a-f1-9][a-f0-9]{2}|[a-f1-9][a-f0-9]|[a-f1-9])$|^::([a-f0-9]{4}:|[a-f1-9][a-f0-9]{2}:|[a-f1-9][a-f0-9]:|[a-f1-9]:){0,6}([a-f0-9]{4}|[a-f1-9][a-f0-9]{2}|[a-f1-9][a-f0-9]|[a-f1-9])$|^([a-f0-9]{4}|[a-f1-9]{2}[a-f0-9]|[a-f1-9][a-f0-9]|[a-f1-9])::(([a-f0-9]{4}:|[a-f1-9][a-f0-9]{2}:|[a-f1-9][a-f0-9]:|[a-f1-9]:){0,5}([a-f0-9]{4}|[a-f1-9][a-f0-9]{2}|[a-f1-9][a-f0-9]|[a-f1-9]))?$|^([a-f0-9]{4}:|[a-f1-9][a-f0-9]{2}:|[a-f1-9][a-f0-9]:|[a-f1-9]:){2}:(([a-f0-9]{4}:|[a-f1-9][a-f0-9]{2}:|[a-f1-9][a-f0-9]:|[a-f1-9]:){0,4}([a-f0-9]{4}|[a-f1-9][a-f0-9]{2}|[a-f1-9][a-f0-9]|[a-f1-9]))?$|^([a-f0-9]{4}:|[a-f1-9][a-f0-9]{2}:|[a-f1-9][a-f0-9]:|[a-f1-9]:){3}:(([a-f0-9]{4}:|[a-f1-9][a-f0-9]{2}:|[a-f1-9][a-f0-9]:|[a-f1-9]:){0,3}([a-f0-9]{4}|[a-f1-9][a-f0-9]{2}|[a-f1-9][a-f0-9]|[a-f1-9]))?$|^([a-f0-9]{4}:|[a-f1-9][a-f0-9]{2}:|[a-f1-9][a-f0-9]:|[a-f1-9]:){4}:(([a-f0-9]{4}:|[a-f1-9][a-f0-9]{2}:|[a-f1-9][a-f0-9]:|[a-f1-9]:){0,2}([a-f0-9]{4}|[a-f1-9][a-f0-9]{2}|[a-f1-9][a-f0-9]|[a-f1-9]))?$|^([a-f0-9]{4}:|[a-f1-9][a-f0-9]{2}:|[a-f1-9][a-f0-9]:|[a-f1-9]:){6}:([a-f0-9]{4}|[a-f1-9][a-f0-9]{2}|[a-f1-9][a-f0-9]|[a-f1-9])?$|^([a-f0-9]{4}:|[a-f1-9][a-f0-9]{2}:|[a-f1-9][a-f0-9]:|[a-f1-9]:){7}$:/;
$("#ipinput").on("keyup", () => {
  if ($("#ipinput").val() === "") {
    $("#validip").addClass("none");
    $("#invalidip").addClass("none");
  }
});
$("#validateip").on("click", () => {
  if (ipv4regex.test($("#ipinput").val())) {
    $("#validip").removeClass("none");
    $("#invalidip").addClass("none");
    $("#ipid").html("ipv4");
  } else if (ipv6regex.test($("#ipinput").val())) {
    $("#validip").removeClass("none");
    $("#invalidip").addClass("none");
    $("#ipid").html("ipv6");
  } else {
    $("#validip").addClass("none");
    $("#invalidip").removeClass("none");
  }
});
// end of ip validator

// regex generator
const arrayFromCodes = (array, min, max) => {
  for (let i = min; i <= max; i++) {
    array.push(String.fromCharCode(i));
  }
};

const randomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

const replaceVal = (oldVal, newVal, array) => {
  for (let i = 0; i <= array.length; i++) {
    if (array[i] === oldVal) {
      array[i] = newVal;
    }
  }
  return array;
};

const concatArrays = (...any) => {
  let array = [];
  for (let i = 0; i < any.length; i++) {
    array = array.concat(any[i]);
  }
  return array;
};

const plusOperator = (i, selector, array, randomIndexOrSameInput) => {
  let randomMax = Math.floor(Math.random() * 30);
  if (randomIndexOrSameInput === "random") {
    for (let j = 0; i <= randomMax; j++) {
      selector.append(array[Math.floor(Math.random() * array.length)]);
    }
  } else if (randomIndexOrSameInput === "same") {
    for (let j = 0; i <= randomMax; j++) {
      selector.append(input[i]);
    }
  }
};

const asteriskOperator = (selector, array) => {
  let randomMax = Math.floor(Math.random() * 30);
  if (randomMax === 0) {
    selector.append("");
  } else {
    for (let i = 0; i < randomMax; i++) {
      selector.append(array[Math.floor(Math.random() * array.length)]);
    }
  }
};

const zeroOrOne = (selector, array) => {
  let a = Math.floor(Math.random() * 2);
  if (a === 0) {
    selector.append("");
  } else {
    selector.append(array[Math.floor(Math.random() * array.length)]);
  }
  console.log(a);
};

const printExactly = (number, selector, array) => {
  for (let i = 0; i < number; i++) {
    selector.append(array[Math.floor(Math.random() * array.length)]);
  }
};

const quantifiers = (i, array, charsAfterI, randomIndexOrSameInput) => {
  if (randomIndexOrSameInput === "random") {
    switch (input[i + charsAfterI]) {
      case "+":
        plusOperator(i, $("#output"), array, randomIndexOrSameInput);
        i++;
        break;
      case "*":
        asteriskOperator($("#output"), array);
        i++;
        break;
      case "?":
        zeroOrOne($("#output"), array);
        i++;
        break;
      case "{":
        for (let j = i + charsAfterI + 1; j < input.length; j++) {
          if (input[j] === "}") {
            let numbers = [];
            for (let k = i + charsAfterI + 1; k < j; k++) {
              numbers.push(input[k]);
            }
            let exactly = Number(numbers.join(""));
            printExactly(exactly, $("#output"), array);
            i = j;
            return i;
          }
        }
        break;
      default:
        $("#output").append(array[randomIndex(array)]);
        break;
    }
  } else if (randomIndexOrSameInput === "same") {
    switch (input[i + charsAfterI]) {
      case "+":
        plusOperator(i, $("#output"), array, randomIndexOrSameInput);
        i++;
        break;
      case "*":
        asteriskOperator($("#output"), array);
        i++;
        break;
      case "?":
        zeroOrOne($("#output"), array);
        i++;
        break;
      case "{":
        for (let j = i + charsAfterI + 1; j < input.length; j++) {
          if (input[j] === "}") {
            let numbers = [];
            for (let k = i + charsAfterI + 1; k < j; k++) {
              numbers.push(input[k]);
            }
            let exactly = Number(numbers.join(""));
            printExactly(exactly, $("#output"), array);
            i = j;
            return i;
          }
        }
        break;
      default:
        $("#output").append(input[i]);
        break;
    }
  }
};

const letters = [];
arrayFromCodes(letters, 65, 90);
arrayFromCodes(letters, 97, 122);

const alpha = [];
arrayFromCodes(alpha, 48, 57);
arrayFromCodes(alpha, 65, 90);
arrayFromCodes(alpha, 97, 122);

const digits = [];
arrayFromCodes(digits, 48, 57);

const nonAlpha = [];
arrayFromCodes(nonAlpha, 32, 47);
arrayFromCodes(nonAlpha, 58, 64);
arrayFromCodes(nonAlpha, 91, 96);
arrayFromCodes(nonAlpha, 123, 126);

const whitespace = [];
arrayFromCodes(whitespace, 9, 10);
arrayFromCodes(whitespace, 12, 13);

const nonWhitespace = concatArrays(alpha, digits, nonAlpha);
const nonDigit = concatArrays(letters, nonAlpha, whitespace);

replaceVal('"', '"', nonAlpha);

let w = /\\w/;
let W = /\\W/;

let input;
let temp;
$("#click").on("click", () => {
  $("#output").empty();
  input = Array.from($("#regex").val());
  for (let i = 0; i < input.length; i++) {
    console.log(`input index: ${i}`);
    if (input[i] === "\\") {
      switch (input[i + 1]) {
        case "w":
          i = quantifiers(i, alpha, 2, "random");
          break;
        case "W":
          i = quantifiers(i, nonAlpha, 2, "random");
          break;
        case "d":
          i = quantifiers(i, digits, 2, "random");
          break;
        case "D":
          i = quantifiers(i, nonDigit, 2, "random");
          break;
        case "s":
          i = quantifiers(i, whitespace, 2, "random");
          break;
        case "S":
          i = quantifiers(i, nonWhitespace, 2, "random");
          break;
        case "\\":
          $("#output").append("\\");
          break;
        case "*":
          $("#output").append("*");
          break;
        case ".":
          $("#output").append(".");
          break;
        case "t":
          $("#output").append(String.fromCharCode(9));
          break;
        case "n":
          $("#output").append(String.fromCharCode(10));
          break;
        case "r":
          $("#output").append(String.fromCharCode(13));
          break;
      }
      i++;
    } else if (/[A-Za-z1-9]/.test(input[i])) {
      quantifiers(i, alpha, 1, "same");
    } else if (input[i] === ".") {
      let wildcard = [];
      arrayFromCodes(wildcard, 32, 126);
      i = quantifiers(i, wildcard, 1, random);
    }
  }
});

/* $('#click').on('click',()=>{
console.log(Array.from($('#regex').val()));
$('#output').empty();
if($('#regex').val().match(w)){
$('#output').append(alphanumeric[randomIndex(alphanumeric)])
}
if($('#regex').val().match(W)){
$('#output').append(nonAlpha[randomIndex(nonAlpha)]);
}
}); */
/* 
$('#click').on('click',()=>{
if($('#regex').val()==='\\w'){
$('#output').text(alphanumeric[randomIndex(alphanumeric)]);
}else if($('#regex').val() === '\\W'){
$('#output').text(nonAlpha[randomIndex(nonAlpha)]);
}
}); */

// end of regex generator
let sections = document.querySelectorAll("section");
let options = {
  root: null,
  threshold: 0.6,
};

let observer = new IntersectionObserver(callback, options);

sections.forEach((section) => {
  observer.observe(section);
});

function callback(entries, observer) {
  console.log(entries);
  entries.forEach((e) => {
    if (e.isIntersecting) {
      console.log(e.target);
      e.target.scrollIntoView({ alignToTop: true, behavior: "smooth" });
      observer.unobserve(e.target);
    }
  });
}
let scrollDown = document.getElementById("scrollDown");
scrollDown.addEventListener("click", () => {
  testBoundingSection.scrollIntoView({ alignToTop: true, behavior: "smooth" });
});

let testBoundingSection = document.getElementById("testBoundingRect");
// testBoundingSection.scrollIntoView({ alignToTop: true, behavior: "smooth" });
