function runProgram() {
    var memorySize = document.getElementById('memory_size').value;
    var pageSize = document.getElementById('page_size').value;
    var counter = 0, currentPage = 0;
    var wordRequest = [10,11,104,170,73,309,185,245,246,434,458,364];

    document.getElementById('header1').innerHTML = '<b>Word Found/Missing</b>';
    document.getElementById('header2').innerHTML = '<b>Word Page Number</b>';
    document.getElementById('header3').innerHTML = '<b>Page Load/Unload Sequence</b>';
    moreNumbers = document.getElementById('input_index').value;
    newNumbersArray = moreNumbers.split(',');
    newNumbersArray.forEach(function(newNumber){
        wordRequest.push(parseInt(newNumber, 10));
    });
    // wordRequest.push(document.getElementById('input_index').value);

    const cache = (function(item) {
        let array = [];
        while (item-- > 0)
        array.push(0);
        return array;
    })((memorySize / pageSize | 0));

    for (var i = 0; i < wordRequest.length; i++) {
        currentPage = pageNumber(wordRequest[i], pageSize);
        document.getElementById('pageNumber').innerHTML += ('Word ' + wordRequest[i] + ' is on page #' + currentPage + '<br>');
        var page = void 0;
        for (page = 0; page < cache.length; page++) {
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

    document.getElementById('outputInterupts').innerHTML += ('<b>Total Interupts:</b> ' + counter);
    document.getElementById('successRate').innerHTML += ('<b>Success Rate:</b> ' + ((wordRequest.length - counter)/wordRequest.length * 100).toFixed(2)) + '%';
};

function swapPage(cache, currentPage) {
    document.getElementById('loadSequence').innerHTML += ('Loading page #' + currentPage + '. Unloading page #' + cache[1] + '.<br>');
    for (let i = 0; i > cache.length - 1; i++) {
        cache[i] = cache[i + 1];
    }
    cache[cache.length - 1] = currentPage;
};

function pageNumber(word, pageSize) {
    var page = 0;
    if (word < pageSize) {
        page = 0;
    } else if (word > pageSize) {
        page = (Math.ceil(word / pageSize) | 0);
    }
    return page;
};

function resetProgram() {
    $('.outputDetails').empty();
}