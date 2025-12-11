const moment = require('moment')
const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler')

module.exports.overview = async function (req, res) {
  try {
    const allOrders = await Order.find({ user: req.user.id }).sort(1)
    const ordersMap = getOrdersMap(allOrders)
    const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [] //от текущего (moment()) дня вычитаем -1
    
    const yesterdayOrdersNumber = yesterdayOrders.length //кол-во заказов вчера
    const totalOrdersNumber = allOrders.length //кол-во заказов
    const daysNumber = Object.keys(ordersMap).length; //кол-во дней всего
    const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0); //заказов в день
    const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2); //процент для кол-ва заказов ((заказов вчера / кол-во заказов в день) -1) * 100
    const totalGain = calculatePrice(allOrders); //общая выручка
    const gainPerDay = totalGain / daysNumber; //выручка в день
    const yesterdayGain = calculatePrice(yesterdayOrders); //выручка за вчера
    const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2); //процент для кол-ва заказов ((выручка за вчера / выручка в день) -1) * 100
    const compareGain = (yesterdayGain - gainPerDay).toFixed(2) //сравнение выручки
    const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2) //сравнение кол-ва заказов
    
    res.status(200).json({
      gain: {
        percent: Math.abs(+gainPercent),
        compare: Math.abs(+compareGain),
        yesterday: +yesterdayGain,
        isHigher: +gainPercent > 0
      },
      orders: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+compareNumber),
        yesterday: +yesterdayOrdersNumber,
        isHigher: +ordersPercent > 0
      }
    })
  }
  catch(err) {
    errorHandler(res, err)
  }
}

module.exports.analytics = function (req, res) {
  
};

function getOrdersMap(orders = []) {
  const daysOrders = {}
  orders.forEach(order => {
    const date = moment(order.date).format('DD.MM.YYYY')
    
    if (date === moment().format('DD.MM.YYYY')) { //если дата заказа равна текущей дате
      return 
    }
    if (!daysOrders[date]) {
      daysOrders[date] = []
    }
    
    daysOrders[date].push(order)
    
  })
 
  return daysOrders;
}

function calculatePrice(orders = []) {
  return orders.reduce((total, order) => {
    const orderPrice = order.list.reduce((orderTotal, item) => {
      return orderTotal += item.cost * item.quantity
    }, 0)
    
    return total += orderPrice
  }, 0)
}