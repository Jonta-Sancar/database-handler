const UPDATE = {
  /**
   * 
   * @param {String} table The name of the table in which the records will be edited
   * @param data The object where the table columns are the properties and the data to be defined are the values of this properties
   * @param {String} data.table_column_1 Data object properties are named according to the names of the columns in your database table and contain the value to be added to the respective column
   * @param {String} data.table_column_2 Data object properties are named according to the names of the columns in your database table and contain the value to be added to the respective column
   * @param {String} data.table_column_... Data object properties are named according to the names of the columns in your database table and contain the value to be added to the respective column
   * @param {string[]} conditions The parameters to filter the record to be edited
   * @returns the result of the SQLExec function.
   */
  async UPDATE(table, data, conditions) {
    let set_arr = [];
    let values_arr = [];

    for (let column in data) {
      const value = data[column];

      const set = this.makeStructureName(column) + " = ?";

      set_arr.push(set);
      values_arr.push(value);
    }

    const { where_txt, values_where } = this.returnWhere(conditions);

    values_arr.push(...values_where);

    const set_txt = set_arr.join(', ');

    const SQL = "UPDATE " + this.makeStructureName(table) + " SET " + set_txt + " WHERE " + where_txt;

    return await this.SQLExec([SQL, values_arr]);
  }
};

export default UPDATE;