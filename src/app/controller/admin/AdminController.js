
class Admincontroller{
   
    home(req, res,next) {
        const isAdmin = true; // Điều này phụ thuộc vào vai trò của người dùng
        
        res.render('home', { isAdmin});
    }
}
   module.exports=new Admincontroller;