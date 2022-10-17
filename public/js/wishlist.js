const deleteWishList = async (event) => {
    event.preventDefault();

    const videoId = event.target.getAttribute('data-videoId')
    const response = await fetch('/api/user/wishlist', {
        method: "DELETE",
        body: JSON.stringify({ videoId: videoId }),
        headers: { "Content-Type": "application/json" },
    });
    
    if (response.ok) {
        document.location.reload()
    } else {
        alert(response.status);
    }

};

const deleteVideoButtons = document.querySelector(".delete-video") 

if (deleteVideoButtons){
    deleteVideoButtons.addEventListener("click", deleteWishList);
}





