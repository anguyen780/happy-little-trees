const getWishList = async (event) => {
    event.preventDefault();

    if (req.session.loggedIn){
        const response = await fetch('/api/user/wishlist/:videoId', {
            method: "POST",
            body: JSON.stringify({}),
            headers: { "Content-Type": "application/json"},
        });

        if (response.ok) {
            
        } else {
            alert(response.status);
        }
    }
};


