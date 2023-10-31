import BC         from './extensions/bcrypt.js';
import getDate    from './extensions/get_date_in_SQL_format.js';
import db_handler from './config/db_handler.js';
import FUNTIONS   from './config/functions.js';
import CRUD       from './crud/crud.js';

const DBH = {
  ...BC,
  getDate: getDate.getDateInSQLFormat,
  ...db_handler,
  ...FUNTIONS,
  ...CRUD
};

export default DBH;