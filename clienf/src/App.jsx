import React, { useEffect, useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import { AppContext } from './context/context'
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from './services/apiService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './components/pages/style.css'

const App = () => {

  const [ar, setAr] = useState([])
  const [favs, setFavs] = useState(null); // The cart array, used to add an item to the cart as well as delete it
  const [userInfo, setUserInfo] = useState(); // Gets the user's information
  const [cartLength, setCartLength] = useState(0); // A variable that contains the length of the cart
  const [cartRefreshToogle, setCartRefreshToogle] = useState(false); // A variable intended for refreshing so that it displays the length of the cart's products
  const [userCart, setUserCart] = useState([]); // The products that are in the cart in the array
  const [totalPayment, setTotalPayment] = useState(0); // A variable that contains the total amount of the payment
  const [totalIncShipper, setTotalIncShipper] = useState(0); // A variable containing the total payment amount with delivery
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true) // A variable that is a switch to true and false to skeleton loading
  const [productId, setProductId] = useState(); //A variable that contains a product id to display in the model
  const [register, setRegister] = React.useState(false); // A variable related to the model when to show it and when not
  const [login, setLogin] = React.useState(false); // A variable related to the model when to show it and when not
  const [shipper, setShipper] = React.useState(false); // A variable related to the model when to show it and when not
  const [openModal, setOpenModal] = useState(false);  // A variable related to the model when to show it and when not
  const [comments, setComments] = useState(''); // comments of the product in the cart
  const [itemInimation, setItemInimation] = useState();
  const [toogleInimation, setToogleInimation] = useState(false);
  let total = 0;

  const getUserAndCart = async () => {
    localStorage[TOKEN_KEY] && await doApiUserInfo();
  }

  useEffect(() => {
    getUserAndCart();
  }, [cartRefreshToogle, localStorage[TOKEN_KEY]])

  useEffect(() => {
    doApiCart(userInfo);
  }, [favs])

  // products by search
  const doApiSearch = async (value) => {
    const s = value;
    const url = API_URL + "/products?s=" + s
    const data = await doApiGet(url);
    setAr(data);
  }

  // display data of the user and take the favs_ar from to user
  const doApiUserInfo = async () => {
    try {
      const url = API_URL + "/users/userInfo";
      const data = await doApiGet(url);
      localStorage.setItem("favs", JSON.stringify(data.favs_ar));
      setUserInfo(data);
      setFavs(data.favs_ar)
    }
    catch (error) {
      console.log(error);
    }
  }


  // add to cart
  const doApiAddToCart = async (newItemAndAmountAndComments, plusOrMinus,comment) => {
    try {
      if (!localStorage[TOKEN_KEY]) {
        toast.info("נראה שאתה לא מחובר", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      else {
        const url = API_URL + "/users/updateFavs";
        const itemFromCart = favs.find((item) => item.id == newItemAndAmountAndComments.id);
        let data;

        if(itemFromCart&&comment){
          itemFromCart.comments = newItemAndAmountAndComments.comments;
          data = await doApiMethod(url, "PATCH", { favs_ar: [...favs] });
        }

       else if (itemFromCart) {
          itemFromCart.comments = newItemAndAmountAndComments.comments;
          if (plusOrMinus) {
            itemFromCart.amount++;
          }
          else itemFromCart.amount--;
          data = await doApiMethod(url, "PATCH", { favs_ar: [...favs] });
        }

        else {
          data = await doApiMethod(url, "PATCH", { favs_ar: [...favs, newItemAndAmountAndComments] });
          if (data.modifiedCount) {
            toast.success("המוצר נוסף בהצלחה !", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        }
        setCartRefreshToogle(!cartRefreshToogle);
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  // remove all products from cart
  const doApiRemoveCart = async () => {
    const url = API_URL + "/users/updateFavs";
    const data = await doApiMethod(url, "PATCH", { favs_ar: [] });
    try {
      if (data.modifiedCount) {
        await doApiUserInfo();
        await doApiCart(userInfo);
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  //remove item from cart
  const doApiRemoveItem = async (id) => {
    const url = API_URL + "/users/updateFavs";
    const data = await doApiMethod(url, "PATCH", { favs_ar: favs.filter(ids => ids.id !== id) });
    console.log(favs);
    try {
      if (data.modifiedCount) {
        console.log(id);
        await doApiUserInfo();
        await doApiCart(userInfo);
        toast.success("המוצר הוסר בהצלחה !", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  // userCart Viewing the user's cart + the length of the cart and the payment amount
  const doApiCart = async (user) => {
    try {
      const url = API_URL + "/products/groupIds";
      let data;

      if (user) {
        data = await doApiMethod(url, "POST", user);
      }
      else {
        user = JSON.parse(localStorage.getItem("favs"))
        data = await doApiMethod(url, "POST", { favs_ar: user });
      }
      setUserCart(data)
      setCartLength(data.length);
      if (!favs) {
        return;
      }
      data.forEach(item => {
        let findItem = favs.find(favsItem => favsItem.id == item._id);
        item.sale_price != -1 ? total += item.sale_price * findItem?.amount : total += item.price * findItem?.amount;
      })

      total = total.toFixed(2);
      setTotalPayment(total);

      let number = parseFloat(total);
      setTotalIncShipper(number + 20);
    }
    catch (error) {
      console.log(error);
    }
  }


  //login user
  const doApiLogin = async (loginData) => {
    console.log(loginData);
    try {
      const url = API_URL + "/users/login";
      const data = await doApiMethod(url, "POST", loginData);
      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token)
        toast.success(`ברוך הבא ${data.name}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          setLogin(false);
        }, 2000);
      }
    }
    catch (error) {
      toast.warn('Password or user name wrong!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        limit: 1
      });
    }
  }


  // Editing of the user's account details
  const doApiEditUser = async (NewChanges) => {
    try {
      const url = API_URL + "/users/" + userInfo._id;
      const data = await doApiMethod(url, "PUT", NewChanges);
      if (data.modifiedCount) {
        toast.success('החשבון שלך התעדכן בהצלחה', {
          position: "top-center",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        doApiUserInfo();
      }
    }
    catch (error) {
      toast.error('החשבון לא התעדכן,נסה שוב מאוחר יותר', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(error);
    }
  }


  // Change password
  const doApiEditUserPassword = async (NewPassword) => {
    try {
      const url = API_URL + "/users/changePassword/" + userInfo._id;
      const { data } = await doApiMethod(url, "PUT", NewPassword);
      if (data.modifiedCount) {
        toast.success('הסיסמא שלך התעדכנה בהצלחה', {
          position: "top-center",
          autoClose: 1100,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      }
    }
    catch (error) {
      toast.error('הסיסמא לא התעדכנה,נסה שוב מאוחר יותר', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(error);
    }
  }

  return (
    <div className={darkMode ? "dark-true" : "dark-false"}>
      <AppContext.Provider value={{
        doApiEditUserPassword,
        setToogleInimation,
        setItemInimation,
        doApiRemoveCart,
        doApiRemoveItem,
        doApiEditUser,
        setOpenModal,
        doApiAddToCart,
        setProductId,
        setRegister,
        doApiSearch,
        setDarkMode,
        doApiLogin,
        setLoading,
        doApiUserInfo,
        setComments,
        setShipper,
        doApiCart,
        setLogin,
        setAr,
        totalIncShipper,
        toogleInimation,
        itemInimation,
        totalPayment,
        cartLength,
        productId,
        openModal,
        userCart,
        darkMode,
        userInfo,
        register,
        loading,
        comments,
        shipper,
        login,
        favs,
        ar
      }}>
        <AppRoutes />
        {/* <h1>{import.meta.env.VITE_CLIENT_ID}</h1> */}
        <ToastContainer />
      </AppContext.Provider>
    </div>
  )
}

export default App
