const loadAllProducts = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    return data;
}

const setAllMenu = async () => {
    const data = await loadAllProducts();
    const menu = document.getElementById('nav-category')
    const protucts = data.data.news_category
    for (const protuct of protucts) {
        // console.log(protuct.category_name)
        const li = document.createElement('li');
        li.innerHTML = `
        <li>${protuct.category_name}</li>
        `;
        menu.appendChild(li)
    }
}
setAllMenu()
// loadAllProducts()