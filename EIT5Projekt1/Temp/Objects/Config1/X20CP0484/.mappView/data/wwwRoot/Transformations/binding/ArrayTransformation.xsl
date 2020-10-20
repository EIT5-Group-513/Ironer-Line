<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Author: Brugger Martin
// Created: Augus 20, 2014
// Stylesheet to transform XML Binding definiton into runtime valid binding definition
-->

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:bdg="http://www.br-automation.com/iat2015/binding/engineering/v2"
xmlns="http://www.br-automation.com/iat2015/binding/engineering/v2"
xmlns:wdg="http://www.br-automation.com/iat2014/widget">
	<xsl:include href="HelperFunctions.xsl"/>
  <xsl:output method="xml" encoding="UTF-8" indent="yes" />
  <xsl:namespace-alias result-prefix="#default" stylesheet-prefix="bdg" />

  <!-- checks if an observable has array binding or not -->
  <xsl:template name="hasArrayBinding">
    <xsl:param name="observable"></xsl:param>
      <xsl:value-of select="contains(substring-after($observable/@refId,'['),':') and contains($observable/@refId,'[')  and contains($observable/@refId,']')"></xsl:value-of>
    <!--    <xsl:value-of select="contains($observable/@refId,'[') and contains($observable/@refId,']')"></xsl:value-of> -->
  </xsl:template>

  <xsl:template name="copyBinding">
    <xsl:copy-of select="."/>
  </xsl:template>
  
    <!-- Template Function to process a page-->
	<xsl:template name="processBindings">
		<xsl:element name="Bindings">
			<xsl:for-each select="bdg:Binding">
        <xsl:variable name="isArrayBinding">
          <xsl:call-template name="hasArrayBinding">
            <xsl:with-param name="observable" select="bdg:Source"/>
          </xsl:call-template>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="$isArrayBinding = 'true'">
            <xsl:call-template name="createSingleBindings">
              <xsl:with-param name="mode" select="./@mode"></xsl:with-param>
            </xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
            <xsl:call-template name="copyBinding"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:for-each>
		</xsl:element>
	</xsl:template>

	<!--Extraction of Array Binding (from source only!)-->
	<xsl:template name="createSingleBindings">
    <xsl:param name="mode"></xsl:param>
		<xsl:variable name="startPos">
			<xsl:call-template name="index-of">
				<xsl:with-param name="input" select="bdg:Source/@refId" />
				<xsl:with-param name="substr" select="'['"/>
			</xsl:call-template>
		</xsl:variable>
		<xsl:variable name="colonPos">
			<xsl:call-template name="index-of">
				<xsl:with-param name="input" select="substring(bdg:Source/@refId,$startPos+1)" />
				<xsl:with-param name="substr" select="':'"/>
			</xsl:call-template>
		</xsl:variable>
		<xsl:variable name="endPos">
			<xsl:call-template name="index-of">
				<xsl:with-param name="input" select="bdg:Source/@refId" />
				<xsl:with-param name="substr" select="']'"/>
			</xsl:call-template>
		</xsl:variable>

		<xsl:variable name="start" select="substring(bdg:Source/@refId,$startPos+1,$colonPos - 1)" />
		<xsl:variable name="end" select="substring(bdg:Source/@refId,$startPos+$colonPos + 1, $endPos - $colonPos - $startPos - 1)"/>
		<xsl:variable name="replacement" select="substring(bdg:Source/@refId,$startPos+1,$endPos - $startPos -1 )" />

    <xsl:call-template name="createBindingLoop">
			<xsl:with-param name="pos" select="$start" />
			<xsl:with-param name="end" select="$end" />
			<xsl:with-param name="replacement" select="$replacement" />
      <xsl:with-param name="mode" select="$mode" />
    </xsl:call-template>
	</xsl:template>

	<!--Recursive function to loop and create all Array Item Bindings -->
	<xsl:template name ="createBindingLoop">
		<xsl:param name="pos" />
		<xsl:param name="end" />
		<xsl:param name="replacement" />
    <xsl:param name="mode" />
    <xsl:element name="Binding">
      <xsl:attribute name="mode">
        <xsl:value-of select="$mode"/>
      </xsl:attribute>
			<xsl:element name="Source">
				<xsl:copy-of select="bdg:Source/@*"/>
				<xsl:attribute name="refId">
					<xsl:call-template name="string-replace-all">
						<xsl:with-param name="text" select="bdg:Source/@refId" />
						<xsl:with-param name="replace" select="$replacement" />
						<xsl:with-param name="by" select="$pos" />
					</xsl:call-template>
				</xsl:attribute>
				<xsl:apply-templates  select="bdg:Source/*" mode="copy-no-namespaces"/>
			</xsl:element>
      <!--
			<xsl:apply-templates select="bdg:Target" mode="copy-no-namespaces"/>
      -->
      <xsl:copy-of select="bdg:Target"/>
		</xsl:element>

		<xsl:if test="$pos &lt; $end">
			<xsl:call-template name="createBindingLoop">
				<xsl:with-param name="pos" select="$pos+1" />
				<xsl:with-param name="end" select="$end" />
				<xsl:with-param name="replacement" select="$replacement" />
        <xsl:with-param name="mode" select="$mode" />
      </xsl:call-template>
		</xsl:if>
	</xsl:template>


  <xsl:template match="/">
    <xsl:if test="bdg:BindingsSet">
      <xsl:element name="BindingsSet">
        <!-- copy attributes -->
        <xsl:for-each select="bdg:BindingsSet/@*">
          <xsl:attribute name="{name()}">
            <xsl:value-of select="."/>
          </xsl:attribute>
        </xsl:for-each>
        <!--process Bindings -->
        <xsl:for-each select="bdg:BindingsSet/bdg:Bindings">
          <xsl:call-template name="processBindings"></xsl:call-template>
        </xsl:for-each>
      </xsl:element>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>