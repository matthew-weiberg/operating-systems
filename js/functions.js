function runProgram() {
    var memorySize = document.getElementById('memory_size').value;
    var pageSize = document.getElementById('page_size').value;
    var counter = 0, currentPage = 0;
    var wordRequest = [];

    if (pageSize > memorySize) {
        window.alert("ERROR: Memory size must be a greater value than page size for this program to function correctly.");
    } else {
        document.getElementById('header1').innerHTML = '<b>Word Found/Missing</b>';
        document.getElementById('header2').innerHTML = '<b>Word Page Number</b>';
        document.getElementById('header3').innerHTML = '<b>Page Load/Unload Sequence</b>';
        moreNumbers = document.getElementById('input_index');
        if (moreNumbers && moreNumbers.value) {
            newNumbersArray = moreNumbers.value.split(',');
            newNumbersArray.forEach(function(newNumber){
                wordRequest.push(parseInt(newNumber, 10));
            });
        }
        // wordRequest.push(document.getElementById('input_index').value);

        var cache = [];
        for (let i = (memorySize / pageSize | 0); i > 0; i--) {
            cache.push(0);
        }
        

        for (var i = 0; i < wordRequest.length; i++) {
            currentPage = pageNumber(wordRequest[i], pageSize);
            document.getElementById('pageNumber').innerHTML += ('Word ' + wordRequest[i] + ' is on page #' + currentPage + '<br>');
            for (var page = 0; page < cache.length; page++) {
                if (cache[page] === currentPage) {
                    document.getElementById('wordFound').innerHTML += ('Word ' + wordRequest[i] + ' Found' + '<br>');
                    break;
                }
            }

            if (page === cache.length) {
                document.getElementById('wordFound').innerHTML += (wordRequest[i] + ' Missing' + '<br>');
                swapPage(cache, currentPage);
                counter++;
            }
        }

        document.getElementById('outputInterupts').innerHTML = ('<b>Total Interupts:</b> ' + counter);
        document.getElementById('successRate').innerHTML = ('<b>Success Rate:</b> ' + ((wordRequest.length - counter)/wordRequest.length * 100).toFixed(2)) + '%';
    }
}

function swapPage(cache, currentPage) {
    document.getElementById('loadSequence').innerHTML += ('Loading page #' + currentPage + '. Unloading page #' + cache[1] + '.<br>');
    for (let i = 0; i > cache.length - 1; i++) {
        cache[i] = cache[i + 1];
    }
    cache[cache.length - 1] = currentPage;
}

function pageNumber(word, pageSize) {
    if (word > pageSize) {
        return (Math.ceil(word / pageSize) | 0);
    }
    return 0;
}

function resetProgram() {
    $('.outputDetails').empty();
    document.getElementById('memory_size').value = '';
    document.getElementById('page_size').value = '';
    document.getElementById('input_index').innerHTML = '';
}

function initialValues() {
    document.getElementById('memory_size').value = '200';
    document.getElementById('page_size').value = '100';
    document.getElementById('input_index').innerHTML = '10,11,104,170,73,309,185,245,246,434,458,364';
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