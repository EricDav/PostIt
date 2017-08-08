$(document).ready(function(){
$('.modal').modal({
  dismissible: true,
  opacity: 0.5,
  inDuration: 300,
  outDuration: 200,
  startingTop: '4%',
  endingTop: '10%',
  ready: function (modal, trigger) {
     console.log(modal, trigger);
  },
  complete: function () { }
});
$('select').material_select();
});