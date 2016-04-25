angular.module('school.services', [])

.factory('classResource', function($resource) {
        return $resource('http://localhost:3000/api/v1/klasses/:classId',
       {}, { 'update': {method: "PUT"}}); // Note the full endpoint address
  })

  .factory('sectionResource', function($resource, $stateParams) {
      var classId = $stateParams.id;
        return $resource('http://localhost:3000/api/v1/klasses/:classId/sections/:sectionId', {classId: classId}, { 'update': {method: "PUT"}}); // Note the full endpoint address
  })

  .factory('studentResource', function($resource, $stateParams) {
      var classId = $stateParams.klass_id;
      var sectionId = $stateParams.id;

        return $resource('http://localhost:3000/api/v1/klasses/:classId/sections/:sectionId/students/:studentId',{classId:  classId, sectionId: sectionId}, { 'update': {method: "PUT"}}); // Note the full endpoint address
  })

  .factory('studentDetailsResource', function($resource, $stateParams) {
      var classId = $stateParams.klass_id;
      var sectionId = $stateParams.section_id;
      var studentId = $stateParams.id;

        return $resource('http://localhost:3000/api/v1/klasses/:classId/sections/:sectionId/students/:studentId',{classId:  classId, sectionId: sectionId, studentId: studentId}, { 'update': {method: "PUT"}}); // Note the full endpoint address
  });

// .factory('Chats', function() {
//   // Might use a resource here that returns a JSON array
//
//   // Some fake testing data
//   var chats = [{
//     id: 0,
//     name: 'Ben Sparrow',
//     lastText: 'You on your way?',
//     face: 'img/ben.png'
//   }, {
//     id: 1,
//     name: 'Max Lynx',
//     lastText: 'Hey, it\'s me',
//     face: 'img/max.png'
//   }, {
//     id: 2,
//     name: 'Adam Bradleyson',
//     lastText: 'I should buy a boat',
//     face: 'img/adam.jpg'
//   }, {
//     id: 3,
//     name: 'Perry Governor',
//     lastText: 'Look at my mukluks!',
//     face: 'img/perry.png'
//   }, {
//     id: 4,
//     name: 'Mike Harrington',
//     lastText: 'This is wicked good ice cream.',
//     face: 'img/mike.png'
//   }];
//
//   return {
//     all: function() {
//       return chats;
//     },
//     remove: function(chat) {
//       chats.splice(chats.indexOf(chat), 1);
//     },
//     get: function(chatId) {
//       for (var i = 0; i < chats.length; i++) {
//         if (chats[i].id === parseInt(chatId)) {
//           return chats[i];
//         }
//       }
//       return null;
//     }
//   };
// });
