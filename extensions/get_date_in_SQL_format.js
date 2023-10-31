const DATETIME = 'DATETIME';
const month    = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

function getDateInSQLFormat(format) {
  const now = new Date();

  const Y = now.getFullYear();
  const m = month[now.getMonth()];
  const d = now.getDate();
  const H = now.getHours();
  const i = now.getMinutes();
  const s = now.getSeconds();

  const date = `${Y}-${m}-${d}`;
  const time = `${H}:${i}:${s}`;

  if (format == DATETIME)
    return date + ' ' + time;
  else
    return date;
}

export default { getDateInSQLFormat };