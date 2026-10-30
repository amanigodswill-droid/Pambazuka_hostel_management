import { useState } from "react";
import "../styles/FAQ.css";

function FAQ() {
    const[openQuestion,setOpenQuestion] = useState(null);
    const questions=[{
        question:"How do I find a hostel?",
        answer:"Go to the Hostels page and browse the available hostels.You can also use the serach and filter options to find a hostel that matches your preferences.",
        },
        {
           question:"Can I save a hostel for later?",
           answer:"Yes.Click the Add to Favorites button on a hostel card.You can find your saved hostels on the Favorites page.",
        },
        {
            question:"How do I book a hostel?",
            answer:"Open the hostel details page and click the booking option.Fill in your student and booking information,choose a payment method,and confirm your booking.",
        },
        {
            question:"What payment methods are available?",
            answer:"HostelHub currently only supports M-pesa and Bank payment options.",
        },
        {
            question:"Will I receive a booking receipt?",
            answer:"Yes.After completing your booking,HostelHub generates a booking receipt containing your booking and payment information.",
        },
        {
            question:"Can I print my receipt?",
            answer:"Yes.The receipt page has a Print/Download Receipt button that allows you to print or save the receipt.",
        },
        {
            question:"Where are the hostels located?",
            answer:"The hostels listed on HostelHub are located in different areas around Eldoret,located in different areas around Eldoret,including areas near Moi University and the University of Eldoret.",
        },
    ];

    function toggleQuestion(index) {if(openQuestion ===index){setOpenQuestion(null)}
    else {setOpenQuestion(index);}
}

return (
    <main className="faq-page">
        <section className="faq-header">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to some of the common questions about using HostelHub Eldoret.</p>
            </section>
            <section className="faq-list">
            {questions.map((item,index) =>(
                <div className="faq-item" key={index}>
                    <button className="faq-question"  onClick={() =>toggleQuestion(index)}>
                        <span>{item.question}</span>
                        <span>{openQuestion===index?"-":"+"}</span>
                    </button>
{openQuestion ===index && (
    <div className="faq-answer">
        <p>{item.answer}</p>
        </div>
)}
                </div>
            ))}
        </section>
    </main>
);
}

export default FAQ;