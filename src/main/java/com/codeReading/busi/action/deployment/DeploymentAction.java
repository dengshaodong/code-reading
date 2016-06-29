package com.codeReading.busi.action.deployment;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.codeReading.busi.service.deployment.IDeploymentService;
import com.codeReading.core.framework.web.BaseAction;
import com.codeReading.core.framework.web.ResultData;

/**
 * 文章相关内容
 */
@Controller
public class DeploymentAction  extends BaseAction {
	private Logger log = LoggerFactory.getLogger(DeploymentAction.class);
	
	@Autowired 
	private IDeploymentService deploymentService;
	

	/**
	 * 开放资源，部署页
	 * @param id 文章编号
	 * @param result 包含文章信息、用户基本、评论信息
	 * @return
	 */
	@RequestMapping(value="d/{id}", method=RequestMethod.GET)
	public String deploymentShow(@PathVariable String id, Map<String, Map<String, Object>> result) {
		try {
			log.info("#访问部署页， deploymentid={}", id);
			ResultData data = deploymentService.getDetail(id);
			collect(data, result);			
			return "deployment/deployment";
		} catch (Exception e){
			collect(e, result);
			return ERROR;
		}
	}
	
}
