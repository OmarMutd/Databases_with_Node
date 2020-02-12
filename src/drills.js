require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})
// DRILL 1
// function searchByProduceName(searchTerm) {
//     knexInstance
//       .select('name')
//       .from('shopping_list')
//       .where('name', 'ILIKE', `%${searchTerm}%`)
//       .then(result => {
//         console.log(result)
//       })
//   }
  
//   searchByProduceName('kale')

// DRILL 2
// function paginateProducts(pageNumber) {
//     const productsPerPage = 6
//     const offset = productsPerPage * (pageNumber - 1)
//     knexInstance
//       .select('name')
//       .from('shopping_list')
//       .limit(productsPerPage)
//       .offset(offset)
//       .then(result => {
//         console.log(result)
//       })
//   }
  
//   paginateProducts(2)

// DRILL 3
// function searchForItemsAfterDate(daysAgo) {
//     knexInstance
//       .select('name')
//       .where(
//         'date_added',
//         '>',
//         knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
//       )
//       .from('shopping_list')
//       .then(result => {
//         console.log(result)
//       })
//   }
  
//   searchForItemsAfterDate(30)


// DRILL 4


function totalCost() {
    knexInstance
    
    .select('category')
    .from('shopping_list')
    .sum('price AS total')
    .groupBy('category')
    .orderBy([
        {column: 'total', order: 'DESC'}
    ])
    .then(result => {
     console.log(result)
    })
}
totalCost()