balanceApp.config(['pvrEfxProvider','pvrUserAgentProvider',function (efx,userAgent) {
	efx.oEfx.startFullPage();
	balanceApp.userDevice = userAgent.userDevice.getUserAgent()

	//console.log(balanceApp.userDevice)
}])
