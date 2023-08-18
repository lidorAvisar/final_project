import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../../context/context';
import ProductModal from './ProductModal';

const UserCartItem = ({ item }) => {

    const {
        doApiAddToCart,
        darkMode,
        favs,
        doApiRemoveItem,
        doApiCart,
        userInfo,
        setComments,
        setProductId
    } = useContext(AppContext);

    const [amount, setAmount] = useState(1); // amount of the product in the cart
    const [openModal, setOpenModal] = useState();

    useEffect(() => {
        findAmountProduct(item._id);
    }, [])

    // Looking for the same product and placing a quantity on it
    const findAmountProduct = (itemId) => {
        const itemFromCart = favs?.find((item) => item.id == itemId);
        setAmount(itemFromCart?.amount);
    }

    // remove item from cart
    const updateCartItem = (id) => {
        doApiRemoveItem(id)
        doApiCart(userInfo)
    }

    return (
        <>
            <div dir='ltr' className={`items position-relative rounded`} style={{ backgroundColor: `${darkMode ? 'rgb(27, 25, 25)' : 'white'}`, boxShadow: `${darkMode ? '5px 5px 4px -1px white' : ''}`, height: '125px' }}>

                <div dir='rtl' className="d-flex justify-content-between align-items-center mt-3 p-2 rounded">
                    <div className="d-flex flex-row align-items-center"><img className="rounded" src={item.image} width="65" height="50px" />
                        <div className="ml-2"><span className="font-weight-bold d-block pe-3">{item.name}</span></div>
                    </div>
                    <div>
                        <div className="d-flex flex-row align-items-center"><span className={`d-block ml-5 font-weight-bold ${item.sale_price != -1 ? 'fs-6 text-decoration-line-through' : 'fs-5'}`}>₪{item.price}</span></div>
                        <div className={`d-flex flex-row align-items-center ${item.sale_price != -1 ? 'fs-5' : 'd-none'}`}><span className="d-block ml-5 font-weight-bold">₪{item.sale_price}</span></div>
                    </div>
                </div>

                {/* amount of the cart and trash*/}
                <div className='d-flex  justify-content-between align-items-center mt-2'>
                    <div>
                        <span onClick={() => {
                            updateCartItem(item._id)
                        }} className='ms-3 mt-1 fs-5' style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faTrashCan} style={{ color: "#ce4b4b", }} />
                        </span>
                        <span onClick={() => {
                            setProductId(item._id);
                            setOpenModal(true);
                        }} className='ms-3 mt-1 fs-5' style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#417ee6", }} />
                        </span>
                    </div>
                    <div className='btn-group me-2'>
                        <button onClick={() => { doApiAddToCart({ id: item._id }, false), findAmountProduct(item._id) }} className={`btn btn-warning rounded-end-0 rounded-end-0 border  ${amount == 1 && 'disabled'}`} style={{ backgroundColor: `${darkMode ? '' : 'rgb(250,250,250)'}` }} >&ndash;</button>
                        <span className='px-3 py-2' style={{ backgroundColor: `${darkMode ? 'rgb(42,42,42)' : 'rgb(230,230,230)'}` }}>{amount}</span>
                        <button onClick={() => { doApiAddToCart({ id: item._id }, true), findAmountProduct(item._id) }} className='btn btn-warning rounded-start-0 rounded-start-0 border' style={{ backgroundColor: `${darkMode ? '' : 'rgb(250,250,250)'}` }}>+</button>
                    </div>
                </div>
                {/* {openModal && <CommentsOfProduct
                    show={openModal}
                    onHide={() => setOpenModal(false)}
                />} */}
                {openModal && <ProductModal
                    show={openModal}
                    onHide={() => setOpenModal(false)}
                />}
            </div>
        </>
    )
}

export default UserCartItem