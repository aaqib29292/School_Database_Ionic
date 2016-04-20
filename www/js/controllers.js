angular.module('school.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('ClassesController', ClassesController)

.controller('SectionsController', SectionsController)

.controller('StudentsController', StudentsController)

.controller('StudentDetailsController', StudentDetailsController)

// .controller('klassesCtrl', function($scope, Chats) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});
//
//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// })

// .controller('sectionsCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

.controller('contactCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


function ClassesController($resource, classResource, $window) {
  var vm = this;
  // var classResource = $resource('http://localhost:3000/api/v1/klasses/:classId');
  console.log("ClassesController");
  vm.getClasses = function() {
    vm.classResponse = classResource.get();
    console.log("getClasses");
    console.log(vm.classResponse);
  }();

  vm.addClass = function(classname) {
    console.log(classname);
    classResource.save({name:classname});
    $window.location.href = '/';
  }

  vm.editClass = function(classes) {
    console.log("Edit");
    vm.classes = classes;
  }

  vm.updateClass = function(classes, name) {
    $('#editClass').modal('hide');
    console.log("Update");
    classResource.update({classId: classes.id, name: name}, classes);
  }

  vm.deleteClass = function(classes) {
    console.log("delete");
    console.log(classes);
    classResource.delete({classId:classes.id,name:classes.name});
    // Need to add ajax action of deleting class
    // vm.classResponse.klasses.remove(classes);
    $window.location.href = '/';
  }
};


function SectionsController(sectionResource, $resource, $stateParams, $window) {
    var vm = this;

    vm.getSections = function() {
      vm.sectionResponse = sectionResource.get();
    }();

    vm.addSection = function(name) {
      console.log("Add");
      sectionResource.save({name: name});
      $window.location.href = '/';
    }

    vm.editSection = function(sections) {
      console.log("Edit");
      vm.sections = sections;
    }

    vm.updateSection = function(sections, name) {
      $('#editSection').modal('hide');
      console.log("Update");
      sectionResource.update({sectionId: sections.id, name: name}, sections);
    }

    vm.deleteSection = function(sections) {
      console.log("delete");
      sectionResource.delete({classId: sections.klass_id, sectionId:sections.id, name:sections.name});
      $window.location.href = '/';
    }

  }



  function StudentsController(studentResource, $resource, $stateParams, $window) {
    var vm = this;

    vm.getStudents = function() {
      vm.studentResponse = studentResource.get();
    }();

    vm.addStudent = function(name, rollnumber, fathername, gender, email, phone, dob, address, house) {
      console.log("Add");
      console.log(rollnumber);
      studentResource.save({name: name, roll_number: rollnumber, fathers_name: fathername, gender: gender, email: email, phone: phone, dob: dob, address: address, house_id: house});
      $window.location.href = '/';
    }

  }



  function StudentDetailsController(studentDetailsResource, $resource, $stateParams, $window) {
    var vm = this;

    vm.getStudents = function() {
      vm.studentResponse = studentDetailsResource.get();
      console.log(vm.studentResponse);
    }();
    vm.editStudent = function(student) {
      console.log("Edit");
      vm.student = student;
      $('#editModal').modal('show');
    }

    vm.updateStudent = function(student, name, rollnumber, fathername, gender, email, phone, dob, address, house) {
      $('#editModal').modal('hide');
      studentDetailsResource.update({name: name, roll_number: rollnumber, fathers_name: fathername, gender: gender, email: email, phone: phone, dob: dob, address: address, house_id: house}, student);
      console.log("Update");
    }

    vm.deleteStudent = function(student) {
      var del = confirm("Are you sure?");
      console.log("delete");
      console.log(student);
      if (del == true)
      {
        studentDetailsResource.delete({name: student.name});
        $window.location.href = '/';
      }
    }

  }
