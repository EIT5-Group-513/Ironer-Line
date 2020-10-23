PROGRAM _CYCLIC
<?xml version="1.0"?>
<?AutomationStudio Version=3.0.71?>
<!-- Automation Studio Generated XML Section -->
<networks maxcolumn="0">
	<network label="" comment="" row="11" column="0" commented="0">
		<row>
			<empty/>
			<empty/>
			<functionblock position="header" name="DataRecorder" type="MpDataRecorder"/>
			<empty/>
		</row>
		<row>
			<empty/>
			<contact type="address" name="gDataRecorder"/>
			<functionblock position="top" type="MpDataRecorder"><input name="MpLink" vardynamic="true"/><output name="Active"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<analog type="input" name="1"/>
			<functionblock position="middle" type="MpDataRecorder"><input name="Enable"/><output name="Error"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<empty/>
			<functionblock position="middle" type="MpDataRecorder"><input name="ErrorReset"/><output name="StatusID"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<empty/>
			<functionblock position="middle" type="MpDataRecorder"><input name="Header" vardynamic="true"/><output name="CommandBusy"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<contact type="address" name="'HD'"/>
			<functionblock position="middle" type="MpDataRecorder"><input name="DeviceName" vardynamic="true"/><output name="Recording"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<empty/>
			<functionblock position="middle" type="MpDataRecorder"><input name="SamplingTime"/><output name="RecordDone"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<analog type="input" name="mpDATA_RECORD_MODE_VALUE"/>
			<functionblock position="middle" type="MpDataRecorder"><input name="RecordMode"/><output name="SnapShotDone"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<empty/>
			<functionblock position="middle" type="MpDataRecorder"><input name="Record"/><output name="Info"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<empty/>
			<functionblock position="middle" type="MpDataRecorder"><input name="Trigger"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<empty/>
			<functionblock position="bottom" type="MpDataRecorder"><input name="SnapShot"/></functionblock>
			<empty/>
		</row>
	</network>
	<network label="" comment="" row="8" column="0" commented="0">
		<row>
			<empty/>
			<empty/>
			<functionblock position="header" name="DataRegPar" type="MpDataRegPar"/>
			<empty/>
		</row>
		<row>
			<empty/>
			<contact type="address" name="gDataRecorder"/>
			<functionblock position="top" type="MpDataRegPar"><input name="MpLink" vardynamic="true"/><output name="Active"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<analog type="input" name="1"/>
			<functionblock position="middle" type="MpDataRegPar"><input name="Enable"/><output name="Error"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<empty/>
			<functionblock position="middle" type="MpDataRegPar"><input name="ErrorReset"/><output name="StatusID"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<contact type="address" name="'T_ambient'"/>
			<functionblock position="middle" type="MpDataRegPar"><input name="PVName" vardynamic="true"/><output name="Info"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<empty/>
			<functionblock position="middle" type="MpDataRegPar"><input name="Unit" vardynamic="true"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<empty/>
			<functionblock position="middle" type="MpDataRegPar"><input name="Description" vardynamic="true"/></functionblock>
			<empty/>
		</row>
		<row>
			<empty/>
			<empty/>
			<functionblock position="bottom" type="MpDataRegPar"><input name="ScaleFactor"/></functionblock>
			<empty/>
		</row>
	</network>
</networks>
END_PROGRAM



