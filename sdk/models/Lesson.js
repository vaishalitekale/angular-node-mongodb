var mongoose = require('mongoose');
//mongoose.connect('mongodb://graspuuser:noguess21@ds115411.mlab.com:15411/graspu');

var LessonsSchema = new mongoose.Schema({
  title: String,
  lessonType: String,
  attempts: String,
  passingGrades: String,
  resource: String,
  created_by: String,
  state: String
});

LessonsSchema.pre('save', function(next) {

  next();
});

module.exports = mongoose.model('Lesson', LessonsSchema);
