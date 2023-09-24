function generateAccountNumber() {
  var accountNumber = '';
  var digits = '0123456789';

  for (var i = 0; i < 16; i++) {
    var randomIndex = Math.floor(Math.random() * digits.length);
    accountNumber += digits[randomIndex];
  }
  return accountNumber;
}

// Function to run when the page finishes loading
function onPageLoad() {
  var accountNumber = generateAccountNumber();
  document.getElementById('card-number').innerHTML = accountNumber;

var transactionsBtn = document.getElementById('transactions');
var analyticsBtn = document.getElementById('analytics');
var analytics = document.getElementById('analytics-div');
var transactions = document.getElementById('transactions-div');

transactionsBtn.addEventListener("click", function() {
    transactions.style.display = "block"
    analytics.style.display = "none"
})

analyticsBtn.addEventListener("click", function () {
    transactions.style.display = "none"
    analytics.style.display = "block"
}
)


//Months bar
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
    categoryPercentage: 0.5 // Adjust the spacing between bars as needed
};

// Create the bar chart
var barChart = new Chart(document.getElementById('weeks-bar'), {
    type: 'bar',
    data: data,
    options: options
});

    
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
                left: 10,
                right: 10,
                top: 20,
                bottom: 20
            }
        }
    },
    barPercentage: 0.6, // Adjust the bar width as needed
    categoryPercentage: 0.2 // Adjust the spacing between bars as needed
};

// Create the bar chart
var barChart = new Chart(document.getElementById('days-bar'), {
    type: 'bar',
    data: data,
    options: options
});


var weeksBtn = document.getElementById('weeks');
var monthsBtn = document.getElementById('months');
var weeksDiv = document.getElementById('weeks-div');
var monthsDiv = document.getElementById('months-div');

weeksBtn.addEventListener("click", function() {
    weeksDiv.style.display = "block";
    monthsDiv.style.display = "none"
})
monthsBtn.addEventListener("click", function() {
    weeksDiv.style.display = "none"
    monthsDiv.style.display = "block"
})
    }

// Call onPageLoad when page finishes loading
window.addEventListener('load', onPageLoad);
    