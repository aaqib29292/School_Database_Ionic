angular.module('school.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('ClassesController', ClassesController)

.controller('SectionsController', SectionsController)

.controller('StudentsController', StudentsController)

.controller('StudentDetailsController', StudentDetailsController)


function ClassesController($scope, $resource, $ionicModal, $ionicPopup, $ionicListDelegate, $window, classResource) {
  var vm = this;

  console.log("ClassesController");

  vm.getClasses = function() {
    vm.classResponse = classResource.get(function() {
      console.log(vm.classResponse);
    });
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
      vm.addClass = new classResource();
      vm.addClass.name = className;
      vm.addClass.$save(function(){
        vm.getClasses();
      });
      $scope.modal.hide();
      // console.log(vclassName);
      // $scope.className="";
    };

    vm.closeModal = function(){
      console.log("className = " +  $scope.className);
      $scope.modal.hide();
      $scope.className = "";
      // $("form#newClassForm")[0].reset();
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

  // vm.editClass = function(classes) {
  //   console.log("Edit");
  //   $scope.modal2.show();
  //   vm.classes = classes;
  //   $ionicListDelegate.closeOptionButtons()
  // }

  vm.updateClass = function(classes) {
    console.log("classid = " + classes.id);
    vm.classResponse = classResource.get({classId: classes.id}, function() {
      console.log(vm.classes.name);
      vm.classResponse.name = vm.classes.name;
      console.log(vm.classResponse);
      $scope.modal2.hide();
      vm.classResponse.$update({classId: classes.id},function(){
        vm.getClasses();
      });
    });
    console.log("Update");
    // classResource.update({classId: classes.id, name: name}, classes);
    $ionicListDelegate.closeOptionButtons();
  }

  // vm.updateClass = function(classes, name) {
  //   $scope.modal2.hide();
  //   console.log("Update");
  //   classResource.update({classId: classes.id, name: name}, classes);
  //   $ionicListDelegate.closeOptionButtons();
  // }

  vm.deleteClass = function(classes) {
    console.log("delete");
    console.log(classes);


    var confirmPopup = $ionicPopup.confirm({
     title: 'Delete Class?',
     template: 'Are you sure you want to delete this class?'
     });

    confirmPopup.then(function(res) {
     if(res) {
      vm.classResponse = classResource.get({classId: classes.id}, function() {
        console.log(classes.id);
        console.log(vm.classResponse);
        vm.classResponse.$delete({classId: classes.id, name: classes.name}, function() {
          //gone forever!
          console.log("delete done");
          vm.getClasses();
        });
      });
      // classResource.delete({classId:classes.id,name:classes.name});
      // Handle a promise and on success delete the object from the class Array
      // vm.classResponse.klasses.splice(vm.classResponse.klasses.indexOf(classes), 1);
      }
    });
  }

  // vm.deleteClass = function(classes) {
  //   console.log("delete");
  //   console.log(classes);
  //
  //
  //   var confirmPopup = $ionicPopup.confirm({
  //    title: 'Delete Class?',
  //    template: 'Are you sure you want to delete this class?'
  //    });
  //
  //   confirmPopup.then(function(res) {
  //    if(res) {
  //     console.log("delete done");
  //     classResource.delete({classId:classes.id,name:classes.name});
  //     // Handle a promise and on success delete the object from the class Array
  //     vm.classResponse.klasses.splice(vm.classResponse.klasses.indexOf(classes), 1);
  //     }
  //   });
  //
  // }
};


function SectionsController($scope, $stateParams, $resource, $ionicModal, $ionicPopup, $ionicListDelegate, $window) {
    var vm = this;

    var classId = $stateParams.id;

    // var sectionResource = $resource('http://localhost:3000/api/v1/klasses/:classId/sections/:sectionId?access_token=TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4', {classId: classId}, { 'update': {method: "PUT"}});

    var sectionResource = $resource('https://school-db-rails.herokuapp.com/api/v1/klasses/:classId/sections/:sectionId', {classId: classId}, { 'update': {method: "PUT"}});


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
      var confirmPopup = $ionicPopup.confirm({
       title: 'Delete Class?',
       template: 'Are you sure you want to delete this class?'
       });

      confirmPopup.then(function(res) {
       if(res) {
        console.log("delete done");
        sectionResource.delete({classId: sections.klass_id, sectionId:sections.id, name:sections.name});
        vm.sectionResponse.sections.splice(vm.sectionResponse.sections.indexOf(sections), 1);
        }
      });
    }

  }

  function StudentsController($scope, $resource, $ionicModal, $ionicListDelegate, $stateParams, $window) {
    var vm = this;

    var classId = $stateParams.klass_id;
    var sectionId = $stateParams.id;

    // var studentResource = $resource('http://localhost:3000/api/v1/klasses/:classId/sections/:sectionId/students/:studentId?access_token=TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4',{classId:  classId, sectionId: sectionId}, { 'update': {method: "PUT"}});

    var studentResource = $resource('https://school-db-rails.herokuapp.com/api/v1/klasses/:classId/sections/:sectionId/students/:studentId',{classId:  classId, sectionId: sectionId}, { 'update': {method: "PUT"}});


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

    // var studentDetailsResource = $resource('http://localhost:3000/api/v1/klasses/:classId/sections/:sectionId/students/:studentId?access_token=TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4',{classId:  classId, sectionId: sectionId, studentId: studentId}, { 'update': {method: "PUT"}});

    var studentDetailsResource = $resource('https://school-db-rails.herokuapp.com/api/v1/klasses/:classId/sections/:sectionId/students/:studentId', {classId:  classId, sectionId: sectionId, studentId: studentId}, { 'update': {method: "PUT"}});


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
      vm.student.dob = new Date(student.dob);
      console.log("student id: " + student.house_id);
      console.log("student gender_id: " + student.gender_id);
      vm.houses = [
        {id:'1', name:'Yellow' },
        {id:'2', name:'Red' },
        {id:'3', name:'Blue' },
        {id:'4', name:'Green' },
      ];
      vm.genders = [
        {id:'1', code:'Male' },
        {id:'2', code:'Female' }
      ];

      vm.student.gender_id = vm.genders[student.gender_id - 1];

      vm.student.house_id = vm.houses[student.house_id - 1];
    }

    vm.cancelModal = function(){
      vm.getStudents();
      $scope.modal2.hide();
    };

    vm.updateStudent = function(student) {
      $scope.modal2.hide();
      console.log("Update");
      console.log(student.house_id.id);
      console.log(student.gender_id.id);
      studentDetailsResource.update({studentId: student.id, name: student.name, roll_number: student.roll_number, fathers_name: student.fathers_name, house_id: student.house_id.id, gender: student.gender_id.id, email: student.email, phone: student.phone, dob: student.dob, address: student.address}, student).$promise.then(function(result) {
          console.log("Success");
          vm.getStudents();
      });
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
