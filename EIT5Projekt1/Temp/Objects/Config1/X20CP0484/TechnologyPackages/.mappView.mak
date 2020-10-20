SHELL := cmd.exe

.mappView_Build: \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Area_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Body_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Dialog_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/MessageBox_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Page_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Scrollbar_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/BasicSlider/meta/BasicSlider_Copied.markerFile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/MessageBox/meta/MessageBox_Copied.markerFile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/Window/meta/Window_Copied.markerFile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/DialogWindow/meta/DialogWindow_Copied.markerFile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/FragmentLoader/meta/FragmentLoader_Copied.markerFile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations/eventbinding/ParameterTypeMapping.xml \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/vis_0.json \
	$(AS_CPU_PATH)/.mappView/data/server/vis_0.vis \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/pages/MAPPVIEW/VISUALIZATION/PAGES/PAGE/CONTENT.scss.css \
	$(AS_CPU_PATH)/.mappView/data/server/binding_0.binding._markerfile \
	$(AS_CPU_PATH)/.mappView/ValidateEventBindings._markerfile \
	$(AS_CPU_PATH)/.mappView/data/server/__SystemVariables.sessionVar \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/grunt.widgets._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/brease_core.css \
	$(AS_CPU_PATH)/.mappView/data/server/Config.mappviewcfg \


.mappView_IntegrationBuild: \
	.mappView_IntegrationBuild_1 \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Transfer.exe' -sourceDir '$(AS_CPU_PATH)/.mappView/data' -targetDir '$(AS_TEMP_PATH)/Transfer/$(AS_CONFIGURATION)/$(AS_PLC)/FilesToTransfer/AddonsData/IAT_Data' -sourceDirIATR '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATR/AREmb/ARM' -targetDirIATR '$(AS_TEMP_PATH)/Transfer/$(AS_CONFIGURATION)/$(AS_PLC)/FilesToTransfer/Addons/IATR' -cultureName 'da-DK' -uiCultureName 'en-US'

.mappView_IntegrationBuild_1: \

	@'$(AS_INSTALL_PATH)/AS/gnuinst/V4.1.2/bin/mingw32-make.exe' -r -j4 -f '$(AS_CPU_PATH)/TechnologyPackages/.mappView.mak' -k '.mappView_$(AS_BUILD_MODE)'

