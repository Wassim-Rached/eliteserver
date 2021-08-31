import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema(
    {
      title: { type: String, required: true, },
      posterImg:{type:String,required:true},
      posterName:{type:String,required:true},
      posterId:{type:String,required:true},
      image:{type:String,required:true,default:"defaultNews.jpg"},
      description: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
  const News = mongoose.model('News', newsSchema);
  
  export default News;