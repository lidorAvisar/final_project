import React, { useEffect, useState } from 'react'
import { Link,  } from 'react-router-dom';
import { doApiGet } from '../../services/apiService';

const PagesComp = (props) => {

    const [pages, setPages] = useState();
 

    useEffect(() => {
        doApi();
    }, [props.apiPages])

    const doApi = async () => {
        const resp = await doApiGet(props.apiPages);
        setPages(resp.pages);
        
    }


    return (
        <div>
            {/* <span className='d-none d-md-flex'>Page: </span> */}
            {[...Array(pages)].map((item, i) => {
                return (
                    <Link onClick={()=>{
                    }} to={ props.linkTo + (i + 1)} key={i} className={props.linkCss}>{i + 1}</Link>
                )
            })}
            
        </div>
    )
}

export default PagesComp