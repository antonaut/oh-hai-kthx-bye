getUsername = function(user){
    if(user.username){
        return user.username
    }
    else if(user.profile&&user.profile.name){
        return user.profile.name;
    }
    else{
        return user._id;
    }
};