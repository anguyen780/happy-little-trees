const saveVideos = async (event) => {
    event.preventDefault();

    const videoId = event.target.getAttribute('data-videoId')
    const response = await fetch('/api/user/wishlist', {
        method: "POST",
        body: JSON.stringify({ videoId: videoId }),
        headers: { "Content-Type": "application/json" },
    });
    console.log(videoId);
    if (response.ok) {
        document.location.reload()
    } else {
        alert(response.status);
    }

};

const saveVideoQuery = document.querySelectorAll(".save-video")

for(const saveVideo of saveVideoQuery) {
    saveVideo.addEventListener("click", saveVideos);
}