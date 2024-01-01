import mongoose, { models } from 'mongoose';

const keyArticleSchema = new mongoose.Schema({
  article_code: {
    type: String,
    required: true
  },
  article_name: {
    type: String,
    required: true
  }
});

const keyArticleModel = models.keyArticle || mongoose.model('keyArticle', keyArticleSchema);

export default keyArticleModel;
