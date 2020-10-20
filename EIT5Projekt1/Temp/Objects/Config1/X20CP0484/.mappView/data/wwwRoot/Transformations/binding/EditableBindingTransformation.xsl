<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Author: Harald Blab
// Created: Apr 10th,2 105
// Stylesheet to create "editable" binding for opc value/node to brease bindings
//
// Example:
// before:
//  <Binding mode="twoWay">
//    <Source xsi:type="opcUa" refId="::Task1:resetMachine" attribute="value" />
//    <Target xsi:type="brease" refId="resetButton" attribute="value" />
//  </Binding>
// after:
//  <Binding mode="twoWay">
//    <Source xsi:type="opcUa" refId="::Task1:resetMachine" attribute="value" />
//    <Target xsi:type="brease" refId="resetButton" attribute="value" />
//  </Binding>
//    <Binding mode="oneWay">
//      <Source xsi:type="opcUa" refId="::Task1:resetMachine" attribute="editable" />
//      <Target xsi:type="brease" refId="resetButton" attribute="value::editable" />
//    </Binding>
//
// Source format: Runtime Binding
// Target format: Runtime Binding
//
-->

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:bdg="http://www.br-automation.com/iat2014/binding/runtime/v1"
xmlns:br="http://www.br-automation.com/iat2015/bindingList/runtime/v2"
xmlns="http://www.br-automation.com/iat2014/binding/runtime/v1">
  <xsl:output method="xml" encoding="UTF-8" indent="yes" />
  <xsl:variable name="separator" select="'_'" />

  <!-- Template Function to process a single content -->
  <xsl:template name="processContent">

    <xsl:param name="contentId" select="./@id" />

    <xsl:variable name="editableListBindings" select="./*/*[@xsi:type='listElements'][not(./*/*/*[@xsi:type!='opcUa'])]"/>

    <xsl:element name="Content">
      <xsl:attribute name="id" >
        <xsl:value-of select="./@id"/>
      </xsl:attribute>
      <xsl:for-each select="bdg:Binding">
        <xsl:call-template name="extendWidgetIds">
          <xsl:with-param name="contentId" select="$contentId" />
          <xsl:with-param name="source" select="bdg:Source" />
          <xsl:with-param name="target" select="bdg:Target" />
        </xsl:call-template>
        <xsl:choose>
          <xsl:when test="bdg:Source/@xsi:type='opcUa' and bdg:Target/@xsi:type='brease'">
            <xsl:call-template name="createEditableBinding">
              <xsl:with-param name="contentId" select="$contentId" />
              <xsl:with-param name="source" select="bdg:Source" />
              <xsl:with-param name="target" select="bdg:Target" />
            </xsl:call-template>
          </xsl:when>
          <xsl:when test="bdg:Source/@xsi:type='listElements' and bdg:Target/@xsi:type='brease'">
            <xsl:if test="$editableListBindings/@refId=bdg:Source/@refId">
              <xsl:call-template name="createEditableListBinding">
                <xsl:with-param name="contentId" select="$contentId" />
                <xsl:with-param name="source" select="bdg:Source" />
                <xsl:with-param name="target" select="bdg:Target" />
              </xsl:call-template>
            </xsl:if>
          </xsl:when>
          <xsl:when test="bdg:Source/@xsi:type='listElement' and bdg:Target/@xsi:type='brease'">
            <xsl:if test="bdg:Source/br:List/@xsi:type='br:opcUa'">
              <xsl:call-template name="createEditableListElementBinding">
                <xsl:with-param name="contentId" select="$contentId" />
                <xsl:with-param name="source" select="bdg:Source" />
                <xsl:with-param name="target" select="bdg:Target" />
              </xsl:call-template>
            </xsl:if>
          </xsl:when>
          <xsl:when test="bdg:Target/@xsi:type='listSelector'">
            <xsl:variable name="Target"  select="bdg:Target"/>
            <xsl:variable name="Source"  select="bdg:Source"/>
            <xsl:variable name="mode"  select="./@mode"/>
            <xsl:if test="$editableListBindings/@refId=bdg:Target/@refId">
              <xsl:for-each select="$editableListBindings[@refId=$Target/@refId and ./../bdg:Target/@xsi:type='brease']">
                <xsl:call-template name="createEditableListSelectorBinding">
                  <xsl:with-param name="source" select="$Source" />
                  <xsl:with-param name="target" select="$Target" />
                  <xsl:with-param name="mode" select="$mode" />
                  <xsl:with-param name="contentId" select="$contentId" />
                </xsl:call-template>
              </xsl:for-each>
            </xsl:if>
          </xsl:when>
        </xsl:choose>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>

  <xsl:template name="processSession">
    <xsl:copy-of select="."></xsl:copy-of>
  </xsl:template>

  <xsl:template name="copyBreaseElement">
    <xsl:param name="observable" />
    <xsl:param name="contentId" />
    <xsl:element name="{name($observable)}">
      <xsl:copy-of select="$observable/@index"/>
      <xsl:copy-of select="$observable/@xsi:type"/>
      <xsl:attribute name="refId">
        <xsl:value-of select="$contentId"/>
        <xsl:value-of select="$separator" />
        <xsl:value-of select="$observable/@refId"/>
      </xsl:attribute>
      <xsl:copy-of select="$observable/@attribute"/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="copyListElement">
    <xsl:param name="list" />
    <xsl:param name="contentId" />
    <xsl:choose>
      <xsl:when test="$list/@xsi:type='br:brease'">
        <xsl:element name="br:List">
          <xsl:copy-of select="$list/@*"/>
          <xsl:for-each select="$list/br:Element">
            <xsl:call-template name="copyBreaseElement">
              <xsl:with-param name="observable" select="."/>
              <xsl:with-param name="contentId" select="$contentId"/>
            </xsl:call-template>
          </xsl:for-each>
          <xsl:if test="$list/br:Default" >
            <xsl:call-template name="copyBreaseElement">
              <xsl:with-param name="observable" select="$list/br:Default"/>
              <xsl:with-param name="contentId" select="$contentId"/>
            </xsl:call-template>
          </xsl:if>
        </xsl:element>
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy-of select="$list"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="copyBreaseObservable">
    <xsl:param name="observable" />
    <xsl:param name="contentId" />
    <xsl:element name="{name($observable)}">
      <xsl:copy-of select="$observable/@xsi:type"/>
      <xsl:attribute name="refId">
        <xsl:value-of select="$contentId"/>
        <xsl:value-of select="$separator" />
        <xsl:value-of select="$observable/@refId"/>
      </xsl:attribute>
      <xsl:copy-of select="$observable/@attribute"/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="copyListObservable">
    <xsl:param name="observable" />
    <xsl:param name="contentId" />
    <xsl:element name="{name($observable)}">
      <xsl:copy-of select="$observable/@*"/>
      <!-- copy selector -->
      <xsl:call-template name="copyAnyObservable">
        <xsl:with-param name="observable" select="$observable/bdg:Selector"/>
        <xsl:with-param name="contentId" select="$contentId"/>
      </xsl:call-template>
      <!-- copy embedded list -->
      <xsl:call-template name="copyListElement">
        <xsl:with-param name="list" select="$observable/br:List"/>
        <xsl:with-param name="contentId" select="$contentId"/>
      </xsl:call-template>
      <!-- copy referenced list -->
      <xsl:call-template name="copyListElement">
        <xsl:with-param name="list" select="$observable/bdg:List"/>
        <xsl:with-param name="contentId" select="$contentId"/>
      </xsl:call-template>
    </xsl:element>
  </xsl:template>

  <xsl:template name="copyAnyObservable">
    <xsl:param name="observable" />
    <xsl:param name="contentId" />
    <xsl:choose>
      <xsl:when test="$observable/@xsi:type='brease'">
        <xsl:call-template name="copyBreaseObservable">
          <xsl:with-param name="observable" select="$observable"/>
          <xsl:with-param name="contentId" select="$contentId"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$observable/@xsi:type='listElement'">
        <xsl:call-template name="copyListObservable">
          <xsl:with-param name="observable" select="$observable"/>
          <xsl:with-param name="contentId" select="$contentId"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy-of select="$observable"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="extendWidgetIds">
    <xsl:param name="source" />
    <xsl:param name="target" />
    <xsl:param name="contentId" />
    <xsl:element name="Binding">
      <xsl:copy-of select="./@mode"/>
      <!-- copy source -->
      <xsl:call-template name="copyAnyObservable">
        <xsl:with-param name="observable" select="$source"/>
        <xsl:with-param name="contentId" select="$contentId"/>
      </xsl:call-template>
      <!-- copy target -->
      <xsl:call-template name="copyAnyObservable">
        <xsl:with-param name="observable" select="$target"/>
        <xsl:with-param name="contentId" select="$contentId"/>
      </xsl:call-template>
    </xsl:element>
  </xsl:template>

  <xsl:template name="createEditableSourceBinding">
    <xsl:param name="source" />
    <xsl:param name="contentId" />
    <xsl:element name="Source">
      <xsl:copy-of select="$source/@xsi:type"/>
      <xsl:attribute name="refId">
        <xsl:if test="$source/@xsi:type='brease'">
          <xsl:value-of select="$contentId"/>
          <xsl:value-of select="$separator" />
        </xsl:if>
        <xsl:value-of select="$source/@refId"/>
      </xsl:attribute>
      <xsl:attribute name="attribute">
        <xsl:text>editable</xsl:text>
      </xsl:attribute>
      <xsl:copy-of select="$source/@serverAlias"/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="createEditableTargetBinding">
    <xsl:param name="target" />
    <xsl:param name="contentId" />
    <xsl:element name="Target">
      <xsl:copy-of select="$target/@xsi:type"/>
      <xsl:attribute name="refId">
        <xsl:if test="$target/@xsi:type='brease'">
          <xsl:value-of select="$contentId"/>
          <xsl:value-of select="$separator" />
        </xsl:if>
        <xsl:value-of select="$target/@refId"/>
      </xsl:attribute>
      <xsl:attribute name="attribute">
        <xsl:text>editable::</xsl:text>
        <xsl:value-of select="$target/@attribute"/>
      </xsl:attribute>
    </xsl:element>
  </xsl:template>

  <!-- create an editable binding from source to target -->
  <xsl:template name="createEditableBinding">
    <xsl:param name="source" />
    <xsl:param name="target" />
    <xsl:param name="contentId" />
    <xsl:element name="Binding">
      <xsl:attribute name="mode">
        <xsl:text>oneWay</xsl:text>
      </xsl:attribute>
      <!-- opcua with attribute value "editable" -->
      <xsl:call-template name="createEditableSourceBinding">
        <xsl:with-param name="source" select="$source" />
        <xsl:with-param name="contentId" select="$contentId" />
      </xsl:call-template>
      <!-- brease with attribute extension ".editable" -->
      <xsl:call-template name="createEditableTargetBinding">
        <xsl:with-param name="target" select="$target" />
        <xsl:with-param name="contentId" select="$contentId" />
      </xsl:call-template>
    </xsl:element>
  </xsl:template>

  <!-- create an editable list binding from list of element sources -->
  <xsl:template name="createEditableSourceListBinding">
    <xsl:param name="source" />
    <xsl:param name="contentId" />
    <xsl:element name="Source">
      <xsl:copy-of select="$source/@xsi:type"/>
      <xsl:attribute name="refId">
        <xsl:if test="$source/@xsi:type='brease'">
          <xsl:value-of select="$contentId"/>
          <xsl:value-of select="$separator" />
        </xsl:if>
        <xsl:value-of select="$source/@refId"/>
        <xsl:text>::editable</xsl:text>
      </xsl:attribute>
      <xsl:copy-of select="$source/@attribute"/>
      <xsl:element name="Elements">
        <xsl:for-each select="$source/bdg:Elements/bdg:Element">
          <xsl:element name="Element">
            <xsl:copy-of select="./@*"/>
            <!-- opcua with attribute value "editable" -->
            <xsl:call-template name="createEditableSourceBinding">
              <xsl:with-param name="source" select="bdg:Source" />
              <xsl:with-param name="contentId" select="$contentId" />
            </xsl:call-template>
          </xsl:element>
        </xsl:for-each>
      </xsl:element>
    </xsl:element>
  </xsl:template>

  <!-- create an editable list binding from list source to target -->
  <xsl:template name="createEditableListBinding">
    <xsl:param name="source" />
    <xsl:param name="target" />
    <xsl:param name="contentId" />
    <xsl:element name="Binding">
      <xsl:attribute name="mode">
        <xsl:text>oneWay</xsl:text>
      </xsl:attribute>
      <!-- opcua with attribute value "editable" -->
      <xsl:call-template name="createEditableSourceListBinding">
        <xsl:with-param name="source" select="$source" />
        <xsl:with-param name="contentId" select="$contentId" />
      </xsl:call-template>
      <!-- brease with attribute extension ".editable" -->
      <xsl:call-template name="createEditableTargetBinding">
        <xsl:with-param name="target" select="$target" />
        <xsl:with-param name="contentId" select="$contentId" />
      </xsl:call-template>
    </xsl:element>
  </xsl:template>

  <!-- create an editable list binding from list source to target -->
  <xsl:template name="createEditableListSelectorBinding">
    <xsl:param name="source" />
    <xsl:param name="target" />
    <xsl:param name="mode" />
    <xsl:param name="contentId" />

    <xsl:element name="Binding">
      <xsl:copy-of select="$mode"/>
      <!-- brease source with refId extension of contentId -->

      <xsl:element name="Source">
        <xsl:copy-of select="$source/@xsi:type"/>
        <xsl:attribute name="refId">
          <xsl:if test="$source/@xsi:type='brease'">
            <xsl:value-of select="$contentId"/>
            <xsl:value-of select="$separator" />
          </xsl:if>
          <xsl:value-of select="$source/@refId"/>
        </xsl:attribute>
        <xsl:copy-of select="$source/@attribute"/>
      </xsl:element>


      <!--<xsl:copy-of select="$source"/>-->
      <!-- listSelector with refId extension "::editable" -->
      <xsl:element name="Target">
        <xsl:copy-of select="$target/@xsi:type"/>
        <xsl:attribute name="refId">
          <xsl:if test="$target/@xsi:type='brease'">
            <xsl:value-of select="$contentId"/>
            <xsl:value-of select="$separator" />
          </xsl:if>
          <xsl:value-of select="$target/@refId"/>
          <xsl:text>::editable</xsl:text>
        </xsl:attribute>
        <xsl:copy-of select="$target/@attribute"/>
      </xsl:element>
    </xsl:element>
  </xsl:template>

  <!-- create an editable list binding from list of element sources -->
  <xsl:template name="createEditableSourceListElementBinding">
    <xsl:param name="source" />
    <xsl:param name="contentId" />
    <xsl:element name="Source">
      <xsl:copy-of select="$source/@xsi:type"/>
      <xsl:for-each select="$source/bdg:Selector">
        <xsl:call-template name="copyAnyObservable">
          <xsl:with-param name="observable" select="$source/bdg:Selector" />
          <xsl:with-param name="contentId" select="$contentId" />
        </xsl:call-template>
      </xsl:for-each>
      <xsl:element name="br:List">
        <xsl:copy-of select="$source/br:List/@*"/>
        <xsl:for-each select="$source/br:List/br:Element">
          <xsl:element name="br:Element">
            <xsl:copy-of select="./@index"/>
            <xsl:copy-of select="./@refId"/>
            <xsl:attribute name="attribute">
              <xsl:text>editable</xsl:text>
            </xsl:attribute>
            <xsl:copy-of select="./@serverAlias"/>
          </xsl:element>
        </xsl:for-each>
        <xsl:if test="$source/br:List/br:Default">
          <xsl:element name="br:Default">
            <xsl:copy-of select="$source/br:List/br:Default/@refId"/>
            <xsl:attribute name="attribute">
              <xsl:text>editable</xsl:text>
            </xsl:attribute>
            <xsl:copy-of select="./@serverAlias"/>
          </xsl:element>
        </xsl:if>
      </xsl:element>
    </xsl:element>
  </xsl:template>

  <!-- create an editable list binding from list element source to target -->
  <xsl:template name="createEditableListElementBinding">
    <xsl:param name="source" />
    <xsl:param name="target" />
    <xsl:param name="contentId" />
    <xsl:element name="Binding">
      <xsl:attribute name="mode">
        <xsl:text>oneWay</xsl:text>
      </xsl:attribute>
      <!-- opcua with attribute value "editable" -->
      <xsl:call-template name="createEditableSourceListElementBinding">
        <xsl:with-param name="source" select="$source" />
        <xsl:with-param name="contentId" select="$contentId" />
      </xsl:call-template>
      <!-- brease with attribute extension ".editable" -->
      <xsl:call-template name="createEditableTargetBinding">
        <xsl:with-param name="target" select="$target" />
        <xsl:with-param name="contentId" select="$contentId" />
      </xsl:call-template>
    </xsl:element>
  </xsl:template>

  <xsl:template name="processServer">
    <!--Copy Binding from source document to target document-->
    <xsl:copy-of select="."></xsl:copy-of>
  </xsl:template>
  
    <xsl:template name="processVisualization">
    <!--Copy Binding from source document to target document-->
    <xsl:copy-of select="."></xsl:copy-of>
  </xsl:template>

  <!--Starting Point of the Transformation-->
  <xsl:template match="/">
    <!-- <xsl:call-template name="debugInformation"/> -->
    <xsl:if test="bdg:BindingDefinition">
      <xsl:element name="BindingDefinition">
        <!--process (each) server (we only have 1-->
        <xsl:for-each select="bdg:BindingDefinition/bdg:Server">
          <xsl:call-template name="processServer"></xsl:call-template>
        </xsl:for-each>
        <!--process each content-->
        <xsl:for-each select="bdg:BindingDefinition/bdg:Content">
          <xsl:call-template name="processContent"></xsl:call-template>
        </xsl:for-each>
        <!--process each session-->
        <xsl:for-each select="bdg:BindingDefinition/bdg:Session">
          <xsl:call-template name="processSession"></xsl:call-template>
        </xsl:for-each>
		    <!--process each visualization-->
        <xsl:for-each select="bdg:BindingDefinition/bdg:Visualization">
          <xsl:call-template name="processVisualization"></xsl:call-template>
        </xsl:for-each>
      </xsl:element>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>
