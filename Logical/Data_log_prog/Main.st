PROGRAM _INIT
	inverter;
	T_tank;
	T_ambient;
	heater;
	mulde_1;
	mulde_2;
	mulde_3;
	flow_cooling_water;
	p_pumpe;
	p_last;
	
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
	
	DRP_inverter_RPM.MpLink := ADR(gDataRecorder);
	DRP_inverter_RPM.PVName := ADR('inverter.RPM_actual');
	
	DRP_m1_olie_Ti.MpLink := ADR(gDataRecorder);
	DRP_m1_olie_Ti.PVName := ADR('mulde_1.olie.T_in');
	
	DRP_m1_olie_To.MpLink := ADR(gDataRecorder);
	DRP_m1_olie_To.PVName := ADR('mulde_1.olie.T_out');
	
	DRP_m2_olie_Ti.MpLink := ADR(gDataRecorder);
	DRP_m2_olie_Ti.PVName := ADR('mulde_2.olie.T_in');
	
	DRP_m2_olie_To.MpLink := ADR(gDataRecorder);
	DRP_m2_olie_To.PVName := ADR('mulde_2.olie.T_out');
	
	DRP_m3_olie_Ti.MpLink := ADR(gDataRecorder);
	DRP_m3_olie_Ti.PVName := ADR('mulde_3.olie.T_in');
	
	DRP_m3_olie_To.MpLink := ADR(gDataRecorder);
	DRP_m3_olie_To.PVName := ADR('mulde_3.olie.T_out');
	
	DRP_p_pumpe_before.MpLink := ADR(gDataRecorder);
	DRP_p_pumpe_before.PVName := ADR('p_pumpe.before');
	
	DRP_p_pumpe_after.MpLink := ADR(gDataRecorder);
	DRP_p_pumpe_after.PVName := ADR('p_pumpe.after');
	
	DRP_p_last.MpLink := ADR(gDataRecorder);
	DRP_p_last.PVName := ADR('p_last');
	
	DRP_inverter_DC.MpLink := ADR(gDataRecorder);
	DRP_inverter_DC.PVName := ADR('inverter.DC');
	
	DRP_inverter_voltage.MpLink := ADR(gDataRecorder);
	DRP_inverter_voltage.PVName := ADR('inverter.voltage');
	
	DRP_inverter_current.MpLink := ADR(gDataRecorder);
	DRP_inverter_current.PVName := ADR('inverter.current');
	
	DRP_m1_toej_Ti.MpLink := ADR(gDataRecorder);
	DRP_m1_toej_Ti.PVName := ADR('mulde_1.toej.T_in');
	
	DRP_m1_toej_To.MpLink := ADR(gDataRecorder);
	DRP_m1_toej_To.PVName := ADR('mulde_1.toej.T_out');
	
	DRP_m2_toej_Ti.MpLink := ADR(gDataRecorder);
	DRP_m2_toej_Ti.PVName := ADR('mulde_2.toej.T_in');
	
	DRP_m2_toej_To.MpLink := ADR(gDataRecorder);
	DRP_m2_toej_To.PVName := ADR('mulde_2.toej.T_out');
	
	DRP_m3_toej_Ti.MpLink := ADR(gDataRecorder);
	DRP_m3_toej_Ti.PVName := ADR('mulde_3.toej.T_in');
	
	DRP_m3_toej_To.MpLink := ADR(gDataRecorder);
	DRP_m3_toej_To.PVName := ADR('mulde_3.toej.T_out');
	
	DRP_failState.MpLink := ADR(gDataRecorder);
	DRP_failState.PVName := ADR('failState'); 
	
	DRP_flow_cooling_water.MpLink := ADR(gDataRecorder);
	DRP_flow_cooling_water.PVName := ADR('flow_cooling_water');
	
	DRP_ctrl_ref.MpLink := ADR(gDataRecorder);
	DRP_ctrl_ref.PVName := ADR('Kontroller:ref');
	
	DRP_ctrl_D_u.MpLink := ADR(gDataRecorder);
	DRP_ctrl_D_u.PVName := ADR('Kontroller:D.u');
	
	DRP_PWM_duty.MpLink := ADR(gDataRecorder);
	DRP_PWM_duty.PVName := ADR('Kontroller:PWM.duty');
		
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
			
			DRP_inverter_RPM.Enable := TRUE;
			
			IF DRP_inverter_RPM.Active THEN
				IF DRP_inverter_RPM.StatusID = 0 THEN
					DRP_inverter_RPM.Enable := TRUE;
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
			
			DRP_m1_olie_Ti.Enable := TRUE;
			
			IF DRP_m1_olie_Ti.Active THEN
				IF DRP_m1_olie_Ti.StatusID = 0 THEN
					DRP_m1_olie_Ti.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m1_olie_To.Enable := TRUE;
			
			IF DRP_m1_olie_To.Active THEN
				IF DRP_m1_olie_To.StatusID = 0 THEN
					DRP_m1_olie_To.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m2_olie_Ti.Enable := TRUE;
			
			IF DRP_m2_olie_Ti.Active THEN
				IF DRP_m2_olie_Ti.StatusID = 0 THEN
					DRP_m2_olie_Ti.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m2_olie_To.Enable := TRUE;
			
			IF DRP_m2_olie_To.Active THEN
				IF DRP_m2_olie_To.StatusID = 0 THEN
					DRP_m2_olie_To.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m3_olie_Ti.Enable := TRUE;
			
			IF DRP_m3_olie_Ti.Active THEN
				IF DRP_m3_olie_Ti.StatusID = 0 THEN
					DRP_m3_olie_Ti.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m3_olie_To.Enable := TRUE;
			
			IF DRP_m3_olie_To.Active THEN
				IF DRP_m3_olie_To.StatusID = 0 THEN
					DRP_m3_olie_To.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_p_pumpe_before.Enable := TRUE;
			
			IF DRP_p_pumpe_before.Active THEN
				IF DRP_p_pumpe_before.StatusID = 0 THEN
					DRP_p_pumpe_before.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_p_pumpe_after.Enable := TRUE;
			
			IF DRP_p_pumpe_after.Active THEN
				IF DRP_p_pumpe_after.StatusID = 0 THEN
					DRP_p_pumpe_after.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_p_last.Enable := TRUE;
			
			IF DRP_p_last.Active THEN
				IF DRP_p_last.StatusID = 0 THEN
					DRP_p_last.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_inverter_DC.Enable := TRUE;
			
			IF DRP_inverter_DC.Active THEN
				IF DRP_inverter_DC.StatusID = 0 THEN
					DRP_inverter_DC.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_inverter_voltage.Enable := TRUE;
			
			IF DRP_inverter_voltage.Active THEN
				IF DRP_inverter_voltage.StatusID = 0 THEN
					DRP_inverter_voltage.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_inverter_current.Enable := TRUE;
			
			IF DRP_inverter_current.Active THEN
				IF DRP_inverter_current.StatusID = 0 THEN
					DRP_inverter_current.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m1_toej_Ti.Enable := TRUE;
			
			IF DRP_m1_toej_Ti.Active THEN
				IF DRP_m1_toej_Ti.StatusID = 0 THEN
					DRP_m1_toej_Ti.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m1_toej_To.Enable := TRUE;
			
			IF DRP_m1_toej_To.Active THEN
				IF DRP_m1_toej_To.StatusID = 0 THEN
					DRP_m1_toej_To.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m2_toej_Ti.Enable := TRUE;
			
			IF DRP_m2_toej_Ti.Active THEN
				IF DRP_m2_toej_Ti.StatusID = 0 THEN
					DRP_m2_toej_Ti.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m2_toej_To.Enable := TRUE;
			
			IF DRP_m2_toej_To.Active THEN
				IF DRP_m2_toej_To.StatusID = 0 THEN
					DRP_m2_toej_To.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m3_toej_Ti.Enable := TRUE;
			
			IF DRP_m3_toej_Ti.Active THEN
				IF DRP_m3_toej_Ti.StatusID = 0 THEN
					DRP_m3_toej_Ti.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_m3_toej_To.Enable := TRUE;
			
			IF DRP_m3_toej_To.Active THEN
				IF DRP_m3_toej_To.StatusID = 0 THEN
					DRP_m3_toej_To.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_failState.Enable := TRUE;
			
			IF DRP_failState.Active THEN
				IF DRP_failState.StatusID = 0 THEN
					DRP_failState.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_flow_cooling_water.Enable := TRUE;
			
			IF DRP_flow_cooling_water.Active THEN
				IF DRP_flow_cooling_water.StatusID = 0 THEN
					DRP_flow_cooling_water.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_ctrl_ref.Enable := TRUE;
			
			IF DRP_ctrl_ref.Active THEN
				IF DRP_ctrl_ref.StatusID = 0 THEN
					DRP_ctrl_ref.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_ctrl_D_u.Enable := TRUE;
			
			IF DRP_ctrl_D_u.Active THEN
				IF DRP_ctrl_D_u.StatusID = 0 THEN
					DRP_ctrl_D_u.Enable := TRUE;
					state := 20;
				ELSE
					state := 200;
				END_IF
			END_IF
			
			DRP_PWM_duty.Enable := TRUE;
			
			IF DRP_PWM_duty.Active THEN
				IF DRP_PWM_duty.StatusID = 0 THEN
					DRP_PWM_duty.Enable := TRUE;
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
	DRP_inverter_RPM();
	DRP_T_tank();
	DRP_m1_olie_Ti();
	DRP_m1_olie_To();
	DRP_m2_olie_Ti();
	DRP_m2_olie_To();
	DRP_m3_olie_Ti();
	DRP_m3_olie_To();
	DRP_p_pumpe_before();
	DRP_p_pumpe_after();
	DRP_p_last();
	DRP_inverter_DC();
	DRP_inverter_voltage();
	DRP_inverter_current();
	DRP_m1_toej_Ti();
	DRP_m1_toej_To();
	DRP_m2_toej_Ti();
	DRP_m2_toej_To();
	DRP_m3_toej_Ti();
	DRP_m3_toej_To();
	DRP_failState();
	DRP_flow_cooling_water();
	DRP_ctrl_ref();
	DRP_ctrl_D_u();
	DRP_PWM_duty();
	
