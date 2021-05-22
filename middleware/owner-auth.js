export default ({$auth, redirect}) => {
    try{
        
        if($auth.loggedIn){
            if($auth.user.userType != 'owner'){
                return redirect('/')
            }

            if(!$auth.user.approved) return redirect('/owner/pending')
        }else{
            redirect('/')
        }
    }catch(err){
        console.log(err)
        return redirect('/')
    }
}