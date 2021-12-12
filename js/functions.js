getBufferValue();

var sema = new Semaphore(bufferValue);
var counter = 0;
var waiting = [];
var totalSeconds = 0;

function getBufferValue() {
  bufferValue = document.getElementById('userBufferValue').value;
  sema = new Semaphore(bufferValue);
  console.log(bufferValue);
}

function resetProgram() {
  document.getElementById('quedTasks').innerHTML = "";
  document.getElementById('runningTasks').innerHTML = "";
}

async function test(id) {
  ++totalSeconds;
  document.getElementById('quedTasks').innerHTML += "<li>Queing Task: " + id + " | Process Time: " + totalSeconds + "</li>";
  // console.log('queueing task', id);
  try {
    await sema.acquire();
    ++totalSeconds;
    document.getElementById('runningTasks').innerHTML += "<li>Running Task: " + id + " | Process Time: " + totalSeconds + "</li>";
    // console.log('running task', id);
    setTimeout(() => {
    sema.release();
    }, 2000);
  } catch (e) {
    console.error(id, e);
  }
}

function Semaphore(max) {
  var counter = 0;
  var waiting = [];
  
  var take = function() {
    if (waiting.length > 0 && counter < max){
      counter++;
      let promise = waiting.shift();
      promise.resolve();
    }
  }
  
  this.acquire = function() {
    if(counter < max) {
      counter++
      return new Promise(resolve => {
      resolve();
    });
    } else {
      return new Promise((resolve, err) => {
        waiting.push({resolve: resolve, err: err});
      });
    }
  }
  
  this.release = function() {
   counter--;
   take();
  }
  
  this.purge = function() {
    let unresolved = waiting.length;
  
    for (let i = 0; i < unresolved; i++) {
      waiting[i].err('Task has been purged.');
    }
  
    counter = 0;
    waiting = [];
    
    return unresolved;
  }
}

function startTest() {
  test(1);
  test(2);
  test(3);
  test(4);
  test(5);

  setTimeout(() => {
    test(6);
    test(7);
    test(8);
  }, 1500);

  setTimeout(() => {
    test(9);
    test(10);
    test(11);
  }, 2700);
}