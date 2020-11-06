
#include <bur/plctypes.h>

#ifdef _DEFAULT_INCLUDES
	#include <AsDefault.h>
#endif

void update_PWM(){
	int actDuty; 
	
	actDuty = PWM.period; 
	
	//Maps to ensure switching time; 
	if(PWM.duty < PWM.period - PWM.minSwitch/2){
		actDuty = PWM.period - PWM.minSwitch;	
	}
	
	if (PWM.duty < PWM.period-PWM.minSwitch){
		actDuty = PWM.duty;
	}
	
	if (PWM.duty < PWM.minSwitch){ 
		actDuty = PWM.minSwitch;
	}
	
	if (PWM.duty < PWM.minSwitch/2){
		actDuty = 0; 
	}
	
	PWM.cntr ++; 
	if (PWM.cntr == PWM.duty){
		PWM.out = 0;
	}
	if (PWM.cntr == PWM.period){
		PWM.out = 1;
	}
}

void _INIT ProgramInit(void)
{
	PWM;
}

void _CYCLIC ProgramCyclic(void)
{

}

void _EXIT ProgramExit(void)
{

}



