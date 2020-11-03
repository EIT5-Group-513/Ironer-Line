
#include <bur/plctypes.h>

#ifdef _DEFAULT_INCLUDES
	#include <AsDefault.h>
#endif

void _INIT ProgramInit(void)
{
	heater;
	inverter;
	mulde_1;
	mulde_2;
	mulde_3;
	p_last;
	p_pumpe;
	T_ambient;
	T_tank;
	
	failState;
	ocp;
	hna;
	tl;
}

void _CYCLIC ProgramCyclic(void) 
{
	
	// To safely run code, only execute code if failState is 0!!! //
	
	failState | checkOverCurrent();
	failState | checkHeater();
	failState | checkTemperature();
	// add more check here //

	if (failstate != 0) {
		// something is wrong i can feel it
		// better shut down
		saveShutdown();
	}
	else {
		// everything is OK
	}
	
}


int checkOverCurrent(void) {
	
	// over current protection
	ocp.sum -= ocp.crb[ocp.rp]; //remove oldes current from sum
	ocp.sum += inverter.current; // add new current to sum
	ocp.crb[ocp.rp] = inverter.current; // add new current to ring buffer
	
	ocp.rp++; // increment ring buffer pointer
	if (ocp.rp >= ocp.N) {
		ocp.rp = 0; // overflow ring buffer pointer
	}
	
	ocp.avg = ocp.sum/(ocp.N); // calculate avg og ring buffer
	if (ocp.avg > ocp.max) {
		return 0x0001; // the average current was too high inside of sample window
	}
	else {
		return 0x0000; // no fail (overcurrent)
	}
}

int checkHeater(void) {
	
	// checks if heater is on for extended periods of time without flow in the system
	
	if (heater == 1 && inverter.RPM_actual < hna.minRPM){
		hna.cntr++;
	}
	else {
		hna.cntr = 0;
	}
	
	if (hna.cntr > hna.timeout) {
		return 0x0002;
	}
	else {
		return 0x0000;
	}
}

int checkTemperature(void) {
	
	// checks if any temperature is higher then allowed
	
	if(T_tank > tl.max) {
		return 0x0004;
	}
	else {
		return 0x0000;
	}
}

void saveShutdown(void) {
	
	inverter.RPM_set = 0;
	heater = 0;
	
} 



void _EXIT ProgramExit(void)
{
	
	
	
	
}

