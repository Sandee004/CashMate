document.querySelectorAll('.key').forEach(function(element) {
  element.addEventListener('click', function() {
    var numberInput = document.querySelector('.number-input');
    var amount = numberInput.value;
    var dataNumber = this.getAttribute('data-number');

    if (dataNumber === 'delete') {
      amount = amount.slice(0, -1);
    } else {
      amount += dataNumber;
    }

    numberInput.value = amount;

    if (amount.length > 0) {
      document.querySelector('.key.delete').classList.add('show');
    } else {
      document.querySelector('.key.delete').classList.remove('show');
    }
  });
});



var popup = document.getElementById('popup');
var openButton = document.getElementById('open-button');

openButton.addEventListener('click', function() {
  popup.style.display = 'block';
  document.addEventListener('click', closePopupOutside);
});

function closePopupOutside(event) {
  var targetElement = event.target;

  // Check if the clicked element is outside the popup and the open button
  if (!popup.contains(targetElement) && targetElement !== openButton) {
    popup.style.display = 'none';
    document.removeEventListener('click', closePopupOutside);
  }
}

function confirmTransaction() {
  var transactionDescription = document.getElementById('transaction-description').value;
  // Perform any necessary actions with the transaction description
  // Redirect the user to the homepage
  window.location.href = "https://cashmate.sandee004.repl.co/homepage";
}
