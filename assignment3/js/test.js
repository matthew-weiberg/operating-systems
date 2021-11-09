// Generated JS from Java: PhilosopherState -----
function PhilosopherState(_name, _ordinal) {

    PhilosopherState_c._clInit();
 
    jv_Enum.call(this, _name, _ordinal);
 }
 
 var PhilosopherState_c = sc_newClass("PhilosopherState", PhilosopherState, jv_Enum, null);
 
 
 PhilosopherState_c._clInit = function() {
    if (PhilosopherState_c.hasOwnProperty("_clInited")) return;
    PhilosopherState_c._clInited = true;
    
       PhilosopherState_c.Get = new PhilosopherState("Get", 0);
       ;
       PhilosopherState_c.Eat = new PhilosopherState("Eat", 1);
       ;
       PhilosopherState_c.Pon = new PhilosopherState("Pon", 2);
       ;
       PhilosopherState_c._values = sc_initArray(jv_Object_c, 1,
               [ PhilosopherState_c.Get, PhilosopherState_c.Eat, PhilosopherState_c.Pon ]);
       ;
 };
 
 
 // Generated JS from Java: Main -----
 function Main() {
 
    Main_c._clInit();
    jv_Object.call(this);
 }
 
 var Main_c = sc_newClass("Main", Main, jv_Object, null);
 
 Main_c.main = function (args)  {
    Main_c._clInit();
    for (var i = 0; i < Main_c.philosopherCount; i++) Main_c.forks.add(new Fork());
    for (var i = 0; i < Main_c.philosopherCount; i++) Main_c.philosophers.add(new Philosopher());
    for (var _i = Main_c.philosophers.iterator(); _i.hasNext();) {
       var p = _i.next();
       new jv_Thread(p).start();
    }
    var endTime = jv_System_c.currentTimeMillis() + (Main_c.runSeconds * 1000);
    do {
       var sb = new jv_StringBuilder("|");
       for (var _i = Main_c.philosophers.iterator(); _i.hasNext();) {
          var p = _i.next();
          sb.append(p.state.toString());
          sb.append("|");
       } sb.append("     |");
       for (var _i = Main_c.forks.iterator(); _i.hasNext();) {
          var f = _i.next();
          var holder = f.holder.get();
          sb.append(holder === -1 ? "   " : String_c.format("P%02d", holder));
          sb.append("|");
       } jv_System_c.out.println(sb.toString());
       try {
          jv_Thread_c.sleep(1000);
       } catch(ex) {
          if ((ex instanceof jv_Exception)) {} else
             throw ex;
       } } while (jv_System_c.currentTimeMillis() < endTime);
    for (var _i = Main_c.philosophers.iterator(); _i.hasNext();) {
       var p = _i.next();
       p.end.set(true);
    }
    for (var _i = Main_c.philosophers.iterator(); _i.hasNext();) {
       var p = _i.next();
       jv_System_c.out.printf("P%02d: ate %,d times, %,d/sec\n", p.id, p.timesEaten,
               p.timesEaten / Main_c.runSeconds);
    }
 };
 
 Main_c._clInit = function() {
    if (Main_c.hasOwnProperty("_clInited")) return;
    Main_c._clInited = true;
    
       Main_c.philosopherCount = 5;
       ;
       Main_c.runSeconds = 15;
       ;
       Main_c.forks = new ArrayList();
       ;
       Main_c.philosophers = new ArrayList();
       ;
 };