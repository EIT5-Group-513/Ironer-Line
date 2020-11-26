
#include <bur/plctypes.h>

#ifdef _DEFAULT_INCLUDES
#include <AsDefault.h>
#endif


void contAlg(REAL e) {
	
	// implementation of the difference equations
	D.w[0] = D.a[0]*e - D.a[1]*D.w[1] - D.a[2]*D.w[2];
	D.u = D.b[0]*D.w[0] + D.b[1]*D.w[1] + D.b[2]*D.w[2];
	D.u += D.offset;
	
	// update of registers (delayed signals)
	D.w[2] = D.w[1];
	D.w[1] = D.w[0];

}

void PWM_fun(void) {
	
	en = 0;
	PWM.cntr++;
	
	if (PWM.cntr >= PWM.timescale + 1) { // +1 to not skip the last cycle
		en = 1; // do controller
		T = mulde_1.olie.T_in; // read measured temperature
		PWM.cntr = 0; 
	}
	 
	PWM.out = (PWM.cntr < PWM.duty); // set PWM out to true if cntr is smaller than dutycycle
	heater = PWM.out;
}

void onOff_fun(void) {
	
	if (en==1) { // selects which controller to use
		if((T < (ref-onOff.dT[1])) || (T > (ref + onOff.dT[1]))) { 
			en += 1; // use on-off controller
			en_last = en;
		}
		else if((T < (ref + onOff.dT[0])) && (T > (ref-onOff.dT[0]))) {
			en += 2; // use small-signal controller
			en_last = en;
		}
		else {
			en = en_last;
		}
		
	}
	
}

void D_fun(void) {

	if(en==2) { // do on-off controller
		D.e = 0; 
		contAlg(D.e); // call controller to let it settle
		
		if(T < ref) {
			PWM.duty = PWM.timescale; // duty = timescale gives maximum output power 
		}
		else {
			PWM.duty = 0;
		}
	}
	else if(en==3) { // do small-signal controller
		D.e = ref-T;
		contAlg((REAL)D.e); // calculate the control signal u[n]
		
		PWM.duty = ((INT)D.u*PWM.timescale)/PWM.Pmax; // times with timescale first to avoid floor division problmes :( 	
	}	

}


void _INIT ProgramInit(void) {
	
	D;
	PWM;
	onOff;
	en;
	en_last;
	ref;
	T;
	
	// controller koefficients
	// denum
	D.a[0] = 1.00000;
	D.a[1] = -1.8568;
	D.a[2] = 0.8576;
	// num, divide by 10 because measured temp is in d°C
	D.b[0] = 140.74086 / 10;
	D.b[1] = 3.40703 / 10;
	D.b[2] = -137.33383 / 10;
	
	// hysterese interval
	onOff.dT[0] = 20;
	onOff.dT[1] = 40;
	
}

void _CYCLIC ProgramCyclic(void) {
	
	if(failState == 0) {
		PWM_fun();
		onOff_fun();
		D_fun();
	}
}

void _EXIT ProgramExit(void) {

	
	
}



