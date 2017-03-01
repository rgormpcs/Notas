var app=angular.module('starter', ['ionic' , 'starter.notestore'])
// rutas
app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('list',{
    url:'/list',
    templateUrl:'templates/list.html'
  });
  $stateProvider.state('edit',{
    url:'/edit/:id',
    controller:'EditController',
    templateUrl:'templates/edit.html'
  });
  $stateProvider.state('create',{
    url:'/create/',
    controller:'CreateController',
    templateUrl:'templates/edit.html'
  });
  $urlRouterProvider.otherwise('/list');
});

// controladores

app.controller('ListController' , function($scope, NoteStore){
  $scope.notas=NoteStore.list();
  $scope.remove = function(id){
    NoteStore.remove(id)
  };
});
//state es usado para tomar el estado de la url en este caso el id
app.controller('EditController' , function($scope,  $state, NoteStore){
  $scope.id = $state.params.id;
  $scope.nota = angular.copy(NoteStore.get($scope.id));
  $scope.save = function(){
    NoteStore.update($scope.nota);
    // para pasar a un estado determinado en este caso se pasa al estado de lista del stateProvider
    $state.go('list');
  }
});

app.controller('CreateController' , function($scope,  $state , NoteStore){

  $scope.nota = {id: new Date().getTime().toString(), titulo:'', descripcion:''};
  $scope.save = function(){
// usando el servicio creado el factory NoteStore
    NoteStore.create($scope.nota);
    // para pasar a un estado determinado en este caso se pasa al estado de lista del stateProvider
    $state.go('list');

  }
});


app.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


  // var notas=[
  //   {id:'1',titulo:'Nota1',descripcion:'Esto es una descripcion'},
  //   {id:'2',titulo:'Nota2',descripcion:'Descripcion2'}
  // ];
  // function getNota(id){
  //   return notas.filter(function(nota){
  //     return nota.id === id;
  //   })[0];
  // }
  // function updateNota(nota){
  //   for (var i=0; i < notas.length; i++){
  //     if(notas[i].id === nota.id){
  //       notas[i] = nota;
  //       return;
  //     }
  //   }
  // }
  // function createNota(nota){
  //   notas.push(nota);
  // }