$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile: \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/brease/iatc/brvisu/brease._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/brease/iat/build/build._markerfile \
	$(AS_CPU_PATH)/.mappView/build/node_modules \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations_Copy._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/Area._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/index.html \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/favicon.ico \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CreateMarkerFile -i '$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile' -o '$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile' -job '' -markerFile '$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/brease/iatc/brvisu/brease._markerfile: \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CopyDirectory -i '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC/BRVisu' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu' -job '' -markerFile '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/brease/iatc/brvisu/brease._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/brease/iat/build/build._markerfile: \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CopyDirectory -i '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC/build' -o '$(AS_CPU_PATH)/.mappView/build' -job '' -markerFile '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/brease/iat/build/build._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/build/node_modules: \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category Unzip -i '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC/build/node_modules.zip' -o '$(AS_CPU_PATH)/.mappView/build' -job '' -markerFile '$(AS_CPU_PATH)/.mappView/build/node_modules' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations_Copy._markerfile: \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CopyDirectory -i '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Transformations' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations' -job '' -markerFile '$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations_Copy._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/Area._markerfile: \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CopyDirectory -i '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Types' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/types' -job '' -markerFile '$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/Area._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Area_default.scss.css: \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/Area._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Sass.exe' -command 'buildStyleableProperties' -i '$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/Area_default.scss' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Area_default.scss.css' -iatc '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC' -domain '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1' -workingDir '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Body_default.scss.css: \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/Area._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Sass.exe' -command 'buildStyleableProperties' -i '$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/Body_default.scss' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Body_default.scss.css' -iatc '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC' -domain '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1' -workingDir '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Dialog_default.scss.css: \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/Area._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Sass.exe' -command 'buildStyleableProperties' -i '$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/Dialog_default.scss' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Dialog_default.scss.css' -iatc '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC' -domain '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1' -workingDir '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/MessageBox_default.scss.css: \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/Area._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Sass.exe' -command 'buildStyleableProperties' -i '$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/MessageBox_default.scss' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/MessageBox_default.scss.css' -iatc '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC' -domain '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1' -workingDir '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Page_default.scss.css: \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/Area._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Sass.exe' -command 'buildStyleableProperties' -i '$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/Page_default.scss' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Page_default.scss.css' -iatc '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC' -domain '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1' -workingDir '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Scrollbar_default.scss.css: \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/Area._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Sass.exe' -command 'buildStyleableProperties' -i '$(AS_CPU_PATH)/.mappView/data/wwwRoot/types/Scrollbar_default.scss' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Scrollbar_default.scss.css' -iatc '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC' -domain '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1' -workingDir '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/common/css/boxLayout.sass.css._markerfile: \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CopyDirectory -i '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/common' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/common' -job '' -markerFile '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/common/css/boxLayout.sass.css._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/BasicSlider/meta/BasicSlider_Copied.markerFile: \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BasicSlider/BasicSlider.js \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/common/css/boxLayout.sass.css._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CopyDirectory -i '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BasicSlider/' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/BasicSlider/' -job '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/BasicSlider/meta/BasicSlider_Copied.markerFile' -markerFile '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/BasicSlider/meta/BasicSlider_Copied.markerFile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/MessageBox/meta/MessageBox_Copied.markerFile: \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/MessageBox/MessageBox.js \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/common/css/boxLayout.sass.css._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CopyDirectory -i '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/MessageBox/' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/MessageBox/' -job '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/MessageBox/meta/MessageBox_Copied.markerFile' -markerFile '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/MessageBox/meta/MessageBox_Copied.markerFile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/Window/meta/Window_Copied.markerFile: \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Window/Window.js \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/common/css/boxLayout.sass.css._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CopyDirectory -i '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Window/' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/Window/' -job '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/Window/meta/Window_Copied.markerFile' -markerFile '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/Window/meta/Window_Copied.markerFile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/DialogWindow/meta/DialogWindow_Copied.markerFile: \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DialogWindow/DialogWindow.js \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/common/css/boxLayout.sass.css._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CopyDirectory -i '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DialogWindow/' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/DialogWindow/' -job '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/DialogWindow/meta/DialogWindow_Copied.markerFile' -markerFile '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/DialogWindow/meta/DialogWindow_Copied.markerFile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/FragmentLoader/meta/FragmentLoader_Copied.markerFile: \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FragmentLoader/FragmentLoader.js \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/common/css/boxLayout.sass.css._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CopyDirectory -i '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FragmentLoader/' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/FragmentLoader/' -job '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/FragmentLoader/meta/FragmentLoader_Copied.markerFile' -markerFile '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/FragmentLoader/meta/FragmentLoader_Copied.markerFile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/index.html: \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC/index.html \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CopyFile -i '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC/index.html' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/index.html' -job '' -markerFile '$(AS_CPU_PATH)/.mappView/data/wwwRoot/index.html' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/favicon.ico: \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC/favicon.ico \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CopyFile -i '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC/favicon.ico' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/favicon.ico' -job '' -markerFile '$(AS_CPU_PATH)/.mappView/data/wwwRoot/favicon.ico' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations/eventbinding/ParameterTypeMapping.xml: \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Transformations/eventbinding/ParameterTypeMapping.xml \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/WidgetLibrary.mapping \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \
	$(AS_PROJECT_PATH)/Logical/mappView/Visualization/Pages/Page/Content.content \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.MappingMerger.exe' '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Transformations/eventbinding/ParameterTypeMapping.xml' '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/WidgetLibrary.mapping'  -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations/eventbinding/ParameterTypeMapping.xml' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/vis_0.json._markerfile: \
	$(AS_PROJECT_CPU_PATH)/mappView/Visualizat.vis \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Validator.exe' -i '$(AS_PROJECT_CPU_PATH)/mappView/Visualizat.vis' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/vis_0.json._markerfile' -schemaset '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Schemas/vis/Visualization.xmlschemaset' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/vis_0.json: \
	$(AS_PROJECT_CPU_PATH)/mappView/Visualizat.vis \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/vis_0.json._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/page_0.page._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/layout_0.layout._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/contents/mappView/content_0._markerfile \
	$(AS_CPU_PATH)/.mappView/data/server/binding_0.binding._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Jsonifier.exe' -i '$(AS_PROJECT_CPU_PATH)/mappView/Visualizat.vis' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/vis_0.json' -indexFile '$(AS_CPU_PATH)/.mappView/BR.IAT.indexfile' -fileList '$(AS_CPU_PATH)/.mappView/vis_0_json.bin' -logicalDir '$(AS_PROJECT_PATH)/Logical' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/server/vis_0.vis: \
	$(AS_PROJECT_CPU_PATH)/mappView/Visualizat.vis \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CopyFile -i '$(AS_PROJECT_CPU_PATH)/mappView/Visualizat.vis' -o '$(AS_CPU_PATH)/.mappView/data/server/vis_0.vis' -job '' -markerFile '$(AS_CPU_PATH)/.mappView/data/server/vis_0.vis' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/page_0.page._markerfile: \
	$(AS_PROJECT_PATH)/Logical/mappView/Visualization/Pages/Page/Page.page \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/layout_0.layout._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/contents/mappView/content_0._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Validator.exe' -i '$(AS_PROJECT_PATH)/Logical/mappView/Visualization/Pages/Page/Page.page' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/page_0.page._markerfile' -schemaset '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Schemas/page/engineering/PageDefinition.xmlschemaset' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/layout_0.layout._markerfile: \
	$(AS_PROJECT_PATH)/Logical/mappView/Visualization/Layouts/Layout.layout \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Validator.exe' -i '$(AS_PROJECT_PATH)/Logical/mappView/Visualization/Layouts/Layout.layout' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/layout_0.layout._markerfile' -schemaset '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Schemas/layout/Layout.xmlschemaset' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/contents/mappView/content_0._markerfile: \
	$(AS_PROJECT_PATH)/Logical/mappView/Visualization/Pages/Page/Content.content \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/widgets/brease/BasicSlider/meta/BasicSlider_Copied.markerFile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Content.exe' -i '$(AS_PROJECT_PATH)/Logical/mappView/Visualization/Pages/Page/Content.content' -html '$(AS_CPU_PATH)/.mappView/data/wwwRoot/contents/mappView/content_0.html' -sass '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/pages/MAPPVIEW/VISUALIZATION/PAGES/PAGE/CONTENT.scss' -schemaset '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/WidgetLibrary.xmlschemaset;$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Schemas/content/engineering/Content.xmlschemaset;$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Schemas/content/engineering/WidgetLibrary.xmlschemaset' -htmlTransformation '$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations/content/HTML$(AS_BUILD_MODE)er.xsl' -stylesTransformation '$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations/content/Style$(AS_BUILD_MODE)er.xsl' -markerFile '$(AS_CPU_PATH)/.mappView/data/wwwRoot/contents/mappView/content_0._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/pages/MAPPVIEW/VISUALIZATION/PAGES/PAGE/CONTENT.scss.css: \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/contents/mappView/content_0._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Sass.exe' -command 'buildStyleableProperties' -i '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/pages/MAPPVIEW/VISUALIZATION/PAGES/PAGE/CONTENT.scss' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/pages/MAPPVIEW/VISUALIZATION/PAGES/PAGE/CONTENT.scss.css' -iatc '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC' -domain '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1' -workingDir '.' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/ValidateBindings._markerfile: \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \
	$(AS_PROJECT_CPU_PATH)/mappView/Binding.binding \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.BindingValidator.exe' -category 'bindings' -iatFile '$(AS_CPU_PATH)/.mappView/IatFiles.bin' -opcUaFile '$(AS_CPU_PATH)/.mappView/opcUaFileList.bin' -markerFile '$(AS_CPU_PATH)/.mappView/ValidateBindings._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/DuplicateBindingsFinder._markerfile: \
	$(AS_CPU_PATH)/.mappView/ValidateBindings._markerfile \
	$(AS_PROJECT_CPU_PATH)/mappView/Binding.binding \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.DuplicateFinder.exe' -iatFile '$(AS_CPU_PATH)/.mappView/IatFiles.bin' -category 'bindings' -markerFile '$(AS_CPU_PATH)/.mappView/DuplicateBindingsFinder._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/server/binding_0.binding._markerfile: \
	$(AS_PROJECT_CPU_PATH)/mappView/Binding.binding \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations_Copy._markerfile \
	$(AS_CPU_PATH)/.mappView/DuplicateBindingsFinder._markerfile \
	$(AS_PROJECT_CPU_PATH)/Connectivity/OpcUA/OpcUaMap.uad \
	$(AS_PROJECT_PATH)/Logical/mappView/Visualization/Pages/Page/Content.content \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.BindingTransformer.exe' -i '$(AS_PROJECT_CPU_PATH)/mappView/Binding.binding' -o '$(AS_CPU_PATH)/.mappView/data/server/binding_0.binding' -schemaset '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Schemas/binding/engineering/BindingsSet.xmlschemaset' -c '$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations/binding/ComplexBindingTransformation.xsl' -a '$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations/binding/ArrayTransformation.xsl' -dy '$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations/binding/DynamicBindingTransformation.xsl' -da '$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations/binding/DataSourceBindingTransformation.xsl' -r '$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations/binding/RuntimeBindingTransformation.xsl' -e '$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations/binding/EditableBindingTransformation.xsl' -expressionContentMappingFile '$(AS_CPU_PATH)/.mappView/ExpressionContentMappingFile.xml' -iatFile '$(AS_CPU_PATH)/.mappView/IatFiles.bin' -markerFile '$(AS_CPU_PATH)/.mappView/data/server/binding_0.binding._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/ValidateEventBindings._markerfile: \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.BindingValidator.exe' -category 'eventbindings' -iatFile '$(AS_CPU_PATH)/.mappView/IatFiles.bin' -opcUaFile '$(AS_CPU_PATH)/.mappView/opcUaFileList.bin' -markerFile '$(AS_CPU_PATH)/.mappView/ValidateEventBindings._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/DuplicateThemesFinder._markerfile: \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.DuplicateFinder.exe' -iatFile '$(AS_CPU_PATH)/.mappView/IatFiles.bin' -category 'themes' -markerFile '$(AS_CPU_PATH)/.mappView/DuplicateThemesFinder._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/DuplicateStylesSetsFinder._markerfile: \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.DuplicateFinder.exe' -iatFile '$(AS_CPU_PATH)/.mappView/IatFiles.bin' -category 'stylessets' -markerFile '$(AS_CPU_PATH)/.mappView/DuplicateStylesSetsFinder._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/DuplicateStylesFinder._markerfile: \
	$(AS_CPU_PATH)/.mappView/BR.IAT.widgetsfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.DuplicateFinder.exe' -iatFile '$(AS_CPU_PATH)/.mappView/IatFiles.bin' -category 'styles' -markerFile '$(AS_CPU_PATH)/.mappView/DuplicateStylesFinder._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/server/__SystemVariables.sessionVar: \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Variables/SystemVariables.svar \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Transformation.exe' -i '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Variables/SystemVariables.svar' -o '$(AS_CPU_PATH)/.mappView/data/server/__SystemVariables.sessionVar' -schemaset '$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Schemas/session/engineering/VariablesSet.xmlschemaset' -t '$(AS_CPU_PATH)/.mappView/data/wwwRoot/Transformations/session/SessionVar$(AS_BUILD_MODE)er.xsl' -workingDir '.' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/DuplicateBindingsListSetsFinder._markerfile: \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.DuplicateFinder.exe' -iatFile '$(AS_CPU_PATH)/.mappView/IatFiles.bin' -category 'bindingsListsSets' -markerFile '$(AS_CPU_PATH)/.mappView/DuplicateBindingsListSetsFinder._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/grunt.widgets._markerfile: \
	$(AS_CPU_PATH)/.mappView/data/.mappView_Prerequisites._markerfile \
	$(AS_CPU_PATH)/.mappView/BR.IAT.widgetsfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Area_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Body_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Dialog_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/MessageBox_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Page_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Scrollbar_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/pages/MAPPVIEW/VISUALIZATION/PAGES/PAGE/CONTENT.scss.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC/BRVisu/css/brease_main.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC/BRVisu/css/brease_suffix.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC/BRVisu/System/Widgets/ContentLoader/css/ContentLoader.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BarChart/css/BarChart.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BasicSlider/css/BasicSlider.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BusyIndicator/css/BusyIndicator.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Button/css/Button.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ButtonBar/css/ButtonBar.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartWidget/css/ChartWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartXAxisCursorWidget/css/ChartXAxisCursorWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartXAxisWidget/css/ChartXAxisWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartXValueListWidget/css/ChartXValueListWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartYAxisWidget/css/ChartYAxisWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartYValueListWidget/css/ChartYValueListWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/CheckBox/css/CheckBox.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/common/css/boxLayout.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DateTimeInput/css/DateTimeInput.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DateTimeOutput/css/DateTimeOutput.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DateTimePicker/css/DateTimePicker.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DialogWindow/css/DialogWindow.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DropDownBox/css/DropDownBox.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Ellipse/css/Ellipse.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FavoriteWatch/css/FavoriteWatch.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FavoriteWatchItemWidget/css/FavoriteWatchItemWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FlexBox/css/FlexBox.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FlexBoxItem/css/FlexBoxItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FlyOut/css/FlyOut.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FragmentLoader/css/FragmentLoader.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/GroupBox/css/GroupBox.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Image/css/Image.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ImageList/css/ImageList.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/KeyBoard/css/KeyBoard.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Label/css/Label.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LadderEditor/css/LadderEditor.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LadderEditorDialog/css/LadderEditorDialog.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LanguageSelector/css/LanguageSelector.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Line/css/Line.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LinearGauge/css/LinearGauge.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChart/css/LineChart.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartGraph/css/LineChartGraph.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartIndexAxis/css/LineChartIndexAxis.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartTimeAxis/css/LineChartTimeAxis.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartYAxis/css/LineChartYAxis.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ListBox/css/ListBox.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Login/css/Login.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/MeasurementSystemSelector/css/MeasurementSystemSelector.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/MessageBox/css/MessageBox.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NumericInput/css/NumericInput.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NumericOutput/css/NumericOutput.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NumPad/css/NumPad.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/OnlineChart/css/OnlineChart.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/OnlineChartTimeAxis/css/OnlineChartTimeAxis.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/OnlineChartYAxis/css/OnlineChartYAxis.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Paper/css/Paper.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/PDFViewer/css/PDFViewer.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/PieChart/css/PieChart.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGenerator/css/ProfileGenerator.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorXAxis/css/ProfileGeneratorXAxis.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorXAxisItem/css/ProfileGeneratorXAxisItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorXAxisStepItem/css/ProfileGeneratorXAxisStepItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorYAxis/css/ProfileGeneratorYAxis.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorYAxisItem/css/ProfileGeneratorYAxisItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorYAxisStepItem/css/ProfileGeneratorYAxisStepItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProgressBar/css/ProgressBar.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadialGauge/css/RadialGauge.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadialSlider/css/RadialSlider.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadioButton/css/RadioButton.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadioButtonGroup/css/RadioButtonGroup.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Rectangle/css/Rectangle.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Sequencer/css/Sequencer.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerEditArea/css/SequencerEditArea.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerMonitor/css/SequencerMonitor.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerStepItem/css/SequencerStepItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerStepItemParameterForm/css/SequencerStepItemParameterForm.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerStepItemPopup/css/SequencerStepItemPopup.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TabControl/css/TabControl.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TabItem/css/TabItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Table/css/Table.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableColumnWidget/css/TableColumnWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableItem/css/TableItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableItemWidget/css/TableItemWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableWidget/css/TableWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TextInput/css/TextInput.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Timeline/css/Timeline.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ToggleButton/css/ToggleButton.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ToggleSwitch/css/ToggleSwitch.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/VncViewer/css/VncViewer.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/WebViewer/css/WebViewer.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Window/css/Window.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/WindowSizeListener/css/WindowSizeListener.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/AlarmList/meta/AlarmList_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/AlarmListItem/meta/AlarmListItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BarChart/meta/BarChart_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BarChartItem/meta/BarChartItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BasicSlider/meta/BasicSlider_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BusyIndicator/meta/BusyIndicator_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Button/meta/Button_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ButtonBar/meta/ButtonBar_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartWidget/meta/ChartWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartXAxisCursorWidget/meta/ChartXAxisCursorWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartXAxisWidget/meta/ChartXAxisWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartXValueListWidget/meta/ChartXValueListWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartYAxisWidget/meta/ChartYAxisWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartYValueListWidget/meta/ChartYValueListWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/CheckBox/meta/CheckBox_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DataHandlerWidget/meta/DataHandlerWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DateTimeInput/meta/DateTimeInput_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DateTimeOutput/meta/DateTimeOutput_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DateTimePicker/meta/DateTimePicker_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DialogWindow/meta/DialogWindow_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DropDownBox/meta/DropDownBox_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Ellipse/meta/Ellipse_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FavoriteWatch/meta/FavoriteWatch_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FavoriteWatchItemInOut/meta/FavoriteWatchItemInOut_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FavoriteWatchItemOut/meta/FavoriteWatchItemOut_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FavoriteWatchItemWidget/meta/FavoriteWatchItemWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FlexBox/meta/FlexBox_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FlexBoxItem/meta/FlexBoxItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FlyOut/meta/FlyOut_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FragmentLoader/meta/FragmentLoader_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/GroupBox/meta/GroupBox_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Image/meta/Image_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ImageList/meta/ImageList_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/KeyBoard/meta/KeyBoard_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Label/meta/Label_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LadderEditor/meta/LadderEditor_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LadderEditorDialog/meta/LadderEditorDialog_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LanguageSelector/meta/LanguageSelector_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Line/meta/Line_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LinearGauge/meta/LinearGauge_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChart/meta/LineChart_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartGraph/meta/LineChartGraph_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartIndexAxis/meta/LineChartIndexAxis_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartTimeAxis/meta/LineChartTimeAxis_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartXAxisIndexCursor/meta/LineChartXAxisIndexCursor_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartXAxisMsTimeCursor/meta/LineChartXAxisMsTimeCursor_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartXAxisTimeCursor/meta/LineChartXAxisTimeCursor_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartYAxis/meta/LineChartYAxis_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ListBox/meta/ListBox_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Login/meta/Login_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LoginButton/meta/LoginButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LoginInfo/meta/LoginInfo_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LogoutButton/meta/LogoutButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/MeasurementSystemSelector/meta/MeasurementSystemSelector_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/MessageBox/meta/MessageBox_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/MomentaryPushButton/meta/MomentaryPushButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Navigation/meta/Navigation_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NavigationBar/meta/NavigationBar_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NavigationButton/meta/NavigationButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NumericInput/meta/NumericInput_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NumericOutput/meta/NumericOutput_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NumPad/meta/NumPad_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/OnlineChart/meta/OnlineChart_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/OnlineChartGraph/meta/OnlineChartGraph_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/OnlineChartTimeAxis/meta/OnlineChartTimeAxis_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/OnlineChartYAxis/meta/OnlineChartYAxis_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Paper/meta/Paper_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Password/meta/Password_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/PDFViewer/meta/PDFViewer_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/PieChart/meta/PieChart_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/PieChartItem/meta/PieChartItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGenerator/meta/ProfileGenerator_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorXAxis/meta/ProfileGeneratorXAxis_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorXAxisItem/meta/ProfileGeneratorXAxisItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorXAxisStepItem/meta/ProfileGeneratorXAxisStepItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorYAxis/meta/ProfileGeneratorYAxis_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorYAxisItem/meta/ProfileGeneratorYAxisItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorYAxisStepItem/meta/ProfileGeneratorYAxisStepItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProgressBar/meta/ProgressBar_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/PushButton/meta/PushButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadialGauge/meta/RadialGauge_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadialSlider/meta/RadialSlider_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadioButton/meta/RadioButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadioButtonGroup/meta/RadioButtonGroup_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Rectangle/meta/Rectangle_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Sequencer/meta/Sequencer_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerEditArea/meta/SequencerEditArea_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerMonitor/meta/SequencerMonitor_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerStepItem/meta/SequencerStepItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerStepItemParameterForm/meta/SequencerStepItemParameterForm_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerStepItemPopup/meta/SequencerStepItemPopup_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SystemNavButton/meta/SystemNavButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TabControl/meta/TabControl_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TabItem/meta/TabItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Table/meta/Table_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableColumnWidget/meta/TableColumnWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableItem/meta/TableItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableItemImageList/meta/TableItemImageList_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableItemWidget/meta/TableItemWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableWidget/meta/TableWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TextInput/meta/TextInput_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TextOutput/meta/TextOutput_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Timeline/meta/Timeline_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ToggleButton/meta/ToggleButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ToggleSwitch/meta/ToggleSwitch_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/VideoPlayer/meta/VideoPlayer_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/VncViewer/meta/VncViewer_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/WebViewer/meta/WebViewer_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Window/meta/Window_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/WindowSizeListener/meta/WindowSizeListener_default.sass.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/brease_core.css \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Grunt.exe' -workingDir '$(AS_CPU_PATH)/.mappView/build/node_modules/.bin' -gruntCommand 'brease$(AS_BUILD_MODE)As --buildpath=''$(AS_CPU_PATH)/.mappView/data/wwwRoot''' -markerFile '$(AS_CPU_PATH)/.mappView/data/wwwRoot/grunt.widgets._markerfile' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/brease_core.css: \
	$(AS_CPU_PATH)/.mappView/BR.IAT.concatfile \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Area_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Body_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Dialog_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/MessageBox_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Page_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/types/Scrollbar_default.scss.css \
	$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/pages/MAPPVIEW/VISUALIZATION/PAGES/PAGE/CONTENT.scss.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC/BRVisu/css/brease_main.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC/BRVisu/css/brease_suffix.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/IATC/BRVisu/System/Widgets/ContentLoader/css/ContentLoader.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BarChart/css/BarChart.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BasicSlider/css/BasicSlider.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BusyIndicator/css/BusyIndicator.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Button/css/Button.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ButtonBar/css/ButtonBar.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartWidget/css/ChartWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartXAxisCursorWidget/css/ChartXAxisCursorWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartXAxisWidget/css/ChartXAxisWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartXValueListWidget/css/ChartXValueListWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartYAxisWidget/css/ChartYAxisWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartYValueListWidget/css/ChartYValueListWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/CheckBox/css/CheckBox.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/common/css/boxLayout.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DateTimeInput/css/DateTimeInput.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DateTimeOutput/css/DateTimeOutput.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DateTimePicker/css/DateTimePicker.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DialogWindow/css/DialogWindow.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DropDownBox/css/DropDownBox.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Ellipse/css/Ellipse.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FavoriteWatch/css/FavoriteWatch.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FavoriteWatchItemWidget/css/FavoriteWatchItemWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FlexBox/css/FlexBox.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FlexBoxItem/css/FlexBoxItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FlyOut/css/FlyOut.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FragmentLoader/css/FragmentLoader.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/GroupBox/css/GroupBox.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Image/css/Image.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ImageList/css/ImageList.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/KeyBoard/css/KeyBoard.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Label/css/Label.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LadderEditor/css/LadderEditor.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LadderEditorDialog/css/LadderEditorDialog.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LanguageSelector/css/LanguageSelector.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Line/css/Line.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LinearGauge/css/LinearGauge.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChart/css/LineChart.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartGraph/css/LineChartGraph.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartIndexAxis/css/LineChartIndexAxis.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartTimeAxis/css/LineChartTimeAxis.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartYAxis/css/LineChartYAxis.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ListBox/css/ListBox.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Login/css/Login.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/MeasurementSystemSelector/css/MeasurementSystemSelector.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/MessageBox/css/MessageBox.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NumericInput/css/NumericInput.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NumericOutput/css/NumericOutput.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NumPad/css/NumPad.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/OnlineChart/css/OnlineChart.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/OnlineChartTimeAxis/css/OnlineChartTimeAxis.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/OnlineChartYAxis/css/OnlineChartYAxis.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Paper/css/Paper.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/PDFViewer/css/PDFViewer.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/PieChart/css/PieChart.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGenerator/css/ProfileGenerator.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorXAxis/css/ProfileGeneratorXAxis.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorXAxisItem/css/ProfileGeneratorXAxisItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorXAxisStepItem/css/ProfileGeneratorXAxisStepItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorYAxis/css/ProfileGeneratorYAxis.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorYAxisItem/css/ProfileGeneratorYAxisItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorYAxisStepItem/css/ProfileGeneratorYAxisStepItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProgressBar/css/ProgressBar.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadialGauge/css/RadialGauge.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadialSlider/css/RadialSlider.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadioButton/css/RadioButton.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadioButtonGroup/css/RadioButtonGroup.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Rectangle/css/Rectangle.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Sequencer/css/Sequencer.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerEditArea/css/SequencerEditArea.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerMonitor/css/SequencerMonitor.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerStepItem/css/SequencerStepItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerStepItemParameterForm/css/SequencerStepItemParameterForm.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerStepItemPopup/css/SequencerStepItemPopup.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TabControl/css/TabControl.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TabItem/css/TabItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Table/css/Table.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableColumnWidget/css/TableColumnWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableItem/css/TableItem.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableItemWidget/css/TableItemWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableWidget/css/TableWidget.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TextInput/css/TextInput.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Timeline/css/Timeline.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ToggleButton/css/ToggleButton.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ToggleSwitch/css/ToggleSwitch.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/VncViewer/css/VncViewer.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/WebViewer/css/WebViewer.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Window/css/Window.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/WindowSizeListener/css/WindowSizeListener.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/AlarmList/meta/AlarmList_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/AlarmListItem/meta/AlarmListItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BarChart/meta/BarChart_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BarChartItem/meta/BarChartItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BasicSlider/meta/BasicSlider_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/BusyIndicator/meta/BusyIndicator_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Button/meta/Button_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ButtonBar/meta/ButtonBar_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartWidget/meta/ChartWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartXAxisCursorWidget/meta/ChartXAxisCursorWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartXAxisWidget/meta/ChartXAxisWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartXValueListWidget/meta/ChartXValueListWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartYAxisWidget/meta/ChartYAxisWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ChartYValueListWidget/meta/ChartYValueListWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/CheckBox/meta/CheckBox_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DataHandlerWidget/meta/DataHandlerWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DateTimeInput/meta/DateTimeInput_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DateTimeOutput/meta/DateTimeOutput_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DateTimePicker/meta/DateTimePicker_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DialogWindow/meta/DialogWindow_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/DropDownBox/meta/DropDownBox_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Ellipse/meta/Ellipse_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FavoriteWatch/meta/FavoriteWatch_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FavoriteWatchItemInOut/meta/FavoriteWatchItemInOut_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FavoriteWatchItemOut/meta/FavoriteWatchItemOut_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FavoriteWatchItemWidget/meta/FavoriteWatchItemWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FlexBox/meta/FlexBox_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FlexBoxItem/meta/FlexBoxItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FlyOut/meta/FlyOut_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/FragmentLoader/meta/FragmentLoader_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/GroupBox/meta/GroupBox_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Image/meta/Image_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ImageList/meta/ImageList_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/KeyBoard/meta/KeyBoard_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Label/meta/Label_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LadderEditor/meta/LadderEditor_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LadderEditorDialog/meta/LadderEditorDialog_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LanguageSelector/meta/LanguageSelector_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Line/meta/Line_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LinearGauge/meta/LinearGauge_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChart/meta/LineChart_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartGraph/meta/LineChartGraph_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartIndexAxis/meta/LineChartIndexAxis_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartTimeAxis/meta/LineChartTimeAxis_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartXAxisIndexCursor/meta/LineChartXAxisIndexCursor_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartXAxisMsTimeCursor/meta/LineChartXAxisMsTimeCursor_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartXAxisTimeCursor/meta/LineChartXAxisTimeCursor_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LineChartYAxis/meta/LineChartYAxis_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ListBox/meta/ListBox_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Login/meta/Login_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LoginButton/meta/LoginButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LoginInfo/meta/LoginInfo_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/LogoutButton/meta/LogoutButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/MeasurementSystemSelector/meta/MeasurementSystemSelector_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/MessageBox/meta/MessageBox_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/MomentaryPushButton/meta/MomentaryPushButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Navigation/meta/Navigation_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NavigationBar/meta/NavigationBar_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NavigationButton/meta/NavigationButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NumericInput/meta/NumericInput_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NumericOutput/meta/NumericOutput_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/NumPad/meta/NumPad_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/OnlineChart/meta/OnlineChart_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/OnlineChartGraph/meta/OnlineChartGraph_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/OnlineChartTimeAxis/meta/OnlineChartTimeAxis_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/OnlineChartYAxis/meta/OnlineChartYAxis_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Paper/meta/Paper_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Password/meta/Password_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/PDFViewer/meta/PDFViewer_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/PieChart/meta/PieChart_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/PieChartItem/meta/PieChartItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGenerator/meta/ProfileGenerator_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorXAxis/meta/ProfileGeneratorXAxis_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorXAxisItem/meta/ProfileGeneratorXAxisItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorXAxisStepItem/meta/ProfileGeneratorXAxisStepItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorYAxis/meta/ProfileGeneratorYAxis_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorYAxisItem/meta/ProfileGeneratorYAxisItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProfileGeneratorYAxisStepItem/meta/ProfileGeneratorYAxisStepItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ProgressBar/meta/ProgressBar_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/PushButton/meta/PushButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadialGauge/meta/RadialGauge_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadialSlider/meta/RadialSlider_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadioButton/meta/RadioButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/RadioButtonGroup/meta/RadioButtonGroup_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Rectangle/meta/Rectangle_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Sequencer/meta/Sequencer_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerEditArea/meta/SequencerEditArea_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerMonitor/meta/SequencerMonitor_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerStepItem/meta/SequencerStepItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerStepItemParameterForm/meta/SequencerStepItemParameterForm_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SequencerStepItemPopup/meta/SequencerStepItemPopup_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/SystemNavButton/meta/SystemNavButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TabControl/meta/TabControl_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TabItem/meta/TabItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Table/meta/Table_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableColumnWidget/meta/TableColumnWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableItem/meta/TableItem_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableItemImageList/meta/TableItemImageList_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableItemWidget/meta/TableItemWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TableWidget/meta/TableWidget_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TextInput/meta/TextInput_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/TextOutput/meta/TextOutput_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Timeline/meta/Timeline_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ToggleButton/meta/ToggleButton_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/ToggleSwitch/meta/ToggleSwitch_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/VideoPlayer/meta/VideoPlayer_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/VncViewer/meta/VncViewer_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/WebViewer/meta/WebViewer_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/Window/meta/Window_default.sass.css \
	$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/Widgets/brease/WindowSizeListener/meta/WindowSizeListener_default.sass.css \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.Sass.exe' -command 'concat' -i '$(AS_CPU_PATH)/.mappView/BR.IAT.concatfile' -o '$(AS_CPU_PATH)/.mappView/data/wwwRoot/BRVisu/css/brease_core.css' -cultureName 'da-DK' -uiCultureName 'en-US'

$(AS_CPU_PATH)/.mappView/data/server/Config.mappviewcfg: \
	$(AS_PROJECT_CPU_PATH)/mappView/Config.mappviewcfg \

	@'$(AS_INSTALL_PATH)/AS/TechnologyPackages/mappView/5.1.1/bin/BR.IAT.$(AS_BUILD_MODE)er.FileSystem.exe' -category CopyFile -i '$(AS_PROJECT_CPU_PATH)/mappView/Config.mappviewcfg' -o '$(AS_CPU_PATH)/.mappView/data/server/Config.mappviewcfg' -job '' -markerFile '$(AS_CPU_PATH)/.mappView/data/server/Config.mappviewcfg' -cultureName 'da-DK' -uiCultureName 'en-US'

FORCE: \


