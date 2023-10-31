import INSERT from './insert.js';
import UPDATE from './update.js';
import DELETE from './delete.js';
import SELECT from './select.js';

const CRUD = {...INSERT, ...DELETE, ...SELECT, ...UPDATE};

export default CRUD;