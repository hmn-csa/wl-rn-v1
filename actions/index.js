import * as constAction from "../consts/index";


export const actInitData = (content) => {
	return {
		type: constAction.INIT_DATA,
		content
	};
}

//change status
export const actChangeToDo = (appl_id) => {
	return {
		type: constAction.CHANGE_TODO,
		appl_id,
	};
};

export const actGetToken = (content) => {
	//console.log(`get token ${content}`)
	return {
		type: constAction.GET_TOKEN,
		content,
	};
};


export const actInitDashboard = (content) => {
	//console.log(`actInitDashboard`)
	return {
		type: constAction.INIT_DASHBOARD,
		content,
	}
};


export const actUpdateShowlist = (content) => {
	//console.log(`actInitSHOWLIST`)
	return {
		type: constAction.UPDATE_SHOWLIST,
		content,
	}
};



export const actloginUser = (config) => {
  return {
    type: constAction.API_TOKEN_REQUEST,
    config
  }
};


export const actlogoutUser = () => {
  return {
    type: constAction.TOKEN_REMOVE
  }
};

export const actGetDataSaga = (token) => {
  return {
    type: constAction.API_DATA_REQUEST,
    token
  }
};
