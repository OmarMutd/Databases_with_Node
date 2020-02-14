const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe.only('Shopping List Service Object', function() {
    let db
    let testItems = [
        {
            name: 'Fish Tricks',
            price: '13.10',
            category: 'Main',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            view_id: 1
        },
        {
            name: 'Not Dogs',
            price: '4.99',
            category: 'Snack',
            checked: true,
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            view_id: 2
        },
        {
            name: 'Bluffalo Wings',
            price: '5.50',
            category: 'Snack',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            view_id: 3
        },
        {
            name: 'SubstiTuna Salad Tricks',
            price: '1.24',
            category: 'Lunch',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            view_id: 4
        },
        {
            name: 'Tofurkey',
            price: '2.50',
            category: 'Breakfast',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            view_id: 5
        },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    beforeEach(() => db('shopping_list').truncate())
    after(() => db.destroy())

    context(`Given shopping_list has item`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testItems)
        
        })
        it(`getShoppingListItem resolves all items from 'shopping_list' table`, () => {
            // test that ArticlesService.getAllArticles gets data from table
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testItems)
                })
            })

                it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
                    const itemId =3
                    return ShoppingListService.deleteItem(db, itemId)
                    .then(() => ShoppingListService.getAllItems(db))
                    .then(allItems => {
                    const expected = testItems.filter(item => item.view_id !== itemId)
                    expect(allItems).to.eql(expected)
                })
                
        })

        it(`updateItem() updates an item from the 'shopping_list' table`, () => {
            const idOfItemToUpdate = 3
            const newItemData = {
              name: 'updated title',
              price: '5.45',
              category: 'Main',
              checked: false,
              date_added: new Date('2029-01-22T16:28:32.615Z'),



            }
            return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
              .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
              .then(item => {
                expect(item).to.eql({
                  view_id: idOfItemToUpdate,
                  ...newItemData,
                })
              })
          })
        })
          context(`Given 'shopping_list has no data`, () => {
              
          it(`insertItem() inserts a new item and resolves the new item with an 'view_id'`, () => {
            const newItem = {
              name: 'Pizza',
              price: '9.99',
              category: 'Snack',
              checked: false,
              date_added: new Date('2029-01-22T16:28:32.615Z'),
            }
            return ShoppingListService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        view_id: 1,
                        name: newItem.name,
                        category: newItem.category,
                        date_added: newItem.date_added,
                        price: newItem.price,
                        checked: newItem.checked
                    })
                })
    })
    })
})

