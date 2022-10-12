// User
    // id
        // has many comments
// Comment
    // id
    // FK user_id
    // body
        // belongs to user
// Video(link)
    // id
        // has many users
// WishlistItem
    // id
    // FK user_id
    // FK video_id
        // belongs to user


// { User, Comment, Video, WishlistItem}