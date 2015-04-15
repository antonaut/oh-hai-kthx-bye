Router.route('/',function(){
    this.render('firstPage');
});

Router.route('/new-haiku',function(){
    this.render('createNewHaiku');
});

/*Router.route('/user/_:id',function(){
    var item = Users.findOne({_id: this.params._id});
    this.render('userProfile',{userData: item})
});*/
Router.route('/user',function(){
    this.render('userProfile')
});