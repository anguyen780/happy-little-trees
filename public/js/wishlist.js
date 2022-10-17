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

const deleteVideoButtons = document.querySelectorAll(".delete-video")


for (const deleteVideo of deleteVideoButtons) {
    deleteVideo.addEventListener("click", deleteWishList);
}





