angular.module('school.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('ClassesController', ClassesController)

.controller('SectionsController', SectionsController)

.controller('StudentsController', StudentsController)

.controller('StudentDetailsController', StudentDetailsController)


function ClassesController($scope, $resource, $ionicModal, $ionicListDelegate, $window) {
  var vm = this;

  var classResource = $resource('http://localhost:3000/api/v1/klasses/:classId?access_token=TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4');

  console.log("ClassesController");

  vm.getClasses = function() {
    vm.classResponse = classResource.get();
    console.log("getClasses");
    console.log(vm.classResponse);
  };

  vm.getClasses();

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
      classResource.save({name:className}).$promise.then(function(result) {
          console.log("Success");
          vm.getClasses();
      });
      // vm.classResponse.klasses.push({name:className});
      // work on resetting the modal
      // $scope.modal.reset();
      $scope.modal.hide();
      $("form#newClassForm")[0].reset();
    }

    vm.closeModal = function(){
      $scope.modal.hide();
      $("form#newClassForm")[0].reset();
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
    $ionicListDelegate.closeOptionButtons()
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


function SectionsController($scope, $stateParams, $resource, $ionicModal, $ionicListDelegate, $window) {
    var vm = this;

    var classId = $stateParams.id;

    var sectionResource = $resource('http://localhost:3000/api/v1/klasses/:classId/sections/:sectionId?access_token=TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4', {classId: classId}, { 'update': {method: "PUT"}});

    vm.getSections = function() {
      vm.sectionResponse = sectionResource.get();
      console.log("getSections");
    };

    vm.getSections();

    $ionicModal.fromTemplateUrl('newModal.html', function($ionicModal) {
          $scope.modal = $ionicModal;
      }, {
          // Use our scope for the scope of the modal to keep it simple
          scope: $scope,
          // The animation we want to use for the modal entrance
          animation: 'slide-in-up'
      });

    // vm.addSection = function(sectionName) {
    //   console.log("Add");
    //   sectionResource.save({name: sectionName});
    //   vm.sectionResponse.sections.push({name:sectionName});
    //   // work on resetting the modal
    //   // $scope.modal.reset();
    //   $scope.modal.hide();
    //   // vm.getSections();
    // }

    vm.addSection = function(sectionName) {
      console.log("Add");
      sectionResource.save({name: sectionName}).$promise.then(function(result) {
        console.log("Success");
        vm.getSections();
    });
      //
      $scope.modal.hide();
      $("form#newSectionForm")[0].reset();
    }

    vm.closeModal = function(){
      $scope.modal.hide();
      $("form#newSectionForm")[0].reset();
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

  function StudentsController($scope, $resource, $ionicModal, $ionicListDelegate, $stateParams, $window) {
    var vm = this;

    var classId = $stateParams.klass_id;
    var sectionId = $stateParams.id;

    var studentResource = $resource('http://localhost:3000/api/v1/klasses/:classId/sections/:sectionId/students/:studentId?access_token=TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4',{classId:  classId, sectionId: sectionId}, { 'update': {method: "PUT"}});

    console.log("StudentsController");

    vm.getStudents = function() {
      vm.studentResponse = studentResource.get();
      console.log(vm.studentResponse);
    };

    vm.getStudents();

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
      studentResource.save({name: name, roll_number: rollnumber, fathers_name: fathername, gender: gender, email: email, phone: phone, dob: dob, address: address, house_id: house}).$promise.then(function(result) {
          console.log("Success");
          vm.getStudents();
      });
      // vm.studentResponse.students.push({name: name, roll_number: rollnumber, fathers_name: fathername, gender: gender, email: email, phone: phone, dob: dob, address: address, house_id: house})
      // work on resetting the modal
      $scope.modal.hide();
      $("form#newStudentForm")[0].reset();
    }

    vm.closeModal = function(){
      $scope.modal.hide();
      $("form#newStudentForm")[0].reset();
    }

  }



  function StudentDetailsController($scope, $resource, $ionicModal, $ionicPopup, $ionicHistory,  $ionicListDelegate, $stateParams, $window) {
    var vm = this;

    var classId = $stateParams.klass_id;
    var sectionId = $stateParams.section_id;
    var studentId = $stateParams.id;

    var studentDetailsResource = $resource('http://localhost:3000/api/v1/klasses/:classId/sections/:sectionId/students/:studentId?access_token=TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4',{classId:  classId, sectionId: sectionId, studentId: studentId}, { 'update': {method: "PUT"}});

    vm.getStudents = function() {
      vm.studentResponse = studentDetailsResource.get();
      console.log(vm.studentResponse);
    };

    vm.getStudents();

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
      $scope.modal2.hide();
      studentDetailsResource.update({name: name, roll_number: rollnumber, fathers_name: fathername, gender: gender, email: email, phone: phone, dob: dob, address: address, house_id: house}, student);
      console.log("Update");
    }

    vm.deleteStudent = function(student) {
      var confirmPopup = $ionicPopup.confirm({
       title: 'Delete Student?',
       template: 'Are you sure you want to delete this student?'
     });
      console.log("delete");
      confirmPopup.then(function(res) {
       if(res) {
        console.log("delete done");
        studentDetailsResource.delete({name: student.name}).$promise.then(function(result) {
          console.log("Success");
          $ionicHistory.goBack(-2);
          });
        };

      });

    }

  }
