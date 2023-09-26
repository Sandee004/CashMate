function copyToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Account number copied to clipboard!');
}

function maskCardNumber(cardNumber) {
    const visibleNumber = cardNumber.substring(0, 10) + '*'.repeat(cardNumber.length - 10); // Show the first 10 digits and replace the rest with asterisks
    return visibleNumber;
}

function handleClipboardClick() {
    const accountNumberElement = document.getElementById('card-number');
    const accountNumber = accountNumberElement.dataset.fullNumber;
    accountNumberElement.textContent = accountNumber; // Update the displayed number to show the complete card number
    copyToClipboard(accountNumber); // Copy the full number to clipboard
    accountNumberElement.textContent = maskCardNumber(accountNumber); // Show only the first 10 digits with asterisks
}

// On page load
document.addEventListener('DOMContentLoaded', function() {
    const accountNumberElement = document.getElementById('card-number');
    const accountNumber = accountNumberElement.dataset.fullNumber;
    accountNumberElement.textContent = maskCardNumber(accountNumber); // Show only the first 10 digits with asterisks
});

// Attach event listener to clipboard button
const clipboardButton = document.getElementById('clipboard');
clipboardButton.addEventListener('click', handleClipboardClick);


/*function copyToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Account number copied to clipboard!');
}

function handleClipboardClick() {
    const accountNumberElement = document.getElementById('card-number');
    const accountNumber = accountNumberElement.textContent;
    const asteriskedAccountNumber = accountNumber.slice(0, -6) + '******';
    copyToClipboard(accountNumber);
    accountNumberElement.textContent = asteriskedAccountNumber;
}

// Attach event listener to clipboard button
const clipboardButton = document.getElementById('clipboard');
clipboardButton.addEventListener('click', handleClipboardClick);
*/
//Function to run when the page finishes loading
function onPageLoad() {
var transactionsBtn = document.getElementById('transactions');
var analyticsBtn = document.getElementById('analytics');
var analytics = document.getElementById('analytics-div');
var transactions = document.getElementById('transactions-div');

    transactions.style.display = "block"
    analytics.style.display = "none"
    transactionsBtn.style.textDecoration = "underline"
    transactionsBtn.style.textDecorationColor = "silver"


transactionsBtn.addEventListener("click", function() {
    transactions.style.display = "block"
    analytics.style.display = "none"
    transactionsBtn.style.textDecoration = "underline"
    transactionsBtn.style.textDecorationColor = "silver"
    analyticsBtn.style.textDecoration = "none"
})

analyticsBtn.addEventListener("click", function () {
    transactions.style.display = "none"
    analytics.style.display = "block"
    analyticsBtn.style.textDecoration = "underline"
    analyticsBtn.style.textDecorationColor = "silver"
    transactionsBtn.style.textDecoration = "none"
})
    

//Months bars
        var data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
        {
            label: 'Sent',
            data: [74000, 100000, 99000, 198000, 245000],
            backgroundColor: '#63B76C'
        },
        {
            label: 'Received',
            data: [73000, 145000, 149000, 293000, 285000],
            backgroundColor: 'black'
        }
    ]
};

// Configuration options for the bar chart
var options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            position: 'top'
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        }
    },
    barPercentage: 0.7, // Adjust the bar width as needed
    categoryPercentage: 0.4 // Adjust the spacing between bars as needed
};

// Create the bar chart
var barChart = new Chart(document.getElementById('months-bar'), {
    type: 'bar',
    data: data,
    options: options
});


//Weeks bar
var data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
        {
            label: 'Sent',
            data: [45000, 120000, 180000, 10000],
            backgroundColor: '#63B76C'
        },
        {
            label: 'Received',
            data: [50000, 150000, 75000, 10000],
            backgroundColor: 'black'
        }
    ]
};

// Configuration options for the bar chart
var options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            position: 'top',
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        }
    },
    barPercentage: 0.7, // Adjust the bar width as needed
    categoryPercentage: 0.5 // Adjust the spacing between bars as needed
};

// Create the bar chart
var barChart = new Chart(document.getElementById('weeks-bar'), {
    type: 'bar',
    data: data,
    options: options
});
        

var weeksBtn = document.getElementById('weeks');
var monthsBtn = document.getElementById('months');
var weeksDiv = document.getElementById('weeks-div');
var monthsDiv = document.getElementById('months-div');

weeksBtn.style.border = "1.5px solid black"
monthsBtn.style.border = "0.5px solid black"
    
weeksBtn.addEventListener("click", function() {
    weeksDiv.style.display = "block";
    monthsDiv.style.display = "none"
    weeksBtn.style.border = "1.5px solid black"
monthsBtn.style.border = "0.5px solid black"
    
})
monthsBtn.addEventListener("click", function() {
    weeksDiv.style.display = "none"
    monthsDiv.style.display = "block"
    weeksBtn.style.border = "0.5px solid black"
monthsBtn.style.border = "1.5px solid black"
})
    }

// Call onPageLoad when page finishes loading
window.addEventListener('load', onPageLoad);
    