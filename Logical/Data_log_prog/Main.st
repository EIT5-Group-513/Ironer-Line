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
	
	DRP_T_ambient.MpLink := ADR(gDataRecorder);
	DRP_T_ambient.PVName := ADR('T_ambient'); //LOCAL variable:  Data_log_p:T_ambient
	
	DRP_heater.MpLink := ADR(gDataRecorder);
	DRP_heater.PVName := ADR('heater'); 
	
	DRP_T_tank.MpLink := ADR(gDataRecorder);
	DRP_T_tank.PVName := ADR('T_tank');
	
	DRP_RPM.MpLink := ADR(gDataRecorder);
	DRP_RPM.PVName := ADR('inverter.RPM_actual');
	
	DRP_m1_Ti.MpLink := ADR(gDataRecorder);
	DRP_m1_Ti.PVName := ADR('mulde_1.T_in');
	
	DRP_m1_To.MpLink := ADR(gDataRecorder);
	DRP_m1_To.PVName := ADR('mulde_1.T_out');
	
	DRP_m2_Ti.MpLink := ADR(gDataRecorder);
	DRP_m2_Ti.PVName := ADR('mulde_2.T_in');
	
	DRP_m2_To.MpLink := ADR(gDataRecorder);
	DRP_m2_To.PVName := ADR('mulde_2.T_out');
	
	DRP_m3_Ti.MpLink := ADR(gDataRecorder);
	DRP_m3_Ti.PVName := ADR('mulde_3.T_in');
	
	DRP_m3_To.MpLink := ADR(gDataRecorder);
	DRP_m3_To.PVName := ADR('mulde_3.T_out');
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
			DRP_T_ambient.Enable := TRUE;
			
			IF DRP_T_ambient.Active THEN
				IF DRP_T_ambient.StatusID = 0 THEN
					DRP_T_ambient.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
				
			DRP_heater.Enable := TRUE;
			
			IF DRP_heater.Active THEN
				IF DRP_heater.StatusID = 0 THEN
					DRP_heater.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_RPM.Enable := TRUE;
			
			IF DRP_RPM.Active THEN
				IF DRP_RPM.StatusID = 0 THEN
					DRP_RPM.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_T_tank.Enable := TRUE;
			
			IF DRP_T_tank.Active THEN
				IF DRP_T_tank.StatusID = 0 THEN
					DRP_T_tank.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m1_Ti.Enable := TRUE;
			
			IF DRP_m1_Ti.Active THEN
				IF DRP_m1_Ti.StatusID = 0 THEN
					DRP_m1_Ti.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m1_To.Enable := TRUE;
			
			IF DRP_m1_To.Active THEN
				IF DRP_m1_To.StatusID = 0 THEN
					DRP_m1_To.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m2_Ti.Enable := TRUE;
			
			IF DRP_m2_Ti.Active THEN
				IF DRP_m2_Ti.StatusID = 0 THEN
					DRP_m2_Ti.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m2_To.Enable := TRUE;
			
			IF DRP_m2_To.Active THEN
				IF DRP_m2_To.StatusID = 0 THEN
					DRP_m2_To.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m3_Ti.Enable := TRUE;
			
			IF DRP_m3_Ti.Active THEN
				IF DRP_m3_Ti.StatusID = 0 THEN
					DRP_m3_Ti.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m3_To.Enable := TRUE;
			
			IF DRP_m3_To.Active THEN
				IF DRP_m3_To.StatusID = 0 THEN
					DRP_m3_To.Enable := TRUE;
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
	DRP_T_ambient();
	DRP_heater();
	DRP_RPM();
	DRP_T_tank();
	DRP_m1_Ti();
	DRP_m1_To();
	DRP_m2_Ti();
	DRP_m2_To();
	DRP_m3_Ti();
	DRP_m3_To();
	
END_PROGRAM

PROGRAM _EXIT
	
	DataRecorder(Enable := FALSE);
	DRP_T_ambient(Enable := FALSE);
	DRP_heater(Enable := FALSE);
	DRP_RPM(Enable := FALSE);
	DRP_T_tank(Enable := FALSE);
	DRP_m1_Ti(Enable := FALSE);
	DRP_m1_To(Enable := FALSE);
	DRP_m2_Ti(Enable := FALSE);
	DRP_m2_To(Enable := FALSE);
	DRP_m3_Ti(Enable := FALSE);
	DRP_m3_To(Enable := FALSE);
	
END_PROGRAM

