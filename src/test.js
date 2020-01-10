module.exports = function(data) {
    const moment = require('moment');
    require('moment-round');
    const {split} = require('moment-range-split');
    let hasOverTime = false;
    let regular_minutes = 0;
    let laborCost = 0;
    let laborCostReg = 0;
    let laborCostOT = 0;
    let minutes = 0;

    function ISODate(s) {
      return s;

    }

    function ObjectId(s) {
      return s;

    }

    const data = [
      {
        '_id': '200000005899991158',
        'Location': 'Chillicothe',
        'LocationCode': '',
        'Id': '200000005899991158',
        'GUID': '4c4ccd0f-6056-40e2-a765-36fcd2367adc',
        'EmployeeId': '200000002744749499',
        'EmployeeGUID': 'a143ff67-4a4e-40ff-8ee2-3abd20fd5362',
        'EmployeeExternalId': '2087',
        'Employee': 'Forsythe, Jeffrey',
        'JobId': '200000000568827074',
        'JobGUID': '301332f8-74c3-407a-b0eb-54b7e17a6668',
        'JobCode': '500',
        'JobTitle': 'Line Cook',
        'InDate': ISODate('2019-12-15T15:55:00.000-05:00'),
        'OutDate': ISODate('2019-12-16T00:37:00.000-05:00'),
        'TotalHours': 8.7,
        'UnpaidBreakTime': 0,
        'PaidBreakTime': 0,
        'PayableHours': 8.7,
        'CashTipsDeclared': '',
        'NonCashTips': 0,
        'TotalGratuity': 0,
        'TotalTips': 0,
        'TipsWithheld': 0,
        'Wage': 10.5,
        'RegularHours': 1.00,
        'OvertimeHours': 1.25,
        'RegularPay': 71.74,
        'OvertimePay': 29.42,
        'TotalPay': 101.16,
        'locationId': ObjectId('5d7a670a07abc159d374413b'),
        'exportFileDate': ISODate('2019-12-15T00:00:00.000-05:00'),
      },

      /* 10 */

    ];
    // Start Loop here!
    const timerecords = [];
    data.forEach(function(item) {

      hasOverTime = false;
      regular_minutes = Math.round(moment.duration(item.RegularHours, 'hours').asMinutes());
      // Check if any overtime hours.
      if (item.OvertimeHours > 0) {
        hasOverTime = true;
        // Math.round(moment.duration(item.RegularHours, 'Hours').asMinutes())
        regular_minutes = Math.round(moment.duration(item.RegularHours, 'hours').asMinutes());
        //console.log(item.RegularHours, 'is ', regular_minutes, ' minutes');
      }

      const startDate = moment(item.InDate);
      const endDate = moment(item.OutDate);

    // Create Time Slots Array
    // Note: We Clone Start date to make sure we are stating on the 00 or 30 minute ranges.
      const range = moment.range((startDate.clone().floor(30, 'minutes')), endDate.clone().floor(30, 'minutes'));

      const timeSlots = Array.from(range.by('minutes', {step: 30})).map(m => {

        const tmpdata = {
          bucket: '', minutes: 0,
          Wage: 0,
          laborcost: 0,
          laborcostReg: 0,
          laborcostOT: 0,
          Location: '',
          LocationCode: '',
          EmployeeId: '',
          EmployeeExternalId: '',
          Employee: '',
          JobId: '',
          JobCode: '',
          JobTitle: '',
          TotalHours: 0,
          PayableHours: 0,
          RegularHours: 0,
          OvertimeHours: 0,
          RegularPay: 0,
          OvertimePay: 0,
        };
        tmpdata['bucket'] = m.format('YYYY-MM-DDTHH:mm') + '-05:00';
        return tmpdata; //m.format('YYYY-MM-DDTHH:mm') + "-05:00";
      });

    // End Create Time Slots


      let start, end;

      for (let i = 0; i <= timeSlots.length; i++) {

        if (i === 0) { //First time thru so we need to set end to startdate + floor
          start = startDate;
          end = moment(timeSlots[i + 1].bucket);

        } else if (i === timeSlots.length) {
          start = moment(timeSlots[i - 1].bucket);
          end = endDate;

        } else {
          start = moment(timeSlots[i - 1].bucket);
          end = moment(timeSlots[i].bucket);
        }

        const duration = moment.duration(end.diff(start));
        min = duration.asMinutes();
        minutes = Math.round(min);

        // Calculate Labor cost
        // We have to check if over time, If there is overtime, we will use up regular minutes first and then start using overtime minutes.
        // Toast seems to place all overtime in the last part of any hours worked.
        //

        // Check if we have any Overtime on the record
        if (hasOverTime) {
          //  console.log("Has Overtime!")
          laborCost = (minutes / 60).toFixed(2) * item.Wage;
          // We need to see if we have used up all regular minutes from time record.
          // IF we have regular minutes left, we need to use them
          if (regular_minutes > 0) {
            // Getting tricky, we need to make sure regular minutes never dip below 0
            switch (Math.sign(regular_minutes - minutes)) {
              case 0:
                // No left over minutes, so use them all on regular time.
                laborCostReg = (minutes / 60).toFixed(2) * item.Wage;
                laborCostOT = 0;
                regular_minutes = 0;
                break;
              case 1:
                // The number of regular minutes for this time period is > than the number of minutes for this interval.
                // So we need to reduce the number of regular minutes by the number of minutes.
                regular_minutes -= minutes;
                laborCostReg = (minutes / 60).toFixed(2) * item.Wage;
                laborCostOT = 0;
                text = 'Today is Sunday';
                break;
              case -1:
                // The number of regular minutes for this time period is < than the number of minutes for this interval.
                // So we need to get the number of Regular and OT Minutes.
                //
                let tempRegMinutes = minutes + (regular_minutes - minutes); // Regular minutes is minutes + the negative number from subtracting minutes from regular minutes.
                let tempOTMinutes = (regular_minutes - minutes) * -1; // OT minutes are the sum of regular minutes - minutes and then multiply by -1 to turn in to a positive number
                regular_minutes = 0; // We have used up all the regular time minutes so set it to 0
                laborCostReg = (tempRegMinutes / 60).toFixed(2) * item.Wage;
                laborCostOT = (tempOTMinutes / 60).toFixed(2) * (item.Wage * 1.5);
            }
          } else
            // No Regular time Minutes Left, so all minutes are OT
          {
            laborCostReg = 0;
            laborCostOT = (minutes / 60).toFixed(2) * (item.Wage * 1.5);
          }
        } else
          // We have no overtime, so we can just put all the minutes in regular time.
        {
          // This is just used for testing.....and to make sure we used all the minutes.
          if (regular_minutes > 0) {
            regular_minutes -= minutes; // Decrement Regular Minutes - Just testing!
          } else {
            regular_minutes = 0;
          }
          laborCostReg = (minutes / 60).toFixed(2) * item.Wage;
          laborCostOT = 0;

          //console.log("NO Overtime!")
        }
        laborCost = laborCostReg + laborCostOT;
        // End Calculate Labor Costs
        if (i < timeSlots.length) {
          timeSlots[i]['minutes'] = minutes;
          timeSlots[i]['Wage'] = item.Wage;
          timeSlots[i]['laborcost'] = laborCost;
          timeSlots[i]['laborcostReg'] = laborCostReg;
          timeSlots[i]['laborcostOT'] = laborCostOT;
          timeSlots[i]['Location'] = item.Location;
          timeSlots[i]['LocationCode'] = item.LocationCode;
          timeSlots[i]['EmployeeId'] = item.EmployeeId;
          timeSlots[i]['EmployeeExternalId'] = item.EmployeeExternalId;
          timeSlots[i]['Employee'] = item.Employee;
          timeSlots[i]['JobId'] = item.JobId;
          timeSlots[i]['JobCode'] = item.JobCode;
          timeSlots[i]['JobTitle'] = item.JobTitle;
          timeSlots[i]['TotalHours'] = item.TotalHours;
          timeSlots[i]['PayableHours'] = item.PayableHours;
          timeSlots[i]['RegularHours'] = item.RegularHours;
          timeSlots[i]['OvertimeHours'] = item.OvertimeHours;
          timeSlots[i]['RegularPay'] = item.RegularPay;
          timeSlots[i]['OvertimePay'] = item.OvertimePay;
          timeSlots[i]['regular_minutes'] = regular_minutes;
        } else {
          console.log('HIT IT!');
          timeSlots[i - 1]['minutes'] = minutes;
          timeSlots[i - 1]['Wage'] = item.Wage;
          timeSlots[i - 1]['laborcost'] = laborCost;
          timeSlots[i - 1]['laborcostReg'] = laborCostReg;
          timeSlots[i - 1]['laborcostOT'] = laborCostOT;
          timeSlots[i - 1]['Location'] = item.Location;
          timeSlots[i - 1]['LocationCode'] = item.LocationCode;
          timeSlots[i - 1]['EmployeeId'] = item.EmployeeId;
          timeSlots[i - 1]['EmployeeExternalId'] = item.EmployeeExternalId;
          timeSlots[i - 1]['Employee'] = item.Employee;
          timeSlots[i - 1]['JobId'] = item.JobId;
          timeSlots[i - 1]['JobCode'] = item.JobCode;
          timeSlots[i - 1]['JobTitle'] = item.JobTitle;
          timeSlots[i - 1]['TotalHours'] = item.TotalHours;
          timeSlots[i - 1]['PayableHours'] = item.PayableHours;
          timeSlots[i - 1]['RegularHours'] = item.RegularHours;
          timeSlots[i - 1]['OvertimeHours'] = item.OvertimeHours;
          timeSlots[i - 1]['RegularPay'] = item.RegularPay;
          timeSlots[i - 1]['OvertimePay'] = item.OvertimePay;
          timeSlots[i - 1]['regular_minutes'] = regular_minutes;
        }


      }
      // console.log(timeSlots);
      timerecords.push(...timeSlots);
    });
    console.log(timerecords);

return timerecords
};
