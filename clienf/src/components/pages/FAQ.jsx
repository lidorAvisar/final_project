import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import './style.css';

const FAQ = () => {

    const { darkMode } = useContext(AppContext);

    return (
        <>
            <Container className='mt-5 pt-5 pt-lg-0'>
                <Row>
                    <Col>
                        <div className={`${darkMode?'dark-true':'dark-false'}`}>
                            <h2 className='text-center mb-2 pb-4 fst-italic text-primary'>שאלות נפוצות</h2>
                            <Accordion className={`${darkMode?'dark-true':'dark-false'}`}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>למה לקנות דווקא אצלנו? </Accordion.Header>
                                    <Accordion.Body className='fw-medium'>
                                        אצלנו בסופר מרקט אונליין תקבלו את השירות הכי טוב שקיים. <br /> בנוסף לשירות משלוחים שעובד בלי סוף בכדי לאפשר ללקוחות שלנו חווית קנייה קצרה ונעימה.
                                    </Accordion.Body >
                                </Accordion.Item >
                                <Accordion.Item className='mt-2' eventKey="1">
                                    <Accordion.Header>האם אני חייב להתחבר לאתר כדי להזמין מוצרים?</Accordion.Header>
                                    <Accordion.Body className='fw-medium'>
                                        כן, נדרש להתחבר/להירשם בכדי לבצע מעקב על ההזמנות שלנו.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='mt-2' eventKey="2">
                                    <Accordion.Header>איך ניתן למצוא מוצרים מסויימים בסופר?</Accordion.Header>
                                    <Accordion.Body className='fw-medium'>
                                        אצלנו באתר ישנה מערכת לסינון מוצרים, בנוסף לחיפוש חופשי על ידי המשתמש.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='mt-2' eventKey="3">
                                    <Accordion.Header>אני רוצה לשנות את הפרטים של המשתמש שלי, איפה ניתן לשנות את זה?</Accordion.Header>
                                    <Accordion.Body className='fw-medium'>
                                        כל הפרטים של המשתמש ניתנים לשינוי באיזור האישי שנמצא באתר.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='mt-2' eventKey="4">
                                    <Accordion.Header>האם המחירים באתר כלולים במע"מ?</Accordion.Header>
                                    <Accordion.Body className='fw-medium'>
                                        כן, כלל המוצרים בסופר כלולים במע"מ.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='mt-2' eventKey="5">
                                    <Accordion.Header>כמה עולה להזמין משלוח באתר?</Accordion.Header>
                                    <Accordion.Body className='fw-medium'>
                                        מחיר משלוח אצלנו הוא בעלות של 20 שקלים.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='mt-2' eventKey="6">
                                    <Accordion.Header>הוספתי מוצרים לעגלה, ואני רוצה לשלם במועד מאוחר יותר, האם ניתן?</Accordion.Header>
                                    <Accordion.Body className='fw-medium'>
                                        כן, כלל המוצרים שהלקוח מוסיף לעגלה נשמרים עד לרגע ביצוע ההזמנה/ביטול ההזמנה
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='mt-2 mb-5' eventKey="7">
                                    <Accordion.Header>האם יש באתר משלוחים לכל הארץ?</Accordion.Header>
                                    <Accordion.Body className='fw-medium'>
                                        אכן, המשלוחים שלנו מגיעים מדן ועד אילת בכדי לגרום ללקוחות שלנו חווית קנייה בטוחה ומהירה
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default FAQ;