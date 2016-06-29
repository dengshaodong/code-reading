<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../base/include.jsp"%>
<html lang="en">
<head>
	<%@ include file="../base/common.jsp"%>
	<script type="text/javascript" src="/js/editor.md/lib/marked.min.js"></script>
    <script type="text/javascript" src="/js/editor.md/lib/prettify.min.js"></script>
    <script type="text/javascript" src="/js/editor.md/lib/raphael.min.js"></script>
    <script type="text/javascript" src="/js/editor.md/lib/underscore.min.js"></script>
    <script type="text/javascript" src="/js/editor.md/lib/sequence-diagram.min.js"></script>
    <script type="text/javascript" src="/js/editor.md/lib/flowchart.min.js"></script>
    <script type="text/javascript" src="/js/editor.md/lib/jquery.flowchart.min.js"></script>
	<script type="text/javascript" src="/js/editor.md/editormd.js"></script>	
    <script type="text/javascript" src="/js/deployment/gateone.js?${jsVersion}"></script>
    <script type="text/javascript" src="/js/deployment/deployment.js?${jsVersion}"></script>
</head>
<body>
	<c:set var="project" value="${result.data.sourceproject}"/>
	
	<%@ include file="../top.jsp" %>

	<div class="mainBody-content">
		<div id="article-detail-view" style="float:left;display:inline;">
			<textarea id="expend-article" style="display:block;height:400px;width:450px;margin-top:10px;;">${result.data.article.content}</textarea>
		</div>	
		<div style="float:right;display:inline">
			<div id="sendcmd" style="width:120px;height:24px;line-height:24px;text-align:center;margin:10px 0px 8px 0px;border:1px solid #ddd;background:#fff;color:#333;border-radius:2px;cursor:pointer">sendcmd</div>
			<div id="gateone_container" style="position: relative; width: 60em; height: 30em;">
			    <div id="gateone"></div>
			</div>
		</div>
		<div class="clear"></div>
	</div>
	
	
	<%@include file="../bottom.jsp" %>
</body>
</html>
