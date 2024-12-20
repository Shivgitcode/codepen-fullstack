const {CloudinaryStorage}=require("multer-storage-cloudinary")
const {v2:cloudinary}=require("cloudinary")

const storage=new CloudinaryStorage({
    cloudinary,params:{
        folder:"codepen-previews",
        format:async(req,file)=>"png"
    }
})
const upload=multer({storage})
module.exports={
    upload
}