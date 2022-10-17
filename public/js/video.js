const saveVideos = async (event) => {
    event.preventDefault();

    if (req.session.loggedIn){
        const response = await fetch('/api/user/wishlist', {
            method: "POST",
            body: JSON.stringify({videoId}),
            headers: { "Content-Type": "application/json"},
        });

        if (response.ok) {
            
        } else {
            alert(response.status);
        }
    }
};

document.querySelector(".save-video").addEventListener("click", saveVideos);