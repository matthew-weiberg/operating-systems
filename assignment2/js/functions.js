function runProgram() {
  document.getElementById('userOutputTableContainer').innerHTML = "";
  document.getElementById('progressBarFooter').innerHTML = "";
  const average = (array) => array.reduce((a, b) => a + b) / array.length;
  let userInputValue = document.getElementById('userProcessNumber').value;
  let userInputDurationArray = [];
  let processWaitTimeArray = [];
  let colorSelectionArray = ['secondary', 'success', 'primary', 'info', 'warning', 'danger', 'dark', 'light'];

  for (let i = 0; i < userInputValue; i++) {
    userInputDurationArray[i] = document.getElementById('processNumber' + [i+1]).value;
  }

  function getRangeSum(arr, from, to) {
    return arr.slice(from, to).reduce((p, c) => {
      return parseFloat(p) + parseFloat(c);
    }, 0);
  } 
  
  const sum = userInputDurationArray.reduce(function(a, b) { return parseFloat(a) + parseFloat(b); }, 0);

  document.getElementById('userOutputTableContainer').innerHTML +=
  '<table class="table table-hover">' +
    '<thead>' + 
      '<tr class="bg-success text-white">' +
        '<th scope="col">Process</th>' +
        '<th scope="col">Duration</th>' +
        '<th scope="col">Order</th>' +
        '<th scope="col">Arrival Time</th>' +
        '<th scope="col">Waiting Time</th>' +
      '</tr>' +
    '</thead>' +
    '<tbody id="userOutputData">' +
    '</tbody>' +
    '<thead>' +
      '<tr class="table-success">' +
        '<th colspan="4">Average Waiting Time</th>' +
        '<th id="averageWaitTimeValue"></th>'
      '</tr>' +
    '</thead>' + 
    '</table>';

    for (let i = 0; i < userInputValue; i++) {
      processWaitTimeArray[i] = getRangeSum(userInputDurationArray, 0, i);
      var sum2 = userInputDurationArray.reduce(function(a, b) { return parseFloat(a) + parseFloat(b); }, 0);

      document.getElementById('userOutputData').innerHTML +=
      '<tr>' +
      '<th scope="row">P' + [i+1] + '</th>' +
      '<td id="userOutputDuration' + [i+1] + '"></td>' +
      '<td>' + [i+1] + '</td>' +
      '<td>0</td>' +
      '<td>' + processWaitTimeArray[i] + '</td>' +
      '</tr>';

      document.getElementById('progressBarFooter').innerHTML +=
      '<div class="progress-bar bg-' + colorSelectionArray[i] + '" style="width:' + (userInputDurationArray[i]/sum2 * 100).toFixed(2) + '%">P' + [i+1] + '(' +  userInputDurationArray[i] + ')</div>';

      document.getElementById('userOutputDuration' + [i+1]).innerHTML = document.getElementById('processNumber' + [i+1]).value;
    }

    document.getElementById('averageWaitTimeValue').innerHTML = parseInt(average(processWaitTimeArray));
    document.getElementById('footerHeader').innerHTML = '<b>Gantt Chart</b>';

}

(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }


        else if (form.checkValidity() == true) {
          event.preventDefault();
          runProgram();
      }

        form.classList.add('was-validated')
      }, false)
    })
})()

function onUserProcessNumberInput() {
  let userInputValue = document.getElementById('userProcessNumber').value;
  document.getElementById('processorDurationContainer1').innerHTML = '';
  document.getElementById('processorDurationContainer2').innerHTML = '';
  document.getElementById('processDurationHeader').innerHTML = 'Process Durations'

  for (let i = 0; i < userInputValue; i++) {
    if (i < 5) {
      document.getElementById('processorDurationContainer1').innerHTML +=
      '<div class="row g-1 align-items-center">' + 
      '<div class="col-auto"><label class="form-label" for="processNumber' + [i+1] + '">P' + [i+1] + ': </label></div>' +
      '<div class="col-auto"><input type="text" class="form-control" id="processNumber' + [i+1] + '" required></div>' + 
      '<div class="valid-feedback">Valid input!</div>' + 
      '<div class="invalid-feedback">Enter a numerical value.</div></div>';
    }
    else if (i > 4) {
      document.getElementById('processorDurationContainer2').innerHTML +=
      '<div class="row g-1 align-items-center">' + 
      '<div class="col-auto"><label class="form-label" for="processNumber' + [i+1] + '">P' + [i+1] + ': </label></div>' +
      '<div class="col-auto"><input type="text" class="form-control" id="processNumber' + [i+1] + '" required></div>' + 
      '<div class="valid-feedback">Valid input!</div>' + 
      '<div class="invalid-feedback">Enter a numerical value.</div></div>';
    }
  }
}

function resetProgram() {
  $("#userInputContainer").load(" #userInputContainer > *");
}