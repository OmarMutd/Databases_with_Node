const ShoppingListService = {
    getAllItems(knex) {
        return knex.select('*').from('shopping_list')

    },
    deleteItem(knex, view_id) {
        return knex('shopping_list')
        .where({ view_id })
        .delete()
    },
    getById(knex, view_id) {
        return knex
        .from('shopping_list')
        .select('*')
        .where('view_id', view_id)
        .first()
    },
        updateItem(knex, view_id, newItemData) {
            return knex
            .from('shopping_list')
            .where({ view_id })
            .update(newItemData)
        },
        insertItem(knex, newItem) {
            return knex
            .insert(newItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
        }
    }

module.exports = ShoppingListService