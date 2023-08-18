import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../../context/context';
import './style.css'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PagesComp from './PagesComp';
import { API_URL, TOKEN_KEY, doApiGet } from '../../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductModal from './ProductModal';



const Home = () => {

  const { setAr,
    ar,
    doApiAddToCart,
    darkMode,
    setLoading,
    loading,
    setProductId,
    itemInimation,
    setItemInimation,
    toogleInimation,
    setToogleInimation,
    setOpenModal,
    openModal
  } = useContext(AppContext);

  const { category } = useParams()
  const [query] = useSearchParams();
  const nav = useNavigate();


  useEffect(() => {
    doApi();
  }, [query])

  useEffect(() => {
    doApiCategory();
    setLoading(true);
  }, [category])


  setTimeout(() => {
    setLoading(false)
  }, 1500);

  // render of the products
  const doApi = async () => {
    const page = query.get("page") || 1;
    const url = API_URL + "/products?page=" + page
    const data = await doApiGet(url);
    setAr(data);
  }

  // search by category
  const doApiCategory = async () => {
    const page = query.get("page") || 1;
    const url = API_URL + "/products?page=" + page + "&category=" + `${category ? category : ""}`
    const data = await doApiGet(url);
    setAr(data);
  }

  return (
    <div style={{ minHeight: '500px' }}>
      <div className='container-lg mt-5 pt-5 pt-lg-0 mt-lg-4'>
        <div className='d-flex flex-wrap justify-content-center'>
          {ar.map((item, i) => {
            return (
              <div key={item._id} className='card card-responsive m-1  m-md-3 shadow-lg' style={{ maxWidth: '15rem', fontFamily: 'cursive', borderRadius: '18px 18px 18px 18px', border: 'gray' }}>
                <div onClick={() => {
                  setProductId(item._id);
                  setOpenModal(true);
                }} className='card-img position-relative'>  {loading ? <Skeleton width={"100%"} height={"190px"} /> : <img style={{ height: '190px', width: '100%', borderRadius: '15px 15px 0px 0px', cursor: 'pointer' }} src={item.image} alt='product image' />}
                  {loading ? <Skeleton /> : <div className={`position-absolute top-0 z-2 text-center fw-bold ${item.sale_price != -1 ? '' : 'd-none'}`} style={{ backgroundColor: '#e8f34f', height: '22px', width: '80px', borderRadius: '0px 10px 0px 10px', letterSpacing: '1px', fontFamily: 'sans-serif' }}>מבצע</div>}
                </div>
                <div className={`card-body ${darkMode ? 'bg-black' : 'bg-white'} `} style={{ borderRadius: '0px 0px 15px 15px' }}>
                  <div className='card-text'>
                    <div style={{ height: '70px' }}>
                      <h5 className={`${darkMode ? 'text-light' : 'text-dark'}`}>{loading ? <Skeleton /> : item.name}</h5>
                      <div>
                        {loading ? <Skeleton /> : <div className={`float-start pt-2 ${item.sale_price != -1 ? 'fs-6 text-decoration-line-through' : 'fs-5'} ${darkMode ? 'text-warning' : 'text-dark'}`}> ₪{item.price}{item.category_url == 'fruits' || item.category_url == 'vegetables' || item.category_url == 'frozen' ? <span style={{ fontSize: '14px', color: `${darkMode ? '#ffc107' : ''}`, fontWeight: 'bold' }}> לק"ג</span> : <span style={{ fontSize: '14px', color: `${darkMode ? '#ffc107' : ''}`, fontWeight: 'bold' }}> ליח'</span>}</div>} <br />
                      </div>
                      <div className={`${item.sale_price != -1 ? 'pt-2' : 'd-none'}`}>
                        {loading ? <Skeleton /> : <h5 className={`float-start ${darkMode ? 'text-warning' : 'text-dark'}`}> {item.sale_price != -1 ? '₪' + item.sale_price : ''}{item.category_url == 'fruits' || item.category_url == 'vegetables' || item.category_url == 'frozen' ? <span style={{ fontSize: '14px', color: `${darkMode ? '#ffc107' : ''}`, fontWeight: 'bold' }}>{item.sale_price != -1 ? 'לק"ג' : ''}</span> : <span style={{ fontSize: '14px', color: `${darkMode ? '#ffc107' : ''}`, fontWeight: 'bold' }}>{item.sale_price != -1 ? ` ליח'` : ''}</span>}</h5>}
                      </div>
                    </div>

                    <div className='d-flex flex-column flex-sm-row justify-content-center gap-sm-4' style={{ marginTop: '30%' }}>
                      {loading ? <Skeleton /> :
                        <div>
                          < button onClick={() => {
                            { localStorage[TOKEN_KEY] && setItemInimation(item.image); }
                            { localStorage[TOKEN_KEY] && setToogleInimation(true) }
                            doApiAddToCart({ id: item._id, amount: 1 },true,false);

                          }} className='btn btn-warning me-0 px-4  px-lg-3'><FontAwesomeIcon icon={faCartPlus} size='lg' /> </button>
                        </div>

                      }
                      {loading ? <Skeleton /> :
                        <div className='mt-2 mt-sm-0'>
                          <button onClick={() => {
                            doApiAddToCart({ id: item._id, amount: 1 },true,false);
                            setTimeout(() => {
                              nav("/cart");
                            }, 200)
                          }} className='btn btn-success float-sm-start me-0 px-4 px-lg-4'>קנו עכשיו</button>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          {toogleInimation && <div className="item-animation d-none d-lg-flex">
            <img src={itemInimation} className='rounded-4' alt="" height="60px" width="60px" />
            <span className='d-none'>
              {setTimeout(() => {
                setToogleInimation(false);
              }, 2000)}
            </span>

          </div>
          }
        </div >
        <span dir='ltr' onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }} className='display-6 text-center'><PagesComp apiPages={API_URL + "/products/count"} linkTo="?page=" linkCss={`${darkMode ? 'btn btn-warning' : 'btn btn-primary'} fw-bold ms-3 mt-4 mb-4`} /></span>
      </div>
      {openModal && <ProductModal
        show={openModal}
        onHide={() => setOpenModal(false)}
      />}
    </div>
  )
}

export default Home