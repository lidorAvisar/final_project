import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { API_URL, TOKEN_KEY, doApiGet } from '../../services/apiService';
import { AppContext } from '../../context/context';


const ProductModal = (props) => {

  const { doApiAddToCart, darkMode, productId, favs, setComments, comments } = useContext(AppContext);
  const [productData, setProductData] = useState([]);
  const [productComments, setProductComments] = useState(''); // state send to apiAddToCart
  const [toogleComments, setToogleComments] = useState(false); // state send to apiAddToCart


  const refCommentsLg = useRef();
  const refCommentsSm = useRef();

  useEffect(() => {
    doApi();
    findProductComments(productId)
  }, [productId])

  const doApi = async () => {
    setToogleComments(false);
    const url = API_URL + "/products/single/" + productId;
    const dataInfo = await doApiGet(url);
    setProductData(dataInfo);
  }

  const setComment = (value) => {
    setProductComments(value);
  }

  // Looking for the same note of the product
  const findProductComments = (itemId) => {
    const itemFromCart = favs?.find((item) => item.id == itemId);
    setComments(itemFromCart?.comments);
    setProductComments(itemFromCart?.comments);
  }

  setTimeout(() => {
    setToogleComments(true);
  }, 300);

  return (
    <div >
      {productId ?
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{ backdropFilter: 'blur(5px)' }}
        >
          <Modal.Title id="contained-modal-title-vcenter" style={{ backgroundColor: `${darkMode ? 'rgb(26, 25, 25)' : 'white'}`, borderRadius: '5px 5px 0px 0px' }}>
            <span className={darkMode ? 'text-white p-3' : 'text-dark p-3'}>על המוצר:</span>
          </Modal.Title>
          <Modal.Body style={{ backgroundColor: `${darkMode ? 'rgb(26, 25, 25)' : 'white'}`, borderRadius: '0px 0px 5px 5px' }}>
            {/* lg... */}
            <div className='d-none d-lg-flex align-items-center justify-content-around'>
              <div >
                <h3 className={`text-decoration-underline text-center mb-3 ${darkMode ? 'text-white' : 'text-dark'}`}>{productData.name}</h3>
                <div>
                  <div className={`text-center pt-2 ${productData.sale_price != -1 ? 'fs-6 text-decoration-line-through' : 'fs-5'} ${darkMode ? 'text-warning' : 'text-dark'}`}> ₪{productData.price}{productData.category_url == 'fruits' || productData.category_url == 'vegetables' || productData.category_url == 'frozen' ? <span style={{ fontSize: '14px', color: `${darkMode ? '#ffc107' : ''}`, fontWeight: 'bold' }}> לק"ג</span> : <span style={{ fontSize: '14px', color: `${darkMode ? '#ffc107' : ''}`, fontWeight: 'bold' }}> ליח'</span>}</div>
                </div>
                <div className={`${productData.sale_price != -1 ? 'pt-2' : 'd-none'}`}>
                  <h5 className={`text-center ${darkMode ? 'text-warning' : 'text-dark'}`}> {productData.sale_price != -1 ? '₪' + productData.sale_price : ''}{productData.category_url == 'fruits' || productData.category_url == 'vegetables' || productData.category_url == 'frozen' ? <span style={{ fontSize: '14px', color: `${darkMode ? '#ffc107' : ''}`, fontWeight: 'bold' }}>{productData.sale_price != -1 ? 'לק"ג' : ''}</span> : <span style={{ fontSize: '14px', color: `${darkMode ? '#ffc107' : ''}`, fontWeight: 'bold' }}>{productData.sale_price != -1 ? ` ליח'` : ''}</span>}</h5>
                </div>
                <label className={`${darkMode ? 'text-white' : ''}`}>הערות על המוצר:</label>
                {localStorage[TOKEN_KEY] && <textarea ref={refCommentsLg} onChange={() => { setComment(refCommentsLg.current.value); }} defaultValue={toogleComments ? comments : ''} style={{ height: '100px', color: `${darkMode ? 'white' : ''}`, backgroundColor: `${darkMode ? 'rgb(15,15,15)' : ''}` }} name="" id="" cols="30" rows="10"></textarea>}
              </div>
              <img className={`rounded-3`} style={{ width: '60%' }} src={productData.image} alt="product img" />
            </div>
            {/* sm/md */}
            <div className='d-lg-none'>
              <h3 className={`text-decoration-underline text-center mb-3 ${darkMode ? 'text-white' : 'text-dark'}`}>{productData.name}</h3>
              <img className={`rounded-3`} style={{ width: '100%' }} src={productData.image} alt="product img" />
              <h5 className={`text-center mt-3 ${darkMode ? 'text-white' : 'text-dark'}`}>{productData.name}</h5>
              <div className={`text-center ${productData.sale_price != -1 ? 'fs-6 text-decoration-line-through' : 'fs-5'} ${darkMode ? 'text-warning' : 'text-dark'}`}> ₪{productData.price}{productData.category_url == 'fruits' || productData.category_url == 'vegetables' || productData.category_url == 'frozen' ? <span style={{ fontSize: '14px', color: `${darkMode ? '#ffc107' : ''}`, fontWeight: 'bold' }}> לק"ג</span> : <span style={{ fontSize: '14px', color: `${darkMode ? '#ffc107' : ''}`, fontWeight: 'bold' }}> ליח'</span>}</div>
              <div className={`${productData.sale_price != -1 ? '' : 'd-none'}`}>
                <h5 className={`text-center ${darkMode ? 'text-warning' : 'text-dark'}`}> {productData.sale_price != -1 ? '₪' + productData.sale_price : ''}{productData.category_url == 'fruits' || productData.category_url == 'vegetables' || productData.category_url == 'frozen' ? <span style={{ fontSize: '14px', color: `${darkMode ? '#ffc107' : ''}`, fontWeight: 'bold' }}>{productData.sale_price != -1 ? 'לק"ג' : ''}</span> : <span style={{ fontSize: '14px', color: `${darkMode ? '#ffc107' : ''}`, fontWeight: 'bold' }}>{productData.sale_price != -1 ? ` ליח'` : ''}</span>}</h5>
              </div>
            </div>
            <div className='d-flex justify-content-center'>
              {localStorage[TOKEN_KEY] && <textarea className='d-lg-none' ref={refCommentsSm} onChange={() => { setComment(refCommentsSm.current.value); }} defaultValue={toogleComments ? comments : ''} style={{ height: '100px', color: `${darkMode ? 'white' : ''}`, backgroundColor: `${darkMode ? 'rgb(15,15,15)' : ''}` }} placeholder='הערות . . .' name="" id="" cols="30" rows="10"></textarea>}
            </div>
            <div className="mt-3">
              <button onClick={() => { doApiAddToCart({ id: productId, amount: 1, comments: productComments }, true,false) }} className='btn btn-success'>הוסף לעגלה</button>
              <button onClick={() => { doApiAddToCart({ id: productId, amount: 1, comments: productComments }, true, true) }} className='btn btn-info me-2'>שמור הערה</button>
              <Button onClick={props.onHide} type="button" className="btn btn-danger float-start">
                סגור
              </Button>
            </div>
            {/* <GoogleRegister /> */}
          </Modal.Body>
        </Modal> : <h2>Loding . . .</h2>}
    </div>
  )
}

export default ProductModal