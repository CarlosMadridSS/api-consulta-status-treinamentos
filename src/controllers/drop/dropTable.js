
async function dropTable(model) {

      try {
        
        await model.drop({ where: {}, force: true });
        await model.sync();
        return true
    } catch (error) {
        return false
    }
}





module.exports = dropTable
