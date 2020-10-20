/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1603179416_1_
#define _BUR_1603179416_1_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef struct Inverter_type
{	unsigned short CTRL_Word;
	signed short Set_RPM;
	unsigned short Actual_CTRL_Word;
	signed short RPM_After_Ramp;
	unsigned short Error_Code;
	unsigned short DC;
	unsigned short Voltage;
	unsigned short Current;
	signed short Actual_Out_fq;
	signed short Actual_RMP;
} Inverter_type;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/Global.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1603179416_1_ */

