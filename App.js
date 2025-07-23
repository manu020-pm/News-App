const apikey = '752e8a48c45e4ca4a05b537c3eec7e96'
const blogcontainer = document.getElementById("blog-container")
const searchfield=document.getElementById("search-input")
const searchButton=document.getElementById("search-button")
fetchrandomnews = async () => {
    try {
        const apiurl = `
https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apikey}`
        const response = await fetch(apiurl)
        const data = await response.json()
        // console.log(data)
        return data.articles;
    }
    catch (error) {
        console.error("error fetching random news", error)
        return [];
    }
}


searchButton.addEventListener("click",async()=>{
    const querry=await searchfield.value.trim()
    if(querry!=""){
        try{
    const articles=await fetchNewsQuerry(querry)
    displayBlogs(articles)
        }
        catch(error){
          console.log("error fetching news by querry",error)  
        }
    }
})
 async function fetchNewsQuerry(querry){
     try {
        const apiurl = `
https://newsapi.org/v2/everything?q=${querry}&pageSize=10&apiKey=${apikey}`
        const response = await fetch(apiurl)
        const data = await response.json()
        // console.log(data)
        return data.articles;
    }
    catch (error) {
        console.error("error fetching random news", error)
        return [];
    }
}
function displayBlogs(articles) {
    blogcontainer.innerHTML = ""
    articles.forEach((article) => {
        const blogcard = document.createElement("div")
        blogcard.classList.add("blog-card")
        const img = document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title
        const title = document.createElement("h2")
        const truncatedtitle=article.title?.length>30?article.title.slice(0,30)+"....":article.title;
        title.textContent=truncatedtitle
        const description = document.createElement("p")
         const truncateddesc=article.description?.length>120?article.description.slice(0,120)+"....":article.description;
         description.textContent=truncateddesc
        // description.textContent = article.description

        blogcard.appendChild(img)
        blogcard.appendChild(title)
        blogcard.appendChild(description)
        blogcard.addEventListener('click',()=>{
        window.open(article.url,"_blank")
        })
        blogcontainer.appendChild(blogcard)
    });
}

(async () => {
    try {
        const articles = await fetchrandomnews();
        displayBlogs(articles);
    }
    catch (error) {
        console.error("error fetching random news", error);
    }
})();
