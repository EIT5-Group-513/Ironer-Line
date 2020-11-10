
TYPE
	oc_type : 	STRUCT  (*over current protection type*)
		crb : ARRAY[0..299]OF UINT := [0]; (*Ring buffer for current. Acts as sample window*)
		avg : UINT := 0; (*average current inside sample window*)
		sum : UINT := 0; (*used for calculating the sum of the ring buffer*)
		N : UINT := 300; (*Length of ring buffer*)
		rp : UINT := 0; (*pointer for ringbuffer*)
		max : UINT := 25; (*maximum average current in dA*)
	END_STRUCT;
	tl_type : 	STRUCT  (*temperature limit type*)
		max : INT := 650; (*maximum temperature allowed in d°C*)
	END_STRUCT;
	hna_type : 	STRUCT  (*heater may not be on alone type*)
		cntr : UINT := 0; (*To count time*)
		minRPM : UINT := 500; (*minimum allowed RPM of pump*)
		timeout : UINT := 2400; (*in seconds times cycline period*)
	END_STRUCT;
	op_type : 	STRUCT  (*over pressure protection type*)
		max : REAL := 1.5; (*maximum pressure allowed in Bar*)
		P : REAL := 0.0; (*actual pressure (for calculations)*)
	END_STRUCT;
END_TYPE
