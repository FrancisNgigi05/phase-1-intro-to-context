// Your code here
function createEmployeeRecord(fourElementEmployeeArray) {
    return {
        firstName: fourElementEmployeeArray[0],
        familyName: fourElementEmployeeArray[1],
        title: fourElementEmployeeArray[2],
        payPerHour: fourElementEmployeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrayOfArrays) {
  const arrayOfObjects = [];
  const lengthOfArrayOfArrays = arrayOfArrays.length;

  for (let i = 0; i < lengthOfArrayOfArrays; i++) {
    // Use createEmployeeRecord function to convert each nested array into an employee record
    const employeeRecord = createEmployeeRecord(arrayOfArrays[i]);
    
    // Accumulate the employee record to the new array
    arrayOfObjects.push(employeeRecord);
  }

  return arrayOfObjects;
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [yearStr, monthStr, dayStr, timeStr] = dateStamp.split('-');

    const hour = parseInt(timeStr.slice(0, 2), 10);

    const day =  parseInt(dayStr, 10);

    const data = createEmployeeRecord(employeeRecord);

    data.timeInEvents = [hour, day];

    return data;
}

