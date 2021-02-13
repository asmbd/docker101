class MySQLModel {
    constructor(db, tableName) {
        this.db = db;
        this.tableName = tableName;
    }

    async create(data) {
        const objectKeys = Object.keys(data);
        const objectValues = Object.values(data);
        const columnNames = objectKeys.join(',')
        const rowValues = objectValues.map(() => '?').join(',');
        const sql = `INSERT INTO \`${this.tableName}\` (${columnNames}) VALUES (${rowValues})`;
        const result = await this.db.pool.query(sql, objectValues);
        return result;
    }

    async find(filter = {}, columns = ['*'], order = "ASC") {
        const orderer = "id"
        const selectColumn = (columns[0] === "*" ? "*" : `(${columns.join(",")})`);
        const objectKeys = Object.keys(filter)
        const objectValues = Object.values(filter)
        const queryCondition = objectKeys.map((key, index) => `${key} = \'${objectValues[index]}\'`).join(" AND ")
        const sql = `SELECT ${selectColumn} FROM \`${this.tableName}\`${objectKeys.length > 0 ? ` WHERE ${queryCondition}`: ""} ORDER BY ${orderer} ${order}`;
        const [rows] = await this.db.pool.query(sql);
        return rows;
    }

    async delete(filter) {
        const objectKeys = Object.keys(filter)
        const objectValues = Object.values(filter)
        const queryCondition = objectKeys.map((key, index) => `${key} = \'${objectValues[index]}\'`).join(" AND ")
        const sql = `DELETE FROM \`${this.tableName}\` WHERE ${queryCondition}`;
        const response = await this.db.pool.query(sql);
        return response
    }
}

module.exports = MySQLModel;