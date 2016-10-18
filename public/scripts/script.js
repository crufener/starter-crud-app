console.log(`Starting up front end framework`);

let updateBtn = el('#update');
let deleteBtn = el('#delete');

//add event listeners on buttons
updateBtn.addEventListener('click', () => {
    console.log(`The update button was clicked`);
    $.ajax({
        url: './quotes',
        method: 'PUT',
        data: {
            name: 'Craig Rufener',
            quote: 'This post should replace any other by the name of craig rufener'
        },
        success: function(response) {
            console.log(response);
        }
    })
});
deleteBtn.addEventListener('click', () => {
    console.log(`The delete button was clicked`);
    $.ajax({
        url: './quotes',
        method: 'DELETE',
        data: {
            name: 'Craig Rufener'
        },
        success: function(response) {
            console.log(response);
        }
    })
});
//easily get elements
function el(id) {
    return document.querySelector(id);
};
