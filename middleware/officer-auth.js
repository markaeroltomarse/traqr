export default ({$auth, redirect}) => {
    try{
        console.log('MIddle ware auth')
        if($auth.loggedIn){
            if($auth.user.userType != 'officer'){
                return redirect('/')
            }
        }else{
            redirect('/')
        }
    }catch(err){
        console.log(err)
        return redirect('/')
    }
}