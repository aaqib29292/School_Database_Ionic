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

  function StudentsController($scope, studentResource, $resource, $ionicModal, $ionicListDelegate, $stateParams, $window) {
    var vm = this;
    console.log("StudentsController");

    vm.getStudents = function() {
      vm.studentResponse = studentResource.get();
      console.log(vm.studentResponse);
    }();

    $ionicModal.fromTemplateUrl('newModal.html', function($ionicModal) {
          $scope.modal = $ionicModal;
      }, {
          // Use our scope for the scope of the modal to keep it simple
          scope: $scope,
          // The animation we want to use for the modal entrance
          animation: 'slide-in-up'
      });

    vm.addStudent = function(name, rollnumber, fathername, gender, email, phone, dob, address, house) {
      console.log("Add");
      console.log(rollnumber);
      studentResource.save({name: name, roll_number: rollnumber, fathers_name: fathername, gender: gender, email: email, phone: phone, dob: dob, address: address, house_id: house});
      vm.studentResponse.students.push({name: name, roll_number: rollnumber, fathers_name: fathername, gender: gender, email: email, phone: phone, dob: dob, address: address, house_id: house});
      // work on resetting the modal
      // $scope.modal.reset();
      $scope.modal.hide();
    }

  }



  function StudentDetailsController($scope, studentDetailsResource, $resource, $ionicModal, $ionicPopup,  $ionicListDelegate, $stateParams, $window) {
    var vm = this;

    vm.getStudents = function() {
      vm.studentResponse = studentDetailsResource.get();
      console.log(vm.studentResponse);
    }();

    $ionicModal.fromTemplateUrl('editModal.html', function($ionicModal) {
          $scope.modal2 = $ionicModal;
      }, {
          // Use our scope for the scope of the modal to keep it simple
          scope: $scope,
          // The animation we want to use for the modal entrance
          animation: 'slide-in-up'
      });

    vm.editStudent = function(student) {
      console.log("Edit");
      $scope.modal2.show();
      vm.student = student;
    }

    vm.updateStudent = function(student, name, rollnumber, fathername, gender, email, phone, dob, address, house) {
      studentDetailsResource.update({name: name, roll_number: rollnumber, fathers_name: fathername, gender: gender, email: email, phone: phone, dob: dob, address: address, house_id: house}, student);
      console.log("Update");
    }

    vm.deleteStudent = function(student) {
      var confirmPopup = $ionicPopup.confirm({
       title: 'Delete Student?',
       template: 'Are you sure you want to delete this student?'
     });
      console.log("delete");
      console.log(student);
      confirmPopup.then(function(res) {
       if(res) {
        console.log("delete done");
        studentDetailsResource.delete({name: student.name});
        };
      });

    }

  }
