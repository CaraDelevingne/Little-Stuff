// 算计两个时间段之间的交集值
const moment = require('./moment.js')

const startDates = ['2019-04-10', '2019-04-12']
const endDates = ['2019-04-15', '2019-04-20']

const startDates1 = ['2019-04-10', '2019-04-09']
const endDates2 = ['2019-04-10', '2019-04-12']


const overlapDays = (startArr, endArr) => {
  const latestStartDate = moment.max(moment(startArr[0]), moment(startArr[1]))
  const earliestEndDate = moment.min(moment(endArr[0]), moment(endArr[1]))

  let overlap  = moment(earliestEndDate).diff(latestStartDate, 'days') + 1

  if (overlap < 0) {
    overlap = 0
  }

  return overlap
}

console.log('交集为 4 天') 
console.log(overlapDays(startDates, endDates))
console.log('被包含 1 天') 
console.log(overlapDays(startDates1, endDates2))
console.log('交集 2 天') 
console.log(overlapDays(['2019-04-12', '2019-04-13'], ['2019-04-15', '2019-04-14']))
console.log('没有交集') 
console.log(overlapDays(['2019-04-12', '2019-04-16'], ['2019-04-15', '2019-04-20']))
console.log('包含 6 天') 
console.log(overlapDays(['2019-04-10', '2019-04-12'], ['2019-04-20', '2019-04-17']))

