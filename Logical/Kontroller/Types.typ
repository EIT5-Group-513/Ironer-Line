
TYPE
	aaFilter_type : 	STRUCT  (*Anti aliasing filter*)
		timescale : UINT := 6;
		cntr : UINT := 0;
		a : ARRAY[0..2]OF LREAL; (*numerators*)
		b : ARRAY[0..2]OF LREAL; (*denumenators*)
		w : ARRAY[0..2]OF LREAL := [0];
	END_STRUCT;
	onOff_type : 	STRUCT 
		dT : ARRAY[0..1]OF UINT; (*hysterese interval*)
	END_STRUCT;
	controller_type : 	STRUCT  (*Coefficients and registers for the kontroller*)
		e : LREAL; (*error signal*)
		b : ARRAY[0..2]OF LREAL; (*numerators of the discrete time transfer function*)
		a : ARRAY[0..2]OF LREAL; (*denuminator of the discrete time transfer function*)
		w : ARRAY[0..2]OF LREAL := [0]; (*intermediate signal for direct form II calculations*)
		offset : UINT := 918; (*Operating point offset*)
		u : LREAL; (*controller output*)
	END_STRUCT;
	PWM_type : 	STRUCT 
		cntr : UINT := 0;
		timescale : UINT := 1000; (*used for scaling the sample time*)
		Pmax : REAL := 5200; (*maximum possible power*)
		duty : INT := 0; (*duty cycle*)
		out : BOOL := 0; (*PWM output to heater*)
	END_STRUCT;
END_TYPE
