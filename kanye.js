const loadQuotes = ()=>{
    fetch('https://api.kanye.rest/')
    .then( res => res.json())
    .then( data =>displayQuotes (data))
    
}
const displayQuotes =data =>{
    const blockQuotes = document.getElementById('quotes')
    blockQuotes.innerText = `" ${data.quote} "`
    document.getElementById('kanye-button').style.cursor ='pointer'
}