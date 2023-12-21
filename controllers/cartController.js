


// controllers/cartController.js
const Product = require('../models/Products');
const Cart = require('../models/Cart');

module.exports = {
  addToCart: async (req, res) => {
    const { userId, cartItem, quantity } = req.body;

    try {
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        // If the cart doesn't exist, create a new one
        cart = new Cart({ userId, products: [] });
      }

      const existingProductIndex = cart.products.findIndex(
        (product) => product.cartItem.toString() === cartItem
      );

      if (existingProductIndex !== -1) {
        // If the product already exists, increment the quantity
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // If the product doesn't exist, add it to the cart
        cart.products.push({ cartItem, quantity });
      }

      await cart.save();
      res.status(200).json('Product added to cart');
    } catch (error) {
      res.status(500).json(error.message || 'Internal Server Error');
    }
  },

  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.id }).populate('products.cartItem', ['title', 'price', 'imageUrl']);

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
  },

  deleteCartItem: async (req, res) => {
    const cartItemId = req.params.cartItemId;

    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { 'products._id': cartItemId },
        { $pull: { products: { _id: cartItemId } } },
        { new: true }
      );

      if (!updatedCart) {
        return res.status(404).json('Cart not found');
      }

      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json(error);
    }
},
  decrementCartItem: async (req, res) => {
    const { userId, cartItem } = req.body;

    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json('Cart not found');
      }

      const existingProduct = cart.products.find(
        (product) => product.cartItem.toString() === cartItem
      );

      if (!existingProduct) {
        return res.status(404).json('Item not found');
      }

      if (existingProduct.quantity === 1) {
        cart.products = cart.products.filter(
          (product) => product.cartItem.toString() !== cartItem
        );
      } else {
        existingProduct.quantity -= 1;
      }

      await cart.save();

      if (existingProduct.quantity === 0) {
        await Cart.updateOne(
          { userId },
          { $pull: { products: { cartItem } } }
        );
      }

      return res.status(200).json('Updated');
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

// const Product = require ('../models/Products');
// const  Cart = require ('../models/Cart');


// module.exports={
//     addTocart: async (req, res) => {

//         const { userId, cartItem, quantity } = req.body;
      
//         try {
//           // Find cart
//           const cart = await Cart.findOne({ userId });
      
//           if (cart) {
//             // Check if the product already exists and compare with the one passed
//             const existingProduct = cart.products.find(
//               (product) => product.cartItem.toString() === cartItem
//             );
      
//             // If the product exists, increment the quantity
//             if (existingProduct) {
//               existingProduct.quantity += 1;
//             } else {
//               // Push an item to the cart
//               cart.products.push({ cartItem, quantity });
//             }
      
//             await cart.save();
//             res.status(200).json("Product added to cart");
//           } else {
//             const newCart = new Cart({
//               userId,
//               products: [{ cartItem, quantity: quantity }],
//             });
      
//             await newCart.save();
//             res.status(200).json("Product added to cart");
//           }
//         } catch (error) {
//           res.status(500).json(error);
//         }
//       },
      

//       getcart: async (req, res) => {
//         try {
//           // Find the cart by user ID
//           const cart = await Cart.findOne({ userId: req.params.id }).populate('products.cartItem', ['title', 'price', 'imageUrl']);
          
//           if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//           }
    
//           res.status(200).json(cart);
//         } catch (error) {
//           res.status(500).json({ message: error.message || "Internal Server Error" });
//         }
//       },
    

//    deleteCartItem: async (req,res)=>{
    

//     const cartItemId = req.params.cartItemId

//     try {
//         const updatedCart = await Cart.findOneAndUpdate(
//             {'products._id':cartItemId},
//             {$pull:{products: { _id:cartItemId}}},
//             {new:true}
//         );

//         if(!updatedCart){
//             return res.status(404).json("Cart not found");
//         }
//         res.status(200).json(updatedCart)
//     } catch (error) {
//        return res.status(500).json(error);
//     }

        
//     },

//     decrementCartItem: async (req, res) => {
//         const { userId, cartItem } = req.body;
    
//         try {
//             const cart = await Cart.findOne({ userId });
    
//             if (!cart) {
//                 return res.status(404).json("Cart not found");
//             }
    
//             const existingProduct = cart.products.find(
//                 (product) => product.cartItem.toString() === cartItem
//             );
    
//             if (!existingProduct) {
//                 return res.status(404).json("Item not found");
//             }
    
//             if (existingProduct.quantity === 1) {
//                 cart.products = cart.products.filter(
//                     (product) => product.cartItem.toString() !== cartItem
//                 );
//             } else {
//                 existingProduct.quantity -= 1;
//             }
    
//             await cart.save();
    
//             if (existingProduct.quantity === 0) {
//                 await Cart.updateOne(
//                     { userId },
//                     { $pull: { products: { cartItem } } }
//                 );
//             }
     
//             return res.status(200).json("Updated");
    
//         } catch (error) {
//             return res.status(500).json(error);
//         }
//     },
    
// }