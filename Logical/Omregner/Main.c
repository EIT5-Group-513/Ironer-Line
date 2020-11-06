
#include <bur/plctypes.h>

#ifdef _DEFAULT_INCLUDES
	#include <AsDefault.h>
#endif

void _INIT ProgramInit(void)
{

}

void _CYCLIC ProgramCyclic(void)
{

	p_before_pump_bar = (p_pumpe.before/32767.0)*10;
	p_after_pump_bar = (p_pumpe.after/32767.0)*10;
	p_last_bar = (p_last/32767.0)*10;
	flow_cooling_water_mls = (flow_cooling_water/32767.0)*500;
	
}

void _EXIT ProgramExit(void)
{

}

