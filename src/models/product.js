


import { Description } from "@headlessui/react";
import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    productType: {
        type: String,
        enum: ['vetement', 'coaching', 'ebook'],
        required: true,  // Ce champ est maintenant obligatoire
      },
    name: String,
    description: String,
    price: Number,
    category: String,
    sizes: {
      type: Array,
      required: function() { return this.type === 'vetement'; },  // Obligatoire uniquement pour les vêtements
    },
    deliveryInfo: String,
    onSale: String,
    priceDrop: Number,
    imageUrl: String,

    duration: {  // Durée spécifique pour le coaching
      type: Number,
      required: function() { return this.type === 'coaching'; }  // Obligatoire uniquement pour le coaching
    },
    ebookFile: {  // URL du fichier pour l'ebook
      type: String,
      required: function() { return this.type === 'ebook'; }  // Obligatoire uniquement pour l'ebook
    }
  }, { timestamps: true });

// const ProductSchema = new mongoose.Schema({
//     name:String,
//     description : String, 
//     price : Number,
//     category : String,
//     sizes : Array,
//     deliveryInfo : String,
//     onSale: String,
//     priceDrop : Number,
//     imageUrl : String
// }, {timestamps : true})

const Product = mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;