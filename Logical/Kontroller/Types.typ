
TYPE
	controller_type : 	STRUCT  (*Coefficients and registers for the kontroller*)
		b : ARRAY[0..2]OF REAL; (*numerators of the discrete time transfer function*)
		a : ARRAY[0..2]OF REAL; (*denuminator of the discrete time transfer function*)
		w : ARRAY[0..2]OF REAL := [0]; (*intermediate signal for direct form II calculations*)
		timescale : INT := 1000; (*used for scaling the sample time*)
		ref : REAL := 55; (*reference signal*)
		Pmax : REAL := 5200; (*maximum possible power*)
		u : REAL; (*controller output*)
		e : REAL; (*error signal*)
	END_STRUCT;
	PWM_type : 	STRUCT 
		cntr : UINT := 0;
		period : UINT := 200;
		duty : REAL := 0.0;
		out : BOOL := 0;
		minSwitch : UINT := 50; (*%how quickly we allow switching*)
	END_STRUCT;
END_TYPE
