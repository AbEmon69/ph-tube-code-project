

function timeString(time){
  const hour = parseInt(time /3600);
  const remainingSecond = time % 3600;
  const minute = parseInt (remainingSecond/60);
  const remainingSeconds  = (remainingSecond % 60)

  return `${hour} hour ${minute} minute ${remainingSeconds} second ago`
}
// fetch ,load and show categories

const loadCategories =()=>{
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then(res => res.json())
  .then(data => displayCategories(data.categories))
  .catch(error => console.log(error))
}

const loadVideos = (searchText = "") =>{
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
  .then(res => res.json())
  .then(data => loadVideosCategories(data.videos))
  .catch(error => console.log(error))
}


// {
//   "category_id": "1001",
//   "video_id": "aaal",
//   "thumbnail": "https://i.ibb.co/hdtZYbB/enchnting.jpg",
//   "title": "Enchanted Harmonies",
//   "authors": [
//     {
//       "profile_picture": "https://i.ibb.co/jh1q2F3/shopia.jpg",
//       "profile_name": "Sophia Williams",
//       "verified": false
//     }
//   ],
//   "others": {
//     "views": "7.6K",
//     "posted_date": "16450"
//   },
//   "description": "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience."
// }


const removeActiveClass=()=>{
  const buttons = document.getElementsByClassName('category-btn')
  console.log(buttons)
  for(let btn of buttons){
    btn.classList.remove('active')
  }
}


 const loadCategoriesButton =(id)=>{
  // alert(id)
  // fetch the data
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then(data =>{
    // sobaike active class remove korao
    
    removeActiveClass()

    // id er class k  add korao
    const activeBtn = document.getElementById(`btn-${id}`)
    activeBtn.classList.add('active')
    loadVideosCategories(data.category)
  })
  .catch(error => console.log(error))
}



const loadDetails = async(videoId)=>{
  console.log(videoId)
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  const res = await fetch(uri)
  const data = await res.json()
  displayDetails(data.video)
}
const displayDetails=(video)=>{
  console.log(video)
  const openModal = document.getElementById('modal-content')
  openModal.innerHTML =
  `<img src =${video.thumbnail}/>
  <p>${video.description}</p>
   `

  // way-1
  // document.getElementById('showModalData').click()

  // way-2
  document.getElementById('customModal').showModal()
}


const loadVideosCategories=(videos)=>{
  // console.log(videos)
  const displayContainer= document.getElementById('video')
  displayContainer.innerHTML = "";

  if(videos.length == 0){
      displayContainer.classList.remove("grid")
      displayContainer.innerHTML = `
      <div class = "min-h-[300px] flex flex-col justify-center items-center gap-2">
      <img src = "assests/icon.png"/>
      <p class="text-center text-2xl font-bold">No content here is this category</p>
      </div>
      `
      return;
  }else{
    displayContainer.classList.add("grid")
  }


  videos.forEach((videos) =>{
    console.log(videos)
    // create card 
     const card = document.createElement('div');
     card.classList= `card bg-base-100`
     card.innerHTML =
     `
     <figure class="h-[200px] relative">
    <img class="w-full h-full object-cover"
      src=${videos.thumbnail}
      alt="Shoes" />   
      ${
        videos.others.posted_date ?.length == 0 ? '' :`
      <span class="absolute right-2 bottom-2 p-1 bg-black text-white text-sm">${timeString(videos.others.posted_date)}</span>`
      }

  </figure>
  <div class="px-0 py-2 flex gap-2">
     <div>
     <img class="w-[40px] h-[40px] object-cover rounded-full" src =${videos.authors[0].profile_picture}/>
     </div>
     <div>
     <h2 class="font-bold">${videos.title}</h2>
     <div class="flex gap-2 items-center">
     <p class="text-gray-400">${videos.authors[0].profile_name}</p>
     ${videos.authors[0].verified == true ? ` <img class="w-[20px] h-[20px]" src ="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` : ''}
    
     </div>
     <p> <button onclick ="loadDetails('${videos.video_id}')" class="btn btn-sm btn-error">details</button></p>
     </div>

  </div>

     `
     displayContainer.append(card)
  })
}

// {
//   "category_id": "1001",
//   "category": "Music"
// }

// for button 

 const displayCategories=(categories)=>{
  const categoryContainer = document.getElementById('categories')
    // console.log(categories)
    // add data in html
    categories.forEach((item)=>{
      console.log(item)

      // create a button 
      const buttonContainer = document.createElement('div');
      buttonContainer.innerHTML=
      `
      <button id ="btn-${item.category_id}" onclick ="loadCategoriesButton(${item.category_id})" class ="btn category-btn">${item.category}</button>

      `
      categoryContainer.append(buttonContainer)

    })

 }


document.getElementById("search-box").addEventListener("keyup",(e) =>{
  loadVideos(e.target.value)
}) 
loadCategories()
loadVideos()