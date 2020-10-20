SHELL := cmd.exe
CYGWIN=nontsec
export PATH := C:\Program Files (x86)\Common Files\Oracle\Java\javapath;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\Program Files\NVIDIA Corporation\NVIDIA NvDLISR;C:\Users\Nicol\AppData\Local\Microsoft\WindowsApps;C:\Program Files\MATLAB\R2018b\bin;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\DAL;C:\Program Files\Intel\Intel(R) Management Engine Components\DAL;C:\Users\Nicol\AppData\Local\Microsoft\WindowsApps;C:\Program Files (x86)\Common Files\Hilscher GmbH\TLRDecode;C:\Users\Nicol\AppData\Local\Microsoft\WindowsApps;C:\Program Files (x86)\Common Files\Hilscher GmbH\TLRDecode
export AS_BUILD_MODE := Build
export AS_VERSION := 4.4.4.112
export AS_COMPANY_NAME :=  
export AS_USER_NAME := Nicol
export AS_PATH := C:/BrAutomation/AS44
export AS_BIN_PATH := C:/BrAutomation/AS44/Bin-en
export AS_PROJECT_PATH := C:/Users/Nicol/Documents/EIT5Projekt1
export AS_PROJECT_NAME := EIT5Projekt1
export AS_SYSTEM_PATH := C:/BrAutomation/AS/System
export AS_VC_PATH := C:/BrAutomation/AS44/AS/VC
export AS_TEMP_PATH := C:/Users/Nicol/Documents/EIT5Projekt1/Temp
export AS_CONFIGURATION := Config1
export AS_BINARIES_PATH := C:/Users/Nicol/Documents/EIT5Projekt1/Binaries
export AS_GNU_INST_PATH := C:/BrAutomation/AS44/AS/GnuInst/V4.1.2
export AS_GNU_BIN_PATH := $(AS_GNU_INST_PATH)/bin
export AS_GNU_INST_PATH_SUB_MAKE := C:/BrAutomation/AS44/AS/GnuInst/V4.1.2
export AS_GNU_BIN_PATH_SUB_MAKE := $(AS_GNU_INST_PATH_SUB_MAKE)/bin
export AS_INSTALL_PATH := C:/BrAutomation/AS44
export WIN32_AS_PATH := "C:\BrAutomation\AS44"
export WIN32_AS_BIN_PATH := "C:\BrAutomation\AS44\Bin-en"
export WIN32_AS_PROJECT_PATH := "C:\Users\Nicol\Documents\EIT5Projekt1"
export WIN32_AS_SYSTEM_PATH := "C:\BrAutomation\AS\System"
export WIN32_AS_VC_PATH := "C:\BrAutomation\AS44\AS\VC"
export WIN32_AS_TEMP_PATH := "C:\Users\Nicol\Documents\EIT5Projekt1\Temp"
export WIN32_AS_BINARIES_PATH := "C:\Users\Nicol\Documents\EIT5Projekt1\Binaries"
export WIN32_AS_GNU_INST_PATH := "C:\BrAutomation\AS44\AS\GnuInst\V4.1.2"
export WIN32_AS_GNU_BIN_PATH := "$(WIN32_AS_GNU_INST_PATH)\\bin" 
export WIN32_AS_INSTALL_PATH := "C:\BrAutomation\AS44"

.suffixes:

ProjectMakeFile:

	@'$(AS_BIN_PATH)/BR.AS.AnalyseProject.exe' '$(AS_PROJECT_PATH)/EIT5Projekt1.apj' -t '$(AS_TEMP_PATH)' -c '$(AS_CONFIGURATION)' -o '$(AS_BINARIES_PATH)'   -sfas -buildMode 'Build'   

