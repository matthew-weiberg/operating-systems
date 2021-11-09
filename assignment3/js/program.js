/* This class are provide by kalkicode.com */
class Settlement
{
	static removeArrayObject(arr, value)
	{
		var index = arr.indexOf(value);
		// Check whether index exists or not
		if (index >= 0)
		{
			// Remove element
			arr.splice(index, 1);
			return true;
		}
		// When not exists given object
		return false;
	}
}
/**
	* Chandy/Misra solution implementation.
	* 
	* 1. For every pair of philosophers give chopstick to the one with the lower ID.
	* 
	* 2. Each chopstick can either be dirty or clean. Initially, all chopsticks are
	* dirty.
	* 
	* 3. When a philosopher wants to eat, he must obtain the chopsticks he does not
	* have from his contending neighbors. For all such chopsticks he does not have, he 
	* sends a request message and waits. See Philosopher.obtainChopsticksIfNecessary() 
	* and Philosopher.waitForChopstick()
	* 
	* 4. Only dirty chopstick can be given up. When the chopstick sent over, it
	* gets cleaned. See Philosopher.giveUpChopstickIfNecessary()
	* 
	* 5. After a philosopher is done eating, all his chopsticks become dirty. See
	* Philosopher.eat() 
	* 
	* 6. Philosopher can eat only when both chopsticks present. Chopsticks can not
	* be sent away when philosopher is eating. Chopsticks change state ONLY inside the 
	* owner's thread so philosopher does not need to lock them when he's eating. 
	* 
	* 7. What he needs however is to check his neighbors periodically in order to 
	* send them chopsticks when they're ready to eat. See processChopsticks() and
	* giveUpChopstickIfNecessary()
	* 
	* The clean/dirty labels give preference to the most "starved" processes. It
	* solves the starvation problem.
	* 
	* Initializing the system so that philosophers with lower IDs have dirty
	* chopsticks AND continuous tracking neighbor's state gives a guarantee that 
	* deadlock cannot occur and system has overall progress.
	* 
	*/