END_PROGRAM

PROGRAM _EXIT
	
	DataRecorder(Enable := FALSE);
	DRP_T_ambient(Enable := FALSE);
	DRP_heater(Enable := FALSE);
	DRP_inverter_RPM(Enable := FALSE);
	DRP_T_tank(Enable := FALSE);
	DRP_m1_olie_Ti(Enable := FALSE);
	DRP_m1_olie_To(Enable := FALSE);
	DRP_m2_olie_Ti(Enable := FALSE);
	DRP_m2_olie_To(Enable := FALSE);
	DRP_m3_olie_Ti(Enable := FALSE);
	DRP_m3_olie_To(Enable := FALSE);
	DRP_p_pumpe_before(Enable := FALSE);
	DRP_p_pumpe_after(Enable := FALSE);
	DRP_p_last(Enable := FALSE);
	DRP_inverter_DC(Enable := FALSE);
	DRP_inverter_voltage(Enable := FALSE);
	DRP_inverter_current(Enable := FALSE);
	DRP_m1_toej_Ti(Enable := FALSE);
	DRP_m1_toej_To(Enable := FALSE);
	DRP_m2_toej_Ti(Enable := FALSE);
	DRP_m2_toej_To(Enable := FALSE);
	DRP_m3_toej_Ti(Enable := FALSE);
	DRP_m3_toej_To(Enable := FALSE);
	DRP_failState(Enable := FALSE);
	DRP_flow_cooling_water(Enable := FALSE);
	DRP_ctrl_ref(Enable := FALSE);
	DRP_ctrl_D_u(Enable := FALSE);
	DRP_PWM_duty(Enable := FALSE);
	
END_PROGRAM

