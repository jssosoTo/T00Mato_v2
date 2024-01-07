export default (str: string) => {
  if (str === 'in a month') return '还剩 1 月';
  if (str === 'in a day') return '还剩 1 天';
  if (str === 'in a hour') return '还剩 1 小时';
  if (str === 'a month ago') return '已过去 1 月';
  if (str === 'a day ago') return '已过去 1 天';
  if (str === 'a hour ago') return '已过去 1 小时';
  if (str.startsWith('in') && str.endsWith('hours'))
    return '还剩 ' + str.split(' ')[1] + ' 小时';
  if (str.endsWith('months ago')) return '已过去 ' + str.split(' ')[0] + ' 月';
  if (str.endsWith('hours ago')) return '已过去 ' + str.split(' ')[0] + ' 小时';
  if (str.endsWith('days ago')) return '已过去 ' + str.split(' ')[0] + ' 天';
  if (str.startsWith('in') && str.endsWith('days'))
    return '还剩 ' + str.split(' ')[1] + ' 天';
  return str.toUpperCase();
};
