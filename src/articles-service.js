
const ShoppingListService = {
    getAllShoppingList(knex) {
        return knex.select('*').from('shopping_list')
    },
    insertArticle(knex, newArticle) {
        return knex
            .insert(newArticle)
            .into('blogful_articles')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }}