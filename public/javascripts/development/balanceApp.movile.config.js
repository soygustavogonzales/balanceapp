balanceApp.config(['pvrUserAgentProvider',function (userAgent) {
	balanceApp.userDevice = userAgent.userDevice.getUserAgent()
	console.log(balanceApp.userDevice)
}])
