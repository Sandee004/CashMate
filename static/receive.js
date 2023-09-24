/*var uniqueId = uuidv4(); // Generate a unique ID using the UUID library
var uniqueLink = 'https://example.com/' + uniqueId; // Append the unique ID to the base URL

//Display the unique link
var linkContainer = document.getElementById('linkContainer');
linkContainer.textContent = uniqueLink

// Generate QR code
var qr = new QRious({
    element: document.getElementById('qrcode'),
    value: uniqueLink,
    size: 128
});

// Function to generate a v4 UUID
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
*/
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

function copyToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Account number copied to clipboard!');
}