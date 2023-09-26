const access_key = 'onDhYALbyVuh9dt-IFBCJHkyZVlG4E8M7xObxq1vRWc'
const secret_key = 'N0gavjFnrDDCkmW7OBzuXYY7Z7L8eFtVGqdE_p8gBto'

const formElement = document.querySelector("form")
const inputElement = document.getElementById("image_name")
const searchResults = document.querySelector(".search-results")
const showMoreButton = document.querySelector("#show-more")

let inputData = ""
let page = 1

async function searchimages()
{
    inputData = inputElement.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${access_key}`

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    const results = data.results

    if (page === 1){
        searchResults.innerHTML = ""
    }

    results.map((results) => {
        
        const imagewrapper = document.createElement("div")
        imagewrapper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = results.urls.small
        image.alt = results.alt_description
        const imageLink = document.createElement("a")
        imageLink.href = results.links.html
        imageLink.target = "_blank"
        imageLink.textContent = results.alt_description

        imagewrapper.appendChild(image)
        imagewrapper.appendChild(imageLink)
        searchResults.appendChild(imagewrapper)

    })

    page++

    if (page > 1){
        showMoreButton.style.display = "block"
    }
}

formElement.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1
    searchimages()
})

showMoreButton.addEventListener("click", () =>{
    searchimages()
})

