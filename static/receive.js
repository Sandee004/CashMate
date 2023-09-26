function generateUniqueNumber() {
  var randomNumber = '';
  var digits = '0123456789';

  for (var i = 0; i < 10; i++) {
    var randomIndex = Math.floor(Math.random() * digits.length);
    randomNumber += digits[randomIndex];
  }

  return randomNumber;
}

var uniqueNumber = generateUniqueNumber(); // Generate a unique number
var uniqueLink = String(uniqueNumber); // Convert the unique number to a string

// Generate QR code
var qr = new QRious({
    element: document.getElementById('qrcode'),
    value: uniqueNumber.toString(), // Use the unique number as the value for the QR code
    size: 128
});

document.getElementById('acc-no').textContent = uniqueNumber

/*function copyToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Account number copied to clipboard!');
}*/


function copyToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Account number copied to clipboard!');
}

// Function to handle clipboard icon click
function handleClipboardClick() {
    const accountNumber = document.getElementById('acc-no').textContent;
    copyToClipboard(accountNumber);
}

// Attach event listener to clipboard icon
const clipboardIcon = document.getElementById('clipboard');
clipboardIcon.addEventListener('click', handleClipboardClick);