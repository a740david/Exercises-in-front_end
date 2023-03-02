window.addEventListener("load", () => {
    isFreeCheckboxHandler();
    // Get the form element

    const form = document.getElementById("borad-form");
        function getData(form) {
       
        formData = new FormData(form)
        let queryString = Array.from(formData.entries())
        .map(([key, value]) => `${key}=${value.toLowerCase()}`)
        .join('&')
        let api = "https://www.boredapi.com/api/activity?"
        api+=queryString
     
        form.querySelectorAll('input, button, select').forEach((field) => {
        field.setAttribute('disabled', true)
        })
            fetch(`${api}`)
            .then((response) => response.json())
            .then((data) => {
            const alert = document.getElementById("errorAlert") 
            if ("error" in data) {
                alert.classList.remove("alert-success")
                alert.classList.add("alert-danger")
                alert.innerHTML = "No activity found with the specified parameters, please try again."
                
        
            } else {
                // Alert presentation:
                alert.classList.remove("alert-danger")
                alert.classList.add("alert-success")
                alert.innerHTML = "Successfully added activity!"
                alert.classList.remove("d-none")
                const item = document.createElement("li")
                const activityText = document.createElement("p")
                const del_button = document.createElement("button")

                activityText.setAttribute('class', 'h6 d-inline m-0')
                del_button.setAttribute('type', 'button')
                del_button.setAttribute('aria-label', 'Close')
                del_button.setAttribute('class', 'btn btn-outline-dark btn-sm')
                del_button.innerHTML = 'X'
                del_button.setAttribute('onclick', 'removeItemFromList(this)')

                item.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center")
                if (data.price > 0.0) {
                    activityText.innerHTML = `${data.activity}, up to ${data.participants} people. Price: ${data.price * 100}%`
                } else {
                    activityText.innerHTML = `${data.activity}, up to ${data.participants} people.`
                }
                item.appendChild(activityText)
                item.appendChild(del_button)
                const activityList = document.getElementById("activityList");
                activityList.insertBefore(item, activityList.firstChild);
            }
            form.querySelectorAll('input, button, select').forEach((field) => {
                field.removeAttribute('disabled');
            })
        }
            )
                
            .catch((error) => console.log(error))
    }


    // Add 'submit' event handler
    form.addEventListener("submit", (event) => {
        event.preventDefault();

       
        getData(form);
    });
    });
    
    

    // Adjust 'price' API query param according to isFree checkbox function:
function isFreeCheckboxHandler() {
    const checkbox = document.getElementById("isFree");
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            checkbox.value = "0.0"
        } else {
            checkbox.value = ""
        }
    })
}
// Delete button functionality:
function removeItemFromList(btn) {
    parentItem = btn.parentNode
    parentItem.remove()
}