var response = require(__dirname + '/example');;

var arrayOfJobs = response.jobs.values;
var desiredSkillsRE = "(ability\sto\slearn|problem\ssolving|teamwork|communication(s)?|problem-solver|communicator|learning\sability)";

var companyName = "";
var jobTitle = "";
var descriptionMatch;
var skillsAndExpMatch;
var descriptionArray = [];
var skillsArray = [];
var descriptionMatches = [];
var skillsMatches = [];
for (var i=0; i < arrayOfJobs.length; i++) {
  var job = arrayOfJobs[i];
//   console.log(job);
  
  if (job.position !== undefined && typeof(job.position) === "object") {
    jobTitle = job.position.title;
  }
  
  if (job.company !== undefined && typeof(job.company) === "object") {
    companyName = job.company.name;
  }
  
  if (job.description !== undefined) {
    descriptionArray = job.description.split('.');
    for (var j=0; j < descriptionArray.length; j++) {
      descriptionMatch = descriptionArray[j].match(desiredSkillsRE);
      if (descriptionMatch !== undefined && descriptionMatch !== null) {
        descriptionMatches.push({
          companyName:companyName,
          description:descriptionArray[j],
          jobTitle:jobTitle,
          match:descriptionMatch[0]
        });
        console.log("Description Match:"+ descriptionMatch[0] +'\n'+ "for position: "+ jobTitle +" @ "+
        companyName +"):\n" + descriptionArray[j] +
        '\n----------------------------------------------------------\n');
      }
    }
  }
  
  if (job["skills-and-experience"] !== undefined && job["skills-and-experience"] !== "") {
    skillsArray = job["skills-and-experience"].split('.');
    for (var k=0; k < skillsArray.length; k++) {
      skillsAndExpMatch = job["skills-and-experience"].match(desiredSkillsRE);
      if (skillsAndExpMatch !== undefined && skillsAndExpMatch !== null) {
        skillsMatches.push({
          companyName:companyName,
          description:skillsArray[j],
          jobTitle:jobTitle,
          match:skillsAndExpMatch[0]
        });
        console.log("Skills&Experiences Match:"+ skillsAndExpMatch[0] +'\n'+ "for position: "+ jobTitle +" @ "+
        companyName +"):\n" + skillsArray[j] +
        '\n----------------------------------------------------------\n');
      }
    }
  }
}

//console.log(array_of_jobs);