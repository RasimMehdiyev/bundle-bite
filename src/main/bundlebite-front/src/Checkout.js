import { addDoc, getDocs, getDoc, setDoc, doc, collection } from "firebase/firestore";
import { db } from "./firebase-config";
import { getCurrentUser } from "./auth.js";

export const addToCartButton = async (id, cards) => {
  const user = getCurrentUser();
  const date = new Date();
  try {
    let ProductList = {
      CartStatus: false,
      Date: date,
      ProductL: {},
      UserName: user.uid
    };

    const Prod = {
      Id: id,
      quantity: 1
    };

    ProductList.ProductL[0] = Prod;

    let i = 1;
    cards.forEach(card => {
      const Product = {
        Id: card.id,
        quantity: card.quantity
      };
      ProductList.ProductL[i] = Product;
      i++;
    });

    const cartSnapshot = await getDocs(collection(db, 'Cart'));
    let foundUser = false;
    let PastCart;

    cartSnapshot.forEach(doc => {
      if (doc.data().UserName === user.uid) {
        PastCart = doc;
        foundUser = true;
      }
    });

    if (foundUser) {
      const firstItemRef = doc(db, 'Cart', PastCart.id);
      await setDoc(firstItemRef, ProductList);
    } else {
      await addDoc(collection(db, 'Cart'), ProductList);
    }
  } catch (error) {
    console.error("Error adding item to cart: ", error);
  }
};

export const addToCart = async (id, newQuantity, cards) => {
  const user = getCurrentUser();
  const date = new Date();
  try {
    let ProductList = {
      CartStatus: false,
      Date: date,
      ProductL: {},
      UserName: user.uid
    };

    let i = 0;
    cards.forEach(card => {
      const Product = {
        Id: card.id,
        quantity: card.id === id ? newQuantity : card.quantity
      };
      ProductList.ProductL[i] = Product;
      i++;
    });

    const cartSnapshot = await getDocs(collection(db, 'Cart'));
    let foundUser = false;
    let PastCart;
    
    cartSnapshot.forEach(doc => {
      if (doc.data().UserName === user.uid) {
        PastCart = doc;
        foundUser = true;
      }
    });

    if (foundUser) {
      const firstItemRef = doc(db, 'Cart', PastCart.id);
      await setDoc(firstItemRef, ProductList);
    } else {
      await addDoc(collection(db, 'Cart'), ProductList);
    }
  } catch (error) {
    console.error("Error adding item to cart: ", error);
  }
};

export const getfromCart = async (setCards) => {
  const user = getCurrentUser();
  if (user) {
    const cartCollection = collection(db, 'Cart');
    try {
      const cartSnapshot = await getDocs(cartCollection);
      cartSnapshot.forEach(doc => {
        if (doc.data().UserName === user.uid) {
          const data = doc.data().ProductL;
          getUpdatedCards(data, setCards);
        }
      });
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  }
};

const getUpdatedCards = async (data, setCards) => {
  const UpdatedCardsmap = Object.values(data).map(async (card) => {
    const moreInfo = await fetchAdditionalData(card.Id);
    return {
      id: card.Id,
      quantity: card.quantity,
      name: moreInfo.name,
      img: '/images/design/' + moreInfo.img,
      price: moreInfo.price
    };
  });

  const updatedCards = await Promise.all(UpdatedCardsmap);
  setCards(updatedCards);
};

const fetchAdditionalData = async (id) => {
  const BundleBite = doc(db, id);
  const docSnapshot = await getDoc(BundleBite);
  const info = docSnapshot.data();
  return {
    name: info.name,
    price: info.price,
    img: info.imagePath
  };
};
