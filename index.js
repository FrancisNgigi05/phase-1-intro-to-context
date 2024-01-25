// This function will be used to create the employees record
function createEmployeeRecord(fourElementArray) {
  return {
    firstName: fourElementArray[0],
    familyName: fourElementArray[1],
    title: fourElementArray[2],
    payPerHour: fourElementArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

// This function 
function createEmployeeRecords(arrayOfArrays) {
  // using map to iterate over each array and convert it to a record
  return (arrayOfArrays.map(function(data) {
    // Returning the record
    return (createEmployeeRecord(data));
  }));
}

function createTimeInEvent(employeeRecordObject, dateStamp) {
  // Breaking down the dateStamp YYYY-MM-DD HHMM into arrays

  // Provide flexibilty to handle any format
  const [year, month, day, hour, minute] = dateStamp.split(/[- :]/);

  // converting each data to an integer
  const hourInt = parseInt(hour, 10);

  // The data to feed in the timeInEvents object
  const timeinEventsData = {
    type: 'TimeIn',
    hour: hourInt,
    date: `${year}-${month}-${day}`
  }

  employeeRecordObject.timeInEvents.push(timeinEventsData);

  // Returns the updated object
  return (employeeRecordObject);
}

function createTimeOutEvent(employeeRecordObject, dateStamp) {
  // Breaking down the dateStamp YYYY-MM-DD HHMM into arrays

  // Provide flexibilty to handle any format
  const [year, month, day, hour, minute] = dateStamp.split(/[- :]/);

  // converting each data to an integer
  const hourInt = parseInt(hour, 10);

  // The data to feed in the timeInEvents object
  const timeOutEventsData = {
    type: 'TimeOut',
    hour: hourInt,
    date: `${year}-${month}-${day}`
  }

  employeeRecordObject.timeOutEvents.push(timeOutEventsData);

  // Returns the updated object
  return (employeeRecordObject);
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
  const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

  if (timeInEvent && timeOutEvent) {
    return timeOutEvent.hour - timeInEvent.hour;
  }

  return 0; // If no matching timeIn and timeOut events are found
}


function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  const allDates = employeeRecord.timeInEvents.map(event => event.date);
  const totalWages = allDates.reduce((sum, date) => sum + wagesEarnedOnDate(employeeRecord, date), 0);
  return totalWages;
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((sum, employeeRecord) => sum + allWagesFor(employeeRecord), 0);
}