class Program
{
	static
	main(args)
	{
		var philosophersCount = 6;
		var eatCount = 5;
		var philosophers = Array(philosophersCount).fill(null);
		var chopsticks = Array(philosophersCount).fill(null);
		for (var i = 0; i < philosophersCount; i++)
		{
			chopsticks[i] = new Chopstick(i + 1);
		}
		for (var i = 0; i < philosophersCount; i++)
		{
			philosophers[i] = new Philosopher(i + 1, chopsticks[i], chopsticks[(i + 1) % philosophersCount], eatCount);
		}
		//  set neighbors and assign owners: give the chopsticks to the philosopher with the lower ID
		philosophers[0].leftNeighbor = philosophers[philosophersCount - 1];
		philosophers[0].rightNeighbor = philosophers[1];
		chopsticks[0].owner = philosophers[0];
		for (var i = 1; i < philosophersCount; i++)
		{
			philosophers[i].leftNeighbor = philosophers[(i - 1) % philosophersCount];
			philosophers[i].rightNeighbor = philosophers[(i + 1) % philosophersCount];
			chopsticks[i].owner = philosophers[i - 1];
		}
		console.log("Dinner is starting!\n");
		for (var i = 0; i < philosophersCount; i++)
		{
			philosophers[i].start();
		}
		// wait all threads to complete
		for (var i = 0; i < philosophersCount; i++)
		{
			philosophers[i].join();
		}
		console.log("Dinner is over!");
	}
}

	id = 0;
	leftChopstick = null;
	rightChopstick = null;
	eatCount = 0;
	leftNeighbor = null;
	rightNeighbor = null;
	thread = null;
	eatNum = 0;
	// total # times Philosopher has eaten
	eatInRaw = 0;
	// how many times Philosopher has eaten in a row
	goingToEatRequest = false;
	// signal "I want to eat"
	constructor(id, leftChopstick, rightChopstick, eatCount)
	{
		this.id = id;
		this.leftChopstick = leftChopstick;
		this.rightChopstick = rightChopstick;
		this.eatCount = eatCount;
		this.thread = java.lang.Thread(this);
	}
	/**
		* Main loop
		*/
	run()
	{
		while (this.eatNum < this.eatCount)
		{
			this.think();
			this.processChopsticks(true);
			this.obtainChopsticksIfNecessary();
			this.eat();
			this.processChopsticks(this.eatNum != this.eatCount);
		}
	}
	obtainChopsticksIfNecessary()
	{
		// indicate that we need chopsticks so the neighbors send them
		this.goingToEatRequest = true;
		this.waitForChopstick(this.leftChopstick);
		this.waitForChopstick(this.rightChopstick);
		this.goingToEatRequest = false;
	}
	/**
		* Monitor "Guarded Wait" implementation
		*/
	waitForChopstick(chopstick)
	{
		if (chopstick.owner != this {
			synchronized(chopstick)
			//                System.out.format("Philosopher %d WAITING for chopstick %d.\n",
			//                        id, chopstick.id);
			try
			while (chopstick.owner != this
			{
				// while waiting, Philosopher must be able to release 
				// dirty chopstick he owns to avoid deadlock
				this.processChopsticks(true);
				chopstick.wait();
			}
			catch (var e = null)
			console.log("InterruptedException caught");
		}
		java.lang.System.out.format("Philosopher %d picks up %s chopstick.\n", this.id, chopstick == this.leftChopstick ? "left" : "right");
	}
	/**
		* Philosopher is checking his neighbor's state periodically and releases 
		* chopsticks synchronously, in his thread. If isRequestRequired set to 
		* true philosopher can send chopstick he owns only if the neighbor requested
		* it. If isRequestRequired is false he can release chopstick regardless 
		* of neighbor's request (useful when he stops checking neighbor's state).
		*/
	processChopsticks(isRequestRequired)
	{
		this.giveUpChopstickIfNecessary(this.leftChopstick, this.leftNeighbor, isRequestRequired);
		this.giveUpChopstickIfNecessary(this.rightChopstick, this.rightNeighbor, isRequestRequired);
	}
	/**
		* Philosopher gives up only dirty chopstick he owns, 
		* on request OR unconditionally (e.g. if he's finished dinner
		* and not going to track his neighbor's requests anymore)
		*/
	giveUpChopstickIfNecessary(chopstick, receiver, isRequestRequired)
	{
		synchronized(chopstick)
		if ((receiver.goingToEatRequest || !isRequestRequired) && !chopstick.isClean && chopstick.owner == this.
		{
			// only chopstick he owns
			chopstick.isClean = true;
			// wash chopstick before sending out
			chopstick.owner = receiver;
			this.eatInRaw = 0;
			// reset # eats-in-raw because chopstick sent out
			//                System.out.format("Chopstick %d sent to Philosopher %d by Philosopher %d\n", chopstick.id,
			//                        chopstick.owner.id, id);
			chopstick.notify();
		}
	}
	eat()
	{
		this.eatInRaw++;
		this.eatNum++;
		this.rightChopstick.isClean = this.leftChopstick.isClean = false;
		var eatersList = eaters.addEater(this.;
		java.lang.System.out.format("Philosopher %d starts eating. Eats in raw: %d. Eating at present: %s.\n", this.id, this.eatInRaw, eatersList);
		//        System.out.format("Philosopher %d eats.\n", id);
		StaticMethods.sleep(StaticMethods.random(100, 200));
		eaters.removeEater(this.;
		//        System.out.format("Philosopher %d finished eating (%d times).\n", id, eatNum);
		java.lang.System.out.format("Philosopher %d puts down right chopstick.\n", this.id);
		java.lang.System.out.format("Philosopher %d puts down left chopstick.\n", this.id);
	}
	think()
	{
		//        System.out.format("Philosopher %d thinks.\n", id);
		StaticMethods.sleep(StaticMethods.random(100, 200));
	}
	start()
	{
		this.thread.start();
	}
	join()
	{
		try
		this.thread.join();
		catch (var e = null)
		console.log("InterruptedException caught");
	}
}
class Chopstick
{
	id = 0;
	owner = null;
	isClean = false;
	constructor(id)
	{
		this.id = id;
	}
}
/**
	* Auxiliary static methods.
	* 
	*/
class StaticMethods
{
	/**
		* Generates random integer [Min, Max]
		*/
	static
	random(Min, Max)
	{
		return Min + parseInt((Math.random() * ((Max - Min) + 1)));
	}
	/**
		* Sleeps delay ms 
		*/
	static
	sleep(delay)
	{
		try
		Thread.sleep(delay);
		try (e = null)
		console.log("InterruptedException caught");
	}
}
/**
	* Auxiliary class. Tracks persons eating at present  
	* 
	*/
class eaters
{
	static eaters = new Array();
	static
	addEater(philosopher)
	{
		(eaters.eaters.push(philosopher) > 0);
		return eaters.#eatersToString();
	}
	static
	removeEater(philosopher)
	{
		Settlement.removeArrayObject(eaters.eaters, philosopher);
		return eaters.#eatersToString();
	}
	static
	eatersToString()
	{
		var s = "";
		for (const philosopher of eaters.eaters)
		{
			s += philosopher.id + " ";
		}
		return s.trim();
	}
}
Program.main([]);