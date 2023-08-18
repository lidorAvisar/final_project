import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AppContext } from '../../context/context';
import './style.css';


const ContactUs = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [disabled, setDisabled] = useState(false);

    const { darkMode } = useContext(AppContext);

    // Function that displays a success toast on bottom right of the page when form submission is successful
    const toastifySuccess = () => {
        toast.success('ההודעה התקבלה בהצלחה!', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            className: 'submit-feedback success',
            toastId: 'notifyToast',
            theme: 'dark'
        });
    };

    // Function called on submit that uses emailjs to send email of valid contact form
    const onSubmit = async (data) => {
        // Destrcture data object
        const { name, email, subject, message } = data;
        try {
            // Disable form while processing submission
            setDisabled(true);

            // Define template params
            const templateParams = {
                name,
                email,
                subject,
                message
            };

            // Reset contact form fields after submission
            reset();
            // Display success toast
            toastifySuccess();
            // Re-enable form submission
            setDisabled(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className='ContactForm container' style={{ marginTop: '8vh' }}>
            <h1 className='text-center text-decoration-underline text-primary fst-italic'>צור קשר</h1>
            <div className='d-md-flex justify-content-center mt-4 container'>
                <div className='row mt-5 mt-lg-0'>
                    <div className='col-12 text-center' style={{ borderRadius: '10px 10px 10px 10px', backgroundColor: `${darkMode ? 'rgb(20, 20, 20)' : 'white'}` }}>
                        <div className='contactForm'>
                            <form id='contact-form' className='pt-5 ms-3' onSubmit={handleSubmit(onSubmit)} noValidate>
                                {/* Row 1 of form */}
                                <div className='d-md-flex align-items-center formRow gap-3'>
                                    <div className='col-12 col-md-6 mt-2'>
                                        <input
                                            type='text'
                                            name='name'
                                            {...register('name', {
                                                required: {
                                                    value: true,
                                                    message: 'שדה זה הוא חובה'
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: 'Please use 30 characters or less'
                                                }
                                            })}
                                            className='form-control formInput'
                                            placeholder='שם פרטי ומשפחה'
                                        ></input>
                                        {errors.name && <span className='errorMessage text-danger'>{errors.name.message}</span>}
                                    </div>
                                    <div className='col-12 col-md-6 mt-4 mt-md-2'>
                                        <input
                                            type='email'
                                            name='email'
                                            {...register('email', {
                                                required: true,
                                                pattern:
                                                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                            })}
                                            className='form-control formInput'
                                            placeholder='כתובת אימייל'

                                        ></input>
                                        {errors.email && (
                                            <span className='errorMessage text-danger'> שדה זה הוא חובה</span>
                                        )}
                                    </div>
                                </div>
                                {/* Row 2 of form */}
                                <div className='row formRow mt-4'>
                                    <div className='col'>
                                        <input
                                            type='text'
                                            name='subject'
                                            {...register('subject', {
                                                required: {
                                                    value: true,
                                                    message: 'שדה זה הוא חובה'
                                                },
                                                maxLength: {
                                                    value: 75,
                                                    message: 'Subject cannot exceed 75 characters'
                                                }
                                            })}
                                            className='form-control '
                                            placeholder='נושא ההודעה'
                                        ></input>
                                        {errors.subject && (
                                            <span className='errorMessage text-danger'>{errors.subject.message}</span>
                                        )}
                                    </div>
                                </div>
                                {/* Row 3 of form */}
                                <div className='row formRow mt-4'>
                                    <div className='col'>
                                        <textarea
                                            rows={3}
                                            name='message'
                                            {...register('message', {
                                                required: true
                                            })}
                                            className={`form-control formInput ${darkMode?'dark_true':'dark_false'}`}
                                            placeholder='פירוט ההודעה'
                                            style={{ resize: 'none', height: '66px' }}
                                        ></textarea>
                                        {errors.message && <span className='errorMessage text-danger'>שדה זה הוא חובה</span>}
                                    </div>
                                </div>

                                <button className='btn btn-primary mt-4 mb-4 px-5' disabled={disabled} type='submit'>
                                    שלח
                                </button>
                            </form>
                        </div>
                        <ToastContainer />
                    </div>
                </div>
                <div className="img mt-5 mt-lg-0  d-flex" style={{ height: '92%', width: '517px', borderRadius: '10px 10px 10px 10px', backgroundColor: `${darkMode ? 'rgb(20, 20, 20)' : 'white'} ` }} >
                    <img className='d-none d-md-flex me-5' style={{ height: '95%', width: '91%', maxHeight: '620px', borderRadius: '10px 0px 0px 10px' }} src="https://cdn.pixabay.com/photo/2017/10/28/13/20/board-2897044_640.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default ContactUs;