const loadBuddy = () => {
    fetch('https://randomuser.me/api/?results=10')
    .then(res=>res.json())
    .then(data=> displayBuddy(data))
}
loadBuddy()
const displayBuddy = data =>{
    const buddiesDiv = document.getElementById('buddies');
    const buddies = data.results
    for (buddy  of buddies){
        const p = document.createElement('p')
        p.innerText = `Name : ${buddy.name.title} ${buddy.name.first} ${buddy.name.last}
        Email : ${buddy.email}`
        buddiesDiv.appendChild(p)
    }
}
const reload = ()=>location.reload()