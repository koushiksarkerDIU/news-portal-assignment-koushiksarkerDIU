const loadAllProducts = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    return data;
}

const setAllMenu = async () => {
    const data = await loadAllProducts();
    const menu = document.getElementById('nav-category')
    const protucts = data.data.news_category;
    for (const protuct of protucts) {
        // console.log(protuct.category_name)
        const li = document.createElement('li');
        li.innerHTML = `
        <li onclick="loadNewsDetails('${protuct.category_id}')">${protuct.category_name}</li>
        `;
        menu.appendChild(li);
    }
}
setAllMenu()
// loadAllProducts()

const loadNewsDetails = async category_id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data.length);
    const allNews = data.data;
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    allNews.forEach(news => {
        // console.log(news)
        const { title, details, author, total_view, thumbnail_url, rating } = news;
        // console.log(details);
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = ` 
        <div class="card lg:card-side bg-base-100 shadow-xl m-3 p-2">
            <figure><img  src="${thumbnail_url}" alt="Album"></figure>
            <div class="card-body">
                <h2 class="card-title">${title}</h2>
                <p>${details.length > 350 ? details.slice(0, 350) + '...' : details}</p>
                <div class="flex justify-between">
                    <div class="flex items-center">
                        <img class="w-10 h-10 rounded-full mr-4" src="${author.img}">
                        <div class="text-sm">
                            <p class="text-gray-900 leading-none font-semibold">${author.name ? author.name : 'N/A'}</p>
                        </div>
                    </div>
                    <div>
                        <p class="font-bold"><i class="fa-solid fa-eye"></i> ${total_view ? total_view : 'N/A'} </p>
                    </div>
                    <div>
                        <p><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i> </p>
                    </div>
                    <div>
                        <label for="my-modal-3" class="btn modal-button" onclick="showModal('${title}','${author.name ? author.name : 'N/A'}' , '${author.published_date ? author.published_date : 'N/A'}')"><i class="fa-solid fa-arrow-right"></i></label>
                    </div>
                    
                </div>
            </div>
        </div>`;
        cardContainer.appendChild(cardDiv);
    })

}

const showModal = (title, authorName, publishedDate) => {
    // console.log(title, authorName, publishedDate)
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <h3 class="text-lg font-bold">${title}</h3>
    <p class="py-4">Author Name : ${authorName}</p>
    <p class="py-4">Published Date & Time : ${publishedDate}</p>
    `;
}

loadNewsDetails('01')