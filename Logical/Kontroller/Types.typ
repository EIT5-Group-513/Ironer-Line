
TYPE
	PWM_type : 	STRUCT 
		cntr : UINT := 0;
		period : UINT := 200;
		duty : USINT := 0;
		out : BOOL := 0;
		minSwitch : UINT := 50; (*%how quickly we allow switching*)
	END_STRUCT;
END_TYPE
