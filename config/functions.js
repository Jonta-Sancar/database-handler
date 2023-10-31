const functions = {
  /**
   * 
   * @param {(String|String[])} condition this parameter can be a String or an Array. If it is a String, nothing changes, but if it is an array, backticks are applied and the format Array[0] = Array[1].
   * @returns {String} the condition in SQL format
   */
  returnOnCondition(condition){
    let condition_txt = '';
  
    if(Array.isArray(condition)){
      condition_txt = this.makeStructureName(condition[0]) + " = " + this.makeStructureName(condition[1]);
    } else {
      condition_txt = condition;
    }
    
    return condition_txt;
  },
  
  /**
   * 
   * @param {String[]} conditions the array of conditions to apply in your SQL.
   * @returns {String} an object with the 'WHERE' conditions in SQL format and an array with the values to be applied in SQL 
   */
  returnWhere(conditions){
    let where_arr    = [];
    let values_where = []
  
    conditions.forEach(condition => {
      let condition_txt = '';
      if(Array.isArray(condition)){
        condition_txt = this.makeStructureName(condition[0]) + " = ?";
  
        values_where.push(condition[1]);
      } else {
        condition_txt = condition;
      }
  
      where_arr.push(condition_txt);
    });
  
    const where_txt = where_arr.join(' AND ');
  
    return {where_txt, values_where};
  },
  
  /**
   * 
   * @param {String} structure_name the name of your database structures, such as table names and column names, but when these names have the SQL AS command
   * @returns {String} the names of structures in SQL format
   */
  adjustAs(structure_name){
    if(structure_name.indexOf(' ') >= 0 && structure_name.indexOf(' AS ') < 0 && structure_name.indexOf(' as ') < 0){
      structure_name = structure_name.split(' ').join(' AS ');
    }
  
    if (structure_name.indexOf(' as ') >= 0 || structure_name.indexOf(' AS ') >= 0){
      let structures = [];
  
      if(structure_name.indexOf(' as ') >= 0){
        structures = structure_name.split(' as ');
      } else {
        structures = structure_name.split(' AS ');
      }
  
      structures = structures.map(structure=>{
        structure = this.adjustDot(structure);
        
        if(structure.indexOf('`') >= 0){
          return structure;
        } else {
          return "`" + structure + "`";
        }
      });
  
      return structures.join(' AS ');
    } else {
      return structure_name;
    }
  },
  
  /**
   * 
   * @param {String} structure_name the name of your database structures, such as table names and column names, but when these names have the dot, such as: `table`.`column`  
   * @returns {String} the names of structures in SQL format
   */
  adjustDot(structure_name){
    if(structure_name.indexOf('.') >= 0 && structure_name.indexOf('`') < 0){
      let structures = structure_name.split('.');
  
      structures = structures.map(structure=>{
        if(structure.indexOf('*') >= 0 || structure.indexOf('(') >= 0 || structure.indexOf(')') >= 0){
          return structure;
        }
  
        return "`" + structure + "`";
      });
  
      return structures.join('.');
    }
  
    return structure_name;
  },
  
  /**
   * 
   * @param {String} structure_name the name of your database structures, such as table names and column names. 
   * @returns {String} the names of structures in SQL format
   */
  makeStructureName(structure_name){
    let next = true;
    let conditions = ["`", "'", " =", "= "];
  
    conditions.forEach(condition=>{
      if(structure_name.indexOf(condition) >= 0){
        next = false;
      }
    });
  
    if(next){
      structure_name = this.adjustAs(structure_name);
      
      let new_structure_name = this.adjustDot(structure_name);
      
      return new_structure_name;
    } else {
      return structure_name;
    }
  }
}

export default functions;