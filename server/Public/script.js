const button = document.querySelector("button")
button.addEventListener("click", () => 
fetch('/create-checkout-session',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        items: [
            {id:1, quantity:1, unit_amount:10000},
            {id:2, quantity:1, unit_amount:10000},
            {id:3, quantity:1, unit_amount:12000},
            {id:4, quantity:1, unit_amount:5000},
            {id:5, quantity:1, unit_amount:15000},
        ]
     })
    }).then(res => {
        if(res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
  }).then(({ url }) => {
    console.log(url)
    window.location = url
  })
  .catch(e => {
    console.error(e.error)
  })
)




