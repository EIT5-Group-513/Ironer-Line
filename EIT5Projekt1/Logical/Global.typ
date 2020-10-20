
TYPE
	Inverter_type : 	STRUCT 
		CTRL_Word : UINT;
		Set_RPM : INT;
		Actual_CTRL_Word : UINT;
		RPM_After_Ramp : INT;
		Error_Code : UINT;
		DC : UINT;
		Voltage : UINT;
		Current : UINT;
		Actual_Out_fq : INT;
		Actual_RMP : INT;
	END_STRUCT;
END_TYPE
