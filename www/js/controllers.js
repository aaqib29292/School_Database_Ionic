angular.module('school.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('ClassesController', ClassesController)

.controller('SectionsController', SectionsController)

.controller('StudentsController', StudentsController)

.controller('StudentDetailsController', StudentDetailsController)


.controller('contactCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


function ClassesController($scope, $resource, classResource, $ionicModal, $ionicListDelegate, $window) {
  var vm = this;
  // var classResource = $resource('http://localhost:3000/api/v1/klasses/:classId');
  console.log("ClassesController");
  vm.getClasses = function() {
    vm.classResponse = classResource.get();
    console.log("getClasses");
    console.log(vm.classResponse);
  }();

  $ionicModal.fromTemplateUrl('newModal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });

    vm.addClass = function(className){
      console.log(className);
      classResource.save({name:className});
      vm.classResponse.klasses.push({name:className});
      // work on resetting the modal
      // $scope.modal.reset();
      $scope.modal.hide();
    }

  $ionicModal.fromTemplateUrl('editModal.html', function($ionicModal) {
        $scope.modal2 = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });

  vm.editClass = function(classes) {
    console.log("Edit");
    $scope.modal2.show();
    vm.classes = classes;
  }

  vm.updateClass = function(classes, name) {
    $scope.modal2.hide();
    console.log("Update");
    classResource.update({classId: classes.id, name: name}, classes);
    $ionicListDelegate.closeOptionButtons();
  }

  vm.deleteClass = function(classes) {
    console.log("delete");
    console.log(classes);
    classResource.delete({classId:classes.id,name:classes.name});
    vm.classResponse.klasses.splice(vm.classResponse.klasses.indexOf(classes), 1);
  }
};


function SectionsController($scope, $resource, sectionResource, $ionicModal, $ionicListDelegate, $window) {
    var vm = this;

    vm.getSections = function() {
      vm.sectionResponse = sectionResource.get();
    }();

    $ionicModal.fromTemplateUrl('newModal.html', function($ionicModal) {
          $scope.modal = $ionicModal;
      }, {
          // Use our scope for the scope of the modal to keep it simple
          scope: $scope,
          // The animation we want to use for the modal entrance
          animation: 'slide-in-up'
      });

    vm.addSection = function(sectionName) {
      console.log("Add");
      sectionResource.save({name: sectionName});
      vm.sectionResponse.sections.push({name:sectionName});
      // work on resetting the modal
      // $scope.modal.reset();
      $scope.modal.hide();
    }

    $ionicModal.fromTemplateUrl('editModal.html', function($ionicModal) {
          $scope.modal2 = $ionicModal;
      }, {
          // Use our scope for the scope of the modal to keep it simple
          scope: $scope,
          // The animation we want to use for the modal entrance
          animation: 'slide-in-up'
      });

    vm.editSection = function(sections) {
      console.log("Edit");
      $scope.modal2.show();
      vm.sections = sections;
    }

    vm.updateSection = function(sections, name) {
      $scope.modal2.hide();
      console.log("Update");
      sectionResource.update({sectionId: sections.id, name: name}, sections);
      $ionicListDelegate.closeOptionButtons();
    }

    vm.deleteSection = function(sections) {
      console.log("delete");
      sectionResource.delete({classId: sections.klass_id, sectionId:sections.id, name:sections.name});
      vm.sectionResponse.sections.splice(vm.sectionResponse.sections.indexOf(sections), 1);
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
