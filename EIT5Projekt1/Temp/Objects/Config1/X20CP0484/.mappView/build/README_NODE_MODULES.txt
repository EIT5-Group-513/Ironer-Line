Wird für den mapp View Build im Automationstudion ein neuens node_modules.zip erstellt muss folgendes beachtet werden:

1) Die benötigten Module über den Befehl npm install abgleichen

2) Prüfen ob die notwendigen module zur Portablen ausführung im Ordner node_modules/.bin enthalten sind:
	- node_x64.exe (version 4.4.5)
	- node_x86.exe (version 4.4.5)
	- grunt.cmd
	
3) Prüfen ob die Env-Variable für node richtig gesetzt ist (Datei grunt.cmd)
	Beispiel:

	@IF "%PROCESSOR_ARCHITECTURE%" == "x86" goto 32BIT

	   @rem OS is 64bit
	   @"%~dp0\node_x64.exe"  "%~dp0\..\grunt-cli\bin\grunt" %*
	   @goto END

	:32BIT
	   @rem OS is 32bit
	   @"%~dp0\node_x86.exe"  "%~dp0\..\grunt-cli\bin\grunt" %*

	:END

sind die oben genannten Bedingungen erfüllt kann die Datei node_modules.zip erstellt werden.