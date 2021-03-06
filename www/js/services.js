angular.module('school.services',[])

.factory('classResource', function($resource, $stateParams) {
        return $resource('https://school-db-rails.herokuapp.com/api/v1/klasses/:classId',
       {classId: '@classId'}, { 'update': {method: "PUT"}}); // Note the full endpoint address
  })

// .factory('classResource', function($resource, $stateParams) {
//         return $resource('http://localhost:3000/api/v1/klasses/:classId?access_token=TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4',
//        {classId: '@classId'}, { 'update': {method: "PUT"}}); // Note the full endpoint address
//   });

//
// .factory('classResource', function($resource) {
//         return $resource('http://localhost:3000/api/v1/klasses/:classId?',
//        {}, { 'update': {method: "PUT"}}); // Note the full endpoint address
//   })
//
//   .factory('sectionResource', function($resource, $stateParams) {
//       var classId = $stateParams.id;
//         return $resource('http://localhost:3000/api/v1/klasses/:classId/sections/:sectionId', {classId: classId}, { 'update': {method: "PUT"}}); // Note the full endpoint address
//   })
//
//   .factory('studentResource', function($resource, $stateParams) {
//       var classId = $stateParams.klass_id;
//       var sectionId = $stateParams.id;
//
//         return $resource('http://localhost:3000/api/v1/klasses/:classId/sections/:sectionId/students/:studentId',{classId:  classId, sectionId: sectionId}, { 'update': {method: "PUT"}}); // Note the full endpoint address
//   })
//
//   .factory('studentDetailsResource', function($resource, $stateParams) {
//       var classId = $stateParams.klass_id;
//       var sectionId = $stateParams.section_id;
//       var studentId = $stateParams.id;
//
//         return $resource('http://localhost:3000/api/v1/klasses/:classId/sections/:sectionId/students/:studentId',{classId:  classId, sectionId: sectionId, studentId: studentId}, { 'update': {method: "PUT"}}); // Note the full endpoint address
//   });
