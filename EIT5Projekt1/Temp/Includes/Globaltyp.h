/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1603198732_1_
#define _BUR_1603198732_1_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef struct inverter_type
{	unsigned short CTRL_set;
	unsigned short CTRL_actual;
	signed short RPM_set;
	signed short RPM_actual;
	signed short RPM_after_ramp;
	unsigned short error_code;
	signed short freq;
	unsigned short voltage;
	unsigned short current;
	unsigned short DC;
} inverter_type;

typedef struct mulde_type
{	signed short T_out;
	signed short T_in;
} mulde_type;

typedef struct p_pumpe_type
{	unsigned char after;
	unsigned char before;
} p_pumpe_type;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/Global.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1603198732_1_ */

