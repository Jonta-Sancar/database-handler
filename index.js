import db_handler from './config/db_handler.js';
import FUNTIONS   from './config/functions.js';
import CRUD       from './crud/crud.js';

const DBH = {
  ...db_handler,
  ...FUNTIONS,
  ...CRUD
};

export default DBH;