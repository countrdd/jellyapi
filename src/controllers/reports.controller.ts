import {property, repository} from '@loopback/repository';
import {get, HttpErrors, param} from '@loopback/rest';
import {inject} from '@loopback/context';
import {MongoDataSource} from '../datasources';
import {LocationRepository, OrderDetailsRepository, TimeEntriesRepository} from '../repositories';
import {MailerServiceBindings} from '../keys';
import {MailerService} from '../services';
import array = property.array;
const _ = require('lodash');
const jellyutils = require('jellyutils');
const {convertArrayToCSV} = require('convert-array-to-csv');
const {ObjectId} = require('mongodb');
const moment = require('moment');

export class ReportsController {


  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @inject(MailerServiceBindings.SEND_MAIL) public mailerService: MailerService,
    @repository(OrderDetailsRepository)
    public rolesRepository: OrderDetailsRepository,
    @repository(LocationRepository)
    public locationRepository: LocationRepository,
    @repository(TimeEntriesRepository)
    public timeEntriesRepository: TimeEntriesRepository,
  ) {
  }

  @get('/reports/employeesales', {
    responses: {
      '200': {
        description: 'Sales Report',
        content: {'application/json': array},
      },
    },
  })
  async employeesales(
    @param.query.string('startdate') startdate: string,
    @param.query.string('enddate') enddate: string,
    @param.query.string('locations') locations?: string,
    @param.query.string('emailAddress') emailAddress?: string,
    @param.query.boolean('emailReport') emailReport?: boolean,
    @param.query.string('groupId') groupId?: string,
    //  @param.query.object('where', getWhereSchemaFor(OrderDetails)) where?: Where<any>,
  ): Promise<any> {

    if (!this.rolesRepository.dataSource.connected) {
      await this.rolesRepository.dataSource.connect();
    }

    const test = (this.rolesRepository.dataSource
      .connector as any).collection('OrderDetails');

    // We have to split and convert locations to an array for the $Match Below.
    const _locations = [];
    //Check if GroupID was sent, then if it was get all locaitons Id's for the group.
    if (groupId) {
      for (const key of await this.getLocations(groupId)) {
        _locations.push(new ObjectId(key.id));
      }
    }
    // Check if Locations send, if so add them to the locations file.
    if (locations) {
      for (const key of locations.split(',')) {
        _locations.push(new ObjectId(key));
      }
    }

    //console.log('Locations:', _locations);


    const myAgg = [

      {
        $match: {
          $and: [{
            Opened: {
              $gte: new Date(startdate),
              $lte: new Date(enddate),
            },
          },
            Object.assign(
              (_locations)
                ? {
                  'locationId': (_locations instanceof Array)
                    ? {'$in': _locations} : _locations,
                }
                : {},
            ),
            // {locationId: { "$in": _locations },},
          ],
        },
      }, {
        $addFields: {
          Server1: {
            $trim: {
              input: {
                $concat: [{
                  $arrayElemAt: [{
                    $split: ['$Server', ' '],
                  }, 1],
                }, ', ', {
                  $arrayElemAt: [{
                    $split: ['$Server', ' '],
                  }, 0],
                }],
              },
            },
          },
        },
      }, {
        $lookup: {
          from: 'ItemSelectionDetails',
          'let': {
            'order_id': '$OrderId',
          },
          pipeline: [{
            $match: {
              $expr: {
                $and: [{
                  $eq: ['$OrderId', '$$order_id'],
                }],
              },
            },
          }, {
            $group: {
              _id: {
                Server: '$Server',
                OrderId: '$OrderId',
                MenuItem: '$MenuItem',
              },
              MenuItem: {
                $first: '$MenuItem',
              },
              NumberOfGuests: {
                $first: '$NumberofGuests',
              },

              NumberOfChecks: {
                $size: {$split: ['$first.Checks', ',']}
              },
              MenuGroup: {
                $first: '$MenuGroup',
              },
              ItemId: {
                $first: '$ItemId',
              },
              OrderNumber: {
                $first: '$OrderNumber',
              },
              TotalGrossPrice: {
                $sum: '$GrossPrice',
              },
              TotalDiscnt: {
                $sum: '$Discnt',
              },
              TotalNetPrice: {
                $sum: '$NetPrice',
              },
              TotalQty: {
                $sum: '$Qty',
              },
              Server: {
                $first: '$Server',
              },
              ItemQtyVoided: {
                $sum: {
                  $cond: [{
                    $and: [{
                      $eq: ['$Void?', 'true'],
                    }],
                  }, 1, 0],
                },
              },
              SalesCategory: {
                $first: '$SalesCategory',
              },
            },
          }],
          as: 'items',
        },
      }, {
        $unwind: {
          path: '$items',
          preserveNullAndEmptyArrays: true,
        },
      }, {
        $lookup: {
          from: 'ModifiersSelectionDetails',
          'let': {
            'order_Id': '$OrderId',
            'item_Id': '$items.ItemId',
          },
          pipeline: [{
            $match: {
              $expr: {
                $and: [{
                  $eq: ['$OrderId', '$$order_Id'],
                }, {
                  $eq: ['$ParentMenuSelectionItemID', '$$item_Id'],
                }],
              },
            },
          }, {
            $group: {
              _id: {
                OrderId: '$OrderId',
                Modifier: '$Modifier',
                OptionGroupName: '$OptionGroupName',
              },
              Item: {
                $first: '$ParentMenuSelection',
              },
              OrderNumber: {
                $first: '$OrderNumber',
              },
              Modifier: {
                $first: '$Modifier',
              },
              OptionGroupName: {
                $first: '$OptionGroupName',
              },
              OrderDate: {
                $first: '$OrderDate',
              },
              TotalQty: {
                $sum: '$Qty',
              },
              Server: {
                $first: '$Server',
              },
              SalesCategory: {
                $first: '$SalesCategory',
              },
            },
          }, {
            $project: {
              _id: 1,
              Item: 1,
              OrderNumber: 1,
              OrderDate: 1,
              Size: 1,
              TotalQty: 1,
              Server: 1,
              SalesCategory: 1,
            },
          }],
          as: 'modifiers',
        },
      }, {
        $group: {
          _id: {
            Server: '$Server',
            OrderId: '$OrderId',
          },
          ServerId: {
            $first: '$Server1',
          },
          Location: {
            $first: '$Location',
          },
          TotalSales: {
            $first: '$Amount',
          },
          TotalTax: {
            $first: '$Tax',
          },
          TotalDisNetPriceAmount: {
            $first: '$DisNetPriceAmount',
          },
          Voided: {
            $first: '$Voided',
          },
          TotalTips: {
            $first: '$Tip',
          },
          AlcoholBeverage: {
            $sum: {
              $cond: [{
                $or: [{
                  $eq: ['$items.MenuGroup', 'Draft Beer'],
                }, {
                  $eq: ['$items.MenuGroup', 'Liquor'],
                }, {
                  $eq: ['$items.MenuGroup', 'Bottled Beer'],
                }],
              }, {
                $subtract: ['$items.TotalQty', '$items.ItemQtyVoided'],
              }, 0],
            },
          },
          NABeverages: {
            $sum: {
              $cond: [{
                $and: [{
                  $eq: ['$items.SalesCategory', 'NA Beverages'],
                }],
              }, {
                $subtract: ['$items.TotalQty', '$items.ItemQtyVoided'],
              }, 0],
            },
          },
          ItemsVoided: {
            $sum: '$items.ItemQtyVoided',
          },
          OrdersVoided: {
            $sum: {
              $cond: [{
                $eq: ['$Voided', 'true'],
              }, 1, 0],
            },
          },
          items: {
            $push: '$items',
          },
          modifiers: {
            $push: '$modifiers',
          },
        },
      }, {
        $group: {
          _id: {
            Server: '$_id.Server',
          },
          ServerId: {
            $first: '$ServerId',
          },
          Location: {
            $first: '$Location',
          },
          NetPrice: {
            $sum: 1,
          },
          TotalSales: {
            $sum: '$TotalSales',
          },
          TotalDisNetPrices: {
            $sum: '$TotalDisNetPriceAmount',
          },
          TotalTax: {
            $sum: '$TotalTax',
          },
          TotalTips: {
            $sum: '$TotalTips',
          },
          TotalAlchoholBeverages: {
            $sum: '$AlcoholBeverage',
          },
          TotalNABeverages: {
            $sum: '$NABeverages',
          },
          NumberofOrdersWithoutBeverages: {
            $sum: {
              $cond: [{
                $and: [{
                  $eq: ['$$ROOT.NABeverages', 0],
                }, {
                  $eq: ['$$ROOT.AlcoholBeverage', 0],
                }, {
                  $eq: ['$$ROOT.Voided', 'false'],
                }],
              }, 1, 0],
            },
          },
          TotalOrdersVoided: {
            $sum: '$OrdersVoided',
          },
          TotalItemsVoided: {
            $sum: '$ItemsVoided',
          },
          items: {
            $push: '$items',
          },
          modifiers: {
            $push: '$modifiers',
          },
        },
      }, {
        $project: {
          _id: 0,
        },
      }, {
        $sort: {
          ServerId: 1,
        },
      }, {
        $lookup: {
          from: 'TimeEntries',
          'let': {
            server: '$ServerId',
            location: '$Location',
          },
          pipeline: [{
            $match: {
              $expr: {
                $and: [{
                  $gte: ['$InDate', new Date(startdate)],
                }, {
                  $lte: ['$InDate', new Date(enddate)],
                }, {
                  $eq: ['$Location', '$$location'],
                }, {
                  $eq: ['$Employee', '$$server'],
                }],
              },
            },
          }],
          as: 'shifts',
        },
      }, {
        $project: {
          ServerId: 1,
          Location: 1,
          TotalShifts: {
            $size: '$shifts',
          },
          'Total Orders': 1,
          TotalSales: {$round: ['$TotalSales', 2]},
          TotalDisNetPrices: {$round: ['$TotalDisNetPrices', 2]},
          TotalTax: 1,
          TotalTips: {$round: ['$TotalTips', 2]},
          TippedPercent: {
            $cond: {
              'if': {
                $gt: ['$TotalSales', 0],
              },
              then: {
                $round: [{
                  $multiply: [{
                    $divide: ['$TotalTips', '$TotalSales'],
                  }, 100],
                }, 2],

              },
              'else': '0',
            },
          },
          TotalAlchoholBeverages: 1,
          TotalNABeverages: 1,
          NumberofOrdersWithoutBeverages: 1,
          TotalOrdersVoided: 1,
          TotalItemsVoided: 1,
          //  shifts: 1
        },
      }];
    const docs = await test.aggregate(myAgg, {
      'allowDiskUse': true,
    }).toArray();


    //console.log(docs);
    const csvFromArrayOfObjects = await convertArrayToCSV(docs);
    // console.log(csvFromArrayOfObjects);
    if (emailReport) {
      const mailOptions = {
        from: 'reports@jellyfortoast.com',
        to: 'NetPricerdd@leillc.net',
        subject: 'test',
        html: 'adjsfkjsdfkjasdfkjasdkfjasdkfjkdsjfj',
        attachments: [{
          filename: 'employeesalesreport.csv',
          content: csvFromArrayOfObjects,
        }],
      };

      await this.mailerService.sendMail(mailOptions)
        .then(function(data) {
          return {message: `Successfully sent reset mail `};
        }).catch(function(data) {
          throw new HttpErrors.UnprocessableEntity(`Error in sending E-mail `);
        });

    }
    return docs; //{docs,...{_locations}}
  }

  /********* Labor/Sales Report
   *
   */
  @get('/reports/laborcost', {
    responses: {
      '200': {
        description: 'Sales Report',
        content: {'application/json': array},
      },
    },
  })
  async laborcost(
    @param.query.string('startdate') startdate: string,
    @param.query.string('enddate') enddate: string,
    @param.query.string('locations') locations?: string,
    @param.query.string('emailAddress') emailAddress?: string,
    @param.query.boolean('emailReport') emailReport?: boolean,
    @param.query.string('groupId') groupId?: string,
    //  @param.query.object('where', getWhereSchemaFor(OrderDetails)) where?: Where<any>,
  ): Promise<any> {
    if (!this.rolesRepository.dataSource.connected) {
      await this.rolesRepository.dataSource.connect();
    }

    const salesdb = (this.rolesRepository.dataSource
      .connector as any).collection('OrderDetails');
    const labordb = (this.timeEntriesRepository.dataSource
      .connector as any).collection('TimeEntries');

    // We have to split and convert locations to an array for the $Match Below.
    const _locations = [];
    // Check for Date Range -- If not range set to previous day
    startdate = await this.checkStartDate(startdate);
    enddate = await this.checkEndDate(enddate);
    //console.log(startdate, ' - ', enddate);

    //Check if GroupID was sent, then if it was get all locaitons Id's for the group.
    //console.log('8-8-8-8: ', groupId);
    if (groupId) {
      for (const key of await this.getLocations(groupId)) {
        _locations.push(new ObjectId(key.id));
      }
    }
    //console.log(locations);
    // Check if Locations send, if so add them to the locations file.
    if (locations) {
      for (const key of locations.split(',')) {
        _locations.push(new ObjectId(key));
      }
    }

    // Set Time Periods -- Eventually this will be pulled from a databasebase table based on the Tenant/Group/Location
    const periods = [
      {category: 'Pre-Open', start: '08:00:00', end: '10:59:00'},
      {category: 'Lunch', start: '11:00:00', end: '13:29:00'},
      {category: 'Afternoon', start: '13:30:00', end: '16:59:00'},
      {category: 'Dinner', start: '17:00:00', end: '20:59:00'},
      {category: 'Late Night', start: '21:00:00', end: '23:59:00'},
      {category: 'AfterHours', start: '02:00:00', end: '07:59:00'}];

    const salesAgg = [
      {
        $match: {
          '$and': [
            {
              'Opened': {
                $gte: new Date(startdate),
                $lte: new Date(enddate),
              },
            },
            Object.assign(
              (_locations)
                ? {
                  'locationId': (_locations instanceof Array)
                    ? {'$in': _locations} : _locations,
                }
                : {},
            ),

          ],
        },
      },
      {
        $lookup: {

          from: 'ItemSelectionDetails',
          let: {order_Id: '$OrderId', item_Id: '$ItemId'},
          pipeline: [

            {
              $match:
                {
                  $expr:
                    {
                      $and:
                        [
                          {$eq: ['$OrderId', '$$order_Id']},
                          // { $eq: ["$ParentMenuSelectionItemID", "$$item_Id"] }
                        ],
                    },
                },
            },
            /*   {
                 '$group':
                   {
                     //"_id": { "OrderId": "$OrderId", "ItemId": "$ItemId", "Server": "$Server" },
                     // Need to take into acNetPrice multiple dates and locations.
                     // So need to add Location - Date To the Group By
                     '_id': {
                       hour: {$hour: {date: '$SentDate', timezone: '-04:00'}}, minute: {$minute: '$SentDate'},
                       Service: '$Service', DiningOption: '$DiningOption',
                     },
                     //  "_id": {"Hour": { $hour: {date : "$SentDate", timezone : "-04:00"}} },
                     'SentDate': {'$first': '$SentDate'},
                     'Service': {'$first': '$Service'},
                     'DiningOption': {'$first': '$DiningOption'},
                     'ItemsperHour': {'$sum': 1},
                     'NetPriceperHour': {'$sum': '$NetPrice'},
                     'DiscntperHour': {'$sum': '$Discnt'},
                   },
               },
               {
                 '$group':
                   {
                     '_id': 'average',
                     'data': {
                       '$push': {
                         '_id': '$_id',
                         'Hour': '$_id.hour',
                         'Minute': '$_id.minute',
                         'ItemsperHour': '$ItemsperHour',
                         'NetPriceperHour': '$NetPriceperHour',
                         'DiscntperHour': '$DiscntperHour',
                         'Date': '$date',
                         'Service': '$Service',
                         'DiningOption': '$DiningOption',
                       },
                     },
                   },
               },
               {
                 '$project':
                   {'all': {'$concatArrays': ['$data']}},
               },
               {'$unwind': '$all'},
               {'$replaceRoot': {'newRoot': '$all'}},
   */
          ],
          as: 'item',

        },

      },
      {'$unwind': '$item'},
      {
        '$project': {
          '_id': 1,
          'Location': 1,
          'locationId': 1,
          'Opened': 1,
          'Server': 1,
          'Checks': 1,
          'CheckId': '$item.CheckId',
          'RevenueCenter': 1,
          'Service': 1,
          'Amount': 1,
          'Tax': 1,
          'Tip': 1,
          'Total': 1,
          'NumberofGuests': '$$ROOT.NumberofGuests',
          'NumberOfChecks': {
            $size: {$split: ['$$ROOT.Checks', ',']}
          },
          'Voided': 1,
          'SentDate': '$item.SentDate',
          'OrderDate': '$item.OrderDate',
          'DiningOption': '$item.DiningOption',
          'MenuItem': '$item.MenuItem',
          'MenuSubGroups': '$item.MenuSubgroups',
          'MenuGroup': '$item.MenuGroup',
          'Menu': '$item.Menu',
          'SalesCategory': '$item.SalesCategory',
          'GrossPrice': '$item.GrossPrice',
          'Discnt': '$item.Discnt',
          'NetSales': '$item.NetPrice',
          'Qty': '$item.Qty',
          'ItemTax': '$item.Tax',
          'ItemVoided': '$item.Void',
        },
      },
      /*
      {'$replaceRoot': {'newRoot': '$item'}},
      {$sort: {Hour: 1, Minute: 1}},
      {
        '$project':
          {'_id': 0},
      }, */
    ];

    const laborAgg = [

      {

        $match: {
          '$and': [
            {
              'InDate': {
                $gte: new Date(startdate),
                $lte: new Date(enddate),
              },
            },
            Object.assign(
              (_locations)
                ? {
                  'locationId': (_locations instanceof Array)
                    ? {'$in': _locations} : _locations,
                }
                : {},
            ),

          ],
        },

      },

    ];
    /*
    // Get Sales Data and Generate Chart Data
     */
    const sales = await salesdb.aggregate(salesAgg, {
        'allowDiskUse': true,
      },
    ).toArray().then((data: any) => {
      data.forEach((result: any) => {
        result.timePeriod = jellyutils.getTimePeriodfromISODate(result.SentDate);
      });
      return data;
    });

    /*
    // Group and Sort Sales Data
    */
    //console.log(sales)

    const salesgroupKeys = ['locationId', 'Location', 'timePeriod'];
    const salessumKeys = ['NetSales', 'Qty'];
    const timeperiods = ([...new Set(periods.map((item: {category: any;}) => item.category))]);

    /*
    // Group and Sort Data
     */
    const salesData = jellyutils.group(sales, salesgroupKeys, salessumKeys);
    salesData.sort((a: {Location: string; timePeriod: string;}, b: {Location: string; timePeriod: string;}) => {
        return a.Location.localeCompare(b.Location) || timeperiods.indexOf(a.timePeriod).toString().localeCompare(timeperiods.indexOf(b.timePeriod).toString());
      },
    );
    /*
    /* Generate the Chart Data
     */
    // @ts-ignore
    const salesChartData = await jellyutils.generateChartData(salesData, 'timePeriod', 'Location', 'NetSales', timeperiods);

    /*
       // Get Labor Data and Generate Chart Data
     */
    const labor = await labordb.aggregate(laborAgg, {
      'allowDiskUse': true,
    }).toArray().then((data: any) => {
      return jellyutils.generateLaborCosts(data);
    });

    const laborgroupKeys = ['locationId', 'Location', 'timePeriod'];
    const laborsumKeys = ['laborhours', 'laborcost', 'laborcostReg', 'laborcostOT'];
    //const newLabor = await jellyutils.generateLaborCosts(...{labor});
    let laborData = jellyutils.group(labor, laborgroupKeys, laborsumKeys);
    laborData.sort((a: {Location: string; timePeriod: string;}, b: {Location: string; timePeriod: string;}) => {
        return a.Location.localeCompare(b.Location) || timeperiods.indexOf(a.timePeriod).toString().localeCompare(timeperiods.indexOf(b.timePeriod).toString());
      },
    );
    /*
  /* Generate the Chart Data
   */
    // @ts-ignore
    const laborChartData = await jellyutils.generateChartData(laborData, 'timePeriod', 'Location', 'laborhours', timeperiods)

    /*
      // Put all the Sales and Labor Data into an array by location/Time Period
     */

    /*
    / We are going to combine the sales data and labor data into one object, this is what is used to generate chart data
     */
    // @ts-ignore
    var arrResult = _.map(laborData, function(obj) {
      return _.assign(obj, _.find(salesData, {
        Location: obj.Location,
        timePeriod: obj.timePeriod,
      }));
    });
    /*
    / Now are are going to do our calculations
      We are adding LaborCot and Productivity to each period for graphing purposes
     */
    arrResult.forEach(function(item: any){
      //console.log(item.title); // to print each of the titles
      item["laborCostPercent"] = "yourImage.jpg"; // will add to each item the image
      if (!item.NetSales || item.NetSales < 0 ) {
        // We have no sales data for this period, so the labor cost percentage is 100, and the Produtivity is 0.
        item["laborCostPercent"] = 100;
        item["laborProdcutivty"] = 0;
        item["avgGuestCheck"] = 0;
      }
      else {
        item["laborCostPercent"] = (item.laborcost / item.NetSales) * 100;
        item["laborProductivty"] = (item.NetSales / item.laborhours);
        item["avgGuestCheck"] = 0;
      }

      // ... do any other item specific operation
    });
    // Lets add laborCost and Productivty to the records.
   // console.log(arrResult);

    const csvSales = await convertArrayToCSV(arrResult);
    //console.log(csvSales)


    /***********
     * Email Report if Requested.
     */
    if (emailReport) {
      const mailOptions = {
        from: 'reports@jellyfortoast.com',
        to: 'NetPricerdd@leillc.net',
        subject: 'test',
        html: 'adjsfkjsdfkjasdfkjasdkfjasdkfjkdsjfj',
        attachments: [{
          filename: 'employeesalesreport.csv',
          content: csvSales,
        }],
      };

      await this.mailerService.sendMail(mailOptions)
        .then(function(data) {
          return {message: `Successfully sent reset mail `};
        }).catch(function(data) {
          throw new HttpErrors.UnprocessableEntity(`Error in sending E-mail `);
        });

    }
    return {...{arrResult}, ...{laborChartData}, ...{salesChartData}}; //{docs,...{_locations}}
  }


  /******** Labor Sales Report
   * @param groupID
   * This function is used to get locationId's for a groupId sent.
   */

  async getLocations(groupID: string) {
    const data = await this.locationRepository.find({
      where: {
        groupId: ObjectId(groupID),
      },
    });
    //console.log(data);
    const locs = [];
    for (const key of data) {
      locs.push(new ObjectId(key.id));
    }
    //console.log(locs);
    return locs;

  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTimePeriod(hour: any, minute: any) {
    const timeString = hour + ':' + minute + ':00';
    /************
     * Time Periods - Hardcoded for now...
     * 8 to 11      (03:59 to 10:59)
     11:00 to 1:30 (11:00 to 13:29)
     1:30 to 5:00 (13:29 to 16:59)
     5:00 to 9:00 (17:00 to 20:59)
     9:00 to Close. (4:00) (21:00 to 03:59)
     */
    const tCat = [
      {category: 'Pre-Open', start: '08:00:00', end: '10:59:00'},
      {category: 'Lunch', start: '11:00:00', end: '13:29:00'},
      {category: 'Afternoon', start: '13:30:00', end: '16:59:00'},
      {category: 'Dinner', start: '17:00:00', end: '20:59:00'},
      {category: 'Late Night', start: '21:00:00', end: '23:59:00'},
      {category: 'Late Night', start: '00:00:00', end: '01:59:00'},
      {category: 'AfterHours', start: '02:00:00', end: '07:59:00'},

    ];
    let timeCategory = 'Undefined Period';
    const timeFormat = 'HH:mm:ss';
    for (const key of tCat) {
      if (
        moment(timeString, timeFormat).isBetween(moment(key.start, timeFormat), moment(key.end, timeFormat)) ||
        moment(timeString, timeFormat).isSame(moment(key.start, timeFormat)) ||
        moment(timeString, timeFormat).isSame(moment(key.end, timeFormat))
      ) {
        timeCategory = key.category;
        break;
      }

    }

    return timeCategory;
  }



  async checkStartDate(startdate: string) {
    if (!startdate) {
      //console.log('No Start Date');
      const setStartDate = new Date();
      setStartDate.setDate(setStartDate.getDate() - 1);
      setStartDate.setHours(4);
      setStartDate.setMinutes(0);
      setStartDate.setSeconds(0);
      startdate = moment(setStartDate, 'DD/MM/YYYY', true).format();
    }
    return startdate;
  }

  async checkEndDate(enddate: string) {
    if (!enddate) {
      //console.log('No End Date');
      const setEndDate = new Date();
      // setEndDate.setDate(setEndDate.getDate())
      setEndDate.setHours(3);
      setEndDate.setMinutes(59);
      setEndDate.setSeconds(59);
      enddate = moment(setEndDate, 'DD/MM/YYYY', true).format();
    }
    return enddate;
  }


}
