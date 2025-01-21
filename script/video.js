// fetch ,load and show categories

const loadCategories =()=>{
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then(res => res.json())
  .then(data => displayCategories(data.categories))
  .catch(error => console.log(error))
}

// {
//   "category_id": "1001",
//   "category": "Music"
// }
 const displayCategories=(categories)=>{
  const categoryContainer = document.getElementById('categories')
    // console.log(categories)
    // add data in html
    categories.forEach((item)=>{
      console.log(item)

      // create a button 
      const button = document.createElement('button');
      button.classList = 'btn';
      button.innerText = item.category
      categoryContainer.append(button)

    })

 }

loadCategories()