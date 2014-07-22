
var Efx = function(){/*Attributes*/}

Efx.prototype.startFullPage = function(){
 $('#fullpage').fullpage({
    anchors: ['1','2'],
    scrollingSpeed: 1000,
    keyboardScrolling:false,//para que no se pueda hacer scroll con el teclado
    autoScrolling:true,
    resize:false,
    navigation:false
 });
 /*Para que no se pueda hacer scroll con el mouse*/
 $.fn.fullpage.setAllowScrolling(false);
}

balanceApp.provider('pvrEfx', [function () {
  this.oEfx = new Efx()
  //console.log(this.oEfx)
  var self = this
  this.$get = [function() {
    return self.oEfx;
  }];
}])