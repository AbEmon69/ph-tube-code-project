// fetch load and show categories

// create loadCategories
const loadCategories =()=>{
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data =>displayCategories(data.categories))
    .catch(error => console.log(error))
}

// category: "Music"
// ​
// category_id: "1001"

// create displayCategories
 const displayCategories=(categories)=>{
    const categoryContainer = document.getElementById('categories')
  categories.forEach((item) =>{
    console.log(item)
    // create a button
    const button = document.createElement('button')
    button.classList = 'btn '
    button.innerText=item.category
    // add to the button
    categoryContainer.append(button)
  })
 }
loadCategories()