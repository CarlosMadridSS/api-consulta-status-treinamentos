const sequelize = require("../database/init");


async function WhatMyAttributesTable (table){
    const attributes = await sequelize.getQueryInterface().describeTable(table.getTableName());

    const valuesToRemove = ['createdAt', 'updatedAt']

    let filteredAttributes = []

    for (keys in attributes) {
        filteredAttributes.push(keys)
    }

    if (filteredAttributes.length > 0){
        filteredAttributes = filteredAttributes.filter(item => !valuesToRemove.includes(item));
    }


    return [filteredAttributes]
}

module.exports = WhatMyAttributesTable


