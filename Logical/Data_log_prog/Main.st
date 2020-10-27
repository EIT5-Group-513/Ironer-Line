
PROGRAM _INIT
	inverter;
	T_tank;
	T_ambient;
	heater;
	mulde_1;
	mulde_2;
	mulde_3;
	
	IF DiagCpuIsSimulated() THEN
		DataRecorder.DeviceName := ADR('PC_temp');
	ELSE
		DataRecorder.DeviceName := ADR('PLC_user');
	END_IF
	
	DataRecorder.MpLink := ADR(gDataRecorder);
	DataRecorder.RecordMode := mpDATA_RECORD_MODE_TIME;
	DataRecorder.SamplingTime := T#1s;
	
	DataRegPar.MpLink := ADR(gDataRecorder);
	DataRegPar.PVName := ADR('T_ambient'); //LOCAL variable:  Data_log_p:T_ambient
	
END_PROGRAM

PROGRAM _CYCLIC
	
	CASE state OF
		
		0:
			DataRecorder.Enable := TRUE;
			
			IF DataRecorder.Active AND NOT DataRecorder.CommandBusy THEN
				IF DataRecorder.StatusID = 0 THEN
					state := 10;
				ELSE
					state := 200;
				END_IF
			END_IF
			
		10:
			DataRegPar.Enable := TRUE;
			
			IF DataRegPar.Active THEN
				IF DataRegPar.StatusID = 0 THEN
					DataRegPar.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
		// add more regpar in between..
		20: 
		
			DataRecorder.Record := TRUE;
			
			IF DataRecorder.Recording THEN
				state := 30;
			END_IF
		
		30:
				
		200:
		
	END_CASE
	
	DataRecorder();
	DataRegPar();
	
END_PROGRAM

PROGRAM _EXIT
	
	DataRecorder(Enable := FALSE);
	DataRegPar(Enable := FALSE);
	 
END_PROGRAM

