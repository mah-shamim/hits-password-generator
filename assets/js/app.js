'use strict';

(function($) {
  //preloader
  $(".preloader").delay(300).animate({
    "opacity" : "0"
    }, 300, function() {
    $(".preloader").css("display","none");
  });

  // Animate the scroll to top
  $(".scroll-to-top").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: 0
    }, 300);
  });

  const passwordField = document.getElementById('password');
  const generateBtn = document.getElementById('generateBtn');
  const copyBtn = document.getElementById('copyBtn');
  const hidePasswordBtn = document.getElementById('hidePasswordBtn');
  const lengthField = document.getElementById('length');
  const lengthDisplay = document.getElementById('lengthDisplay');

  const uppercaseCheckbox = document.getElementById('uppercase');
  const lowercaseCheckbox = document.getElementById('lowercase');
  const numbersCheckbox = document.getElementById('numbers');
  const symbolsCheckbox = document.getElementById('symbols');

  const customRadio = document.getElementById('custom');
  const defaultRadio = document.getElementById('default');
  const strongRadio = document.getElementById('strong');

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  function generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols) {
      let charSet = '';
      if (useUppercase) charSet += uppercaseChars;
      if (useLowercase) charSet += lowercaseChars;
      if (useNumbers) charSet += numberChars;
      if (useSymbols) charSet += symbolChars;

      if (charSet === '') return '';

      let password = '';
      for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charSet.length);
          password += charSet[randomIndex];
      }
      return password;
  }

  function initialize() {
      if (defaultRadio.checked) {
          lengthField.value = 16;
          lengthDisplay.textContent = `Length: ${lengthField.value}`;
          uppercaseCheckbox.checked = true;
          lowercaseCheckbox.checked = true;
          numbersCheckbox.checked = false;
          symbolsCheckbox.checked = false;
      } else if (strongRadio.checked) {
          lengthField.value = 25;
          lengthDisplay.textContent = `Length: ${lengthField.value}`;
          uppercaseCheckbox.checked = true;
          lowercaseCheckbox.checked = true;
          numbersCheckbox.checked = true;
          symbolsCheckbox.checked = true;
      } else {
          // Assuming customRadio is checked by default
          const customLength = parseInt(lengthField.value);
          lengthDisplay.textContent = `Length: ${customLength}`;
          uppercaseCheckbox.checked = true;
          lowercaseCheckbox.checked = true;
      }

      const password = generatePassword(
          parseInt(lengthField.value),
          uppercaseCheckbox.checked,
          lowercaseCheckbox.checked,
          numbersCheckbox.checked,
          symbolsCheckbox.checked
      );
      passwordField.value = password;
  }

  function setCustomIfChecked() {
      if (numbersCheckbox.checked || symbolsCheckbox.checked) {
          customRadio.checked = true;
      }
  }

  defaultRadio.addEventListener('change', () => {
      if (defaultRadio.checked) {
          lengthField.value = 16;
          lengthDisplay.textContent = `Length: ${lengthField.value}`;
          uppercaseCheckbox.checked = true;
          lowercaseCheckbox.checked = true;
          numbersCheckbox.checked = false;
          symbolsCheckbox.checked = false;
      }
  });

  strongRadio.addEventListener('change', () => {
      if (strongRadio.checked) {
          numbersCheckbox.checked = true;
          symbolsCheckbox.checked = true;
          lengthField.value = 25;
          lengthDisplay.textContent = `Length: ${lengthField.value}`;
      }
  });

  customRadio.addEventListener('change', () => {
      if (customRadio.checked) {
          numbersCheckbox.checked = false;
          symbolsCheckbox.checked = false;
          lengthField.value = 16;
          lengthDisplay.textContent = `Length: ${lengthField.value}`;
      }
  });

  generateBtn.addEventListener('click', () => {
      let length = parseInt(lengthField.value);

      if (customRadio.checked) {
          length = parseInt(lengthField.value);
      }

      const password = generatePassword(
          length,
          uppercaseCheckbox.checked,
          lowercaseCheckbox.checked,
          numbersCheckbox.checked,
          symbolsCheckbox.checked
      );
      passwordField.value = password;
  });

  copyBtn.addEventListener('click', () => {
      passwordField.select();
      document.execCommand('copy');
  });

  hidePasswordBtn.addEventListener('click', () => {
      if (passwordField.type === 'text') {
          passwordField.type = 'password';
          hidePasswordBtn.textContent = 'Show';
      } else {
          passwordField.type = 'text';
          hidePasswordBtn.textContent = 'Hide';
      }
  });

  numbersCheckbox.addEventListener('change', setCustomIfChecked);
  symbolsCheckbox.addEventListener('change', setCustomIfChecked);

  lengthField.addEventListener('input', () => {
      lengthDisplay.textContent = `Length: ${lengthField.value}`;
  });

  window.addEventListener('load', initialize);
})(jQuery);