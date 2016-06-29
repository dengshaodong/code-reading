/**
 * 文章列表
 */
$(function(){
     var deployment = {
    	isLogger: false,
		
    	/**
    	 * 页面初始化
    	 */
    	init: function(){
    		GateOne.init({goDiv:'#gateone', url: 'https://120.24.223.77:8008/'}, deployment.initCallback);
    		deployment.bindEvent();
//			editormd.markdownToHTML("article-detail-view", {
//                markdown        : "\r\n"+$("#expend-article").text() , 
//                taskList        : true,
//                tex             : true,  // 默认不解析
//                flowChart       : true,  // 默认不解析
//                sequenceDiagram : true,  // 默认不解析
//            });    		
    	},
		/**事件绑定处理*/
		bindEvent: function(){
		    $('#sendcmd').click(function(){
		    	script.start();
		    });
		},
		
		initCallback: function(){
			GateOne.Events.on("terminal:incoming_term_update", script.step);
		},
		
		checkItem: function(item){
			return item != '';
		},
		
		
     };    
     
     
     var script ={
    	cmds: [],
    	current_index: 0,
    	on: false,
    	
    	init: function(){
    		script.parseScript();
    	},
    	
    	parseScript: function(){
    		var content = $('#expend-article').text();
    		var lines = content.split('\n');
    		var inscript = false;
    		var invi = false;
    		for(var i = 0;i < lines.length;i++){
    		    if(lines[i].match('```shell')){
    		    	inscript  = true;
    		    }
    		    else if(lines[i].match('```vi')){
        		    invi  = true;
    		    }else if(lines[i].match('```')){
    		    	if(inscript){
    		    		inscript  = false;
    		    	}
    		    	if(invi){
    		    		invi  = false;
    		    	}
    		    }else{
    		    	if(inscript){
    		    		script.cmds.push({'input':lines[i], 'output':']#', 'status':'togo'});
    		    	}
    		    	if(invi){
    		    		script.cmds.push({'input':lines[i], 'output':']#', 'status':'togo'});
    		    	}
    		    } 
    		}
    		
    		
    	},
    	
    	start: function(){
    		for(var i = 0; i < script.cmds.length; i++){
    			script.cmds[i].status = 'togo';
    		}
    		
    		script.sendcmd(0);
    		script.current_index = 0;
    		script.on = true;
    	},
    	
    	step: function(message){
    		if(!script.on)return;
    		if(script.current_index >= script.cmds.length)return;
    		
			var result = message.termUpdateObj.screen.filter(deployment.checkItem);
			
			var matched = false;
			for(var i =0; i < result.length; i++) {
				var item = result[i];
				item = jQuery('<p>' + item + '</p>').text();
				
				if(item.match(script.cmds[script.current_index].input))continue;
				
				if(item.match(script.cmds[script.current_index].output)){
					console.log(item, "matched......");
					matched = true;
					break;
				}
			}
			
			if(matched){				
				setTimeout(function(){
					if(!script.cmds[script.current_index])	return;
					
					script.cmds[script.current_index].status = 'gone';
					script.current_index++;
					
					//next cmd
					if(script.current_index < script.cmds.length){
						script.sendcmd(script.current_index);
					}else{
						script.on = false;
					}					
				},1000);
			}
    	},
    	
    	sendcmd: function(index){
    		
    		if(index >= script.cmds.length)return;
    		
			var cmd = script.cmds[index].input;
			
            var message = {'c': cmd + '\r\n'};            
            GateOne.ws.send(JSON.stringify(message));
            console.log('sendcmd ', cmd);	    		
    	}
     }
     
         
     deployment.init();
     script.init();
});