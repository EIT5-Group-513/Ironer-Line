SHELL := cmd.exe

export AS_SYSTEM_PATH := C:/BrAutomation/AS/System
export AS_BIN_PATH := C:/BrAutomation/AS44/bin-en
export AS_INSTALL_PATH := C:/BrAutomation/AS44
export AS_PATH := C:/BrAutomation/AS44
export AS_VC_PATH := C:/BrAutomation/AS44/AS/VC
export AS_GNU_INST_PATH := C:/BrAutomation/AS44/AS/GnuInst/V4.1.2
export AS_STATIC_ARCHIVES_PATH := C:/Users/Nicol/Documents/EIT5Projekt1/Temp/Archives/Config1/X20CP0484
export AS_CPU_PATH := C:/Users/Nicol/Documents/EIT5Projekt1/Temp/Objects/Config1/X20CP0484
export AS_CPU_PATH_2 := C:/Users/Nicol/Documents/EIT5Projekt1/Temp/Objects/Config1/X20CP0484
export AS_TEMP_PATH := C:/Users/Nicol/Documents/EIT5Projekt1/Temp
export AS_BINARIES_PATH := C:/Users/Nicol/Documents/EIT5Projekt1/Binaries
export AS_PROJECT_CPU_PATH := C:/Users/Nicol/Documents/EIT5Projekt1/Physical/Config1/X20CP0484
export AS_PROJECT_CONFIG_PATH := C:/Users/Nicol/Documents/EIT5Projekt1/Physical/Config1
export AS_PROJECT_PATH := C:/Users/Nicol/Documents/EIT5Projekt1
export AS_PROJECT_NAME := EIT5Projekt1
export AS_PLC := X20CP0484
export AS_TEMP_PLC := X20CP0484
export AS_USER_NAME := Nicol
export AS_CONFIGURATION := Config1
export AS_COMPANY_NAME := \ 
export AS_VERSION := 4.4.4.112
export AS_BUILD_MODE := Build


default: \
	.mappView_IntegrationBuild \



include $(AS_CPU_PATH)/TechnologyPackages/.mappView.mak
