
#include <bur/plctypes.h>

#ifdef _DEFAULT_INCLUDES
#include <AsDefault.h>
#endif

REAL contAlg(REAL e) {
	
	// implementation of the difference equations
	D.w[0] = D.a[0]*e - D.a[1]*D.w[1] - D.a[2]*D.w[2];
	D.u = D.b[0]*D.w[0] + D.b[1]*D.w[1] + D.b[2]*D.w[2];
	
	// update of registers (delayed signals)
	D.w[2] = D.w[1];
	D.w[1] = D.w[0];
	
	return D.u;
}

void _INIT ProgramInit(void) {
	
	PWM;
	D;
	
	D.a[0] = 1.000;
	D.a[1] = -1.8568;
	D.a[2] = 0.8576;
	
	D.b[0] = 140.7409;
	D.b[1] = 3.4070;
	D.b[2] = -137.3338;
	
}

void _CYCLIC ProgramCyclic(void) {

	if(PWM.cntr >= D.timescale) {
		D.e = D.ref*10 - mulde_1.olie.T_in;
		D.e /= 10;
		PWM.duty = contAlg(D.e);
		PWM.duty *= 1000/D.Pmax;
		PWM.cntr = 0;
	}
	
	PWM.out = (PWM.cntr < PWM.duty);
	PWM.cntr++;

	
}

void _EXIT ProgramExit(void) {

	
	
}



