
TYPE
	inverter_type : 	STRUCT 
		CTRL_set : UINT;
		CTRL_actual : UINT;
		RPM_set : INT;
		RPM_actual : INT;
		RPM_after_ramp : INT;
		error_code : UINT;
		freq : INT;
		voltage : UINT;
		current : UINT;
		DC : UINT;
	END_STRUCT;
	mulde_type : 	STRUCT 
		T_out : INT;
		T_in : INT;
	END_STRUCT;
	p_pumpe_type : 	STRUCT 
		after : USINT;
		before : USINT;
	END_STRUCT;
END_TYPE