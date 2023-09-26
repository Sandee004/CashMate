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