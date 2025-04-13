import React, { useState } from 'react';
import './Contact.css';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const contactCards = [
  {
    icon: <ChatBubbleOutlineIcon />,
    title: 'Chat to marketing',
    description: 'Speak to our friendly team.',
    linkText: 'marketing@god.com',
    linkHref: 'mailto:marketing@god.com',
  },
  {
    icon: <SupportAgentIcon />,
    title: 'Chat to support',
    description: 'We’re here to help.',
    linkText: 'support@god.com',
    linkHref: 'mailto:support@god.com',
  },
  {
    icon: <LocationOnIcon />,
    title: 'Visit us',
    description: 'Visit our office HQ.',
    linkText: 'View on Google Maps',
    linkHref: 'https://maps.google.com',
  },
  {
    icon: <PhoneIcon />,
    title: 'Call us',
    description: 'Mon-Fri from 8am to 5pm.',
    linkText: '+1 (555) 000-0000',
    linkHref: 'tel:+15550000000',
  },
];

const faqs = [
  {
    question: 'How do I find a religious institution near me?',
    answer: 'You can use our search tool to enter your location and select your religion and denomination preferences.',
  },
  {
    question: 'Can I filter by denomination or belief?',
    answer: 'Yes, we offer filters for denominations, worship style, language, and more to match your preferences.',
  },
  {
    question: 'Is this service free to use?',
    answer: 'Yes! Our platform is completely free to help you connect with the right religious community.',
  },
  {
    question: 'How accurate is the information?',
    answer: 'We verify institution details regularly, but you can also report outdated info using our feedback form.',
  },
  {
    question: 'Can I submit a new religious institution?',
    answer: 'Absolutely! Just click the “Submit a Listing” button and fill out the required details.',
  },
];

const Contact = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="contactPageContainer">
      <div className="contactTitleAndHeaderContainer">
        <div className="contactTitle">Contact our friendly team</div>
        <div className="contactHeader">Let us know how we can help you</div>
      </div>

      <div className="contactCardContainer">
        {contactCards.map((card, index) => (
          <div className="contactCard" key={index}>
            <div className="contactIcon">{card.icon}</div>
            <div className="contactCardTitle">{card.title}</div>
            <div className="contactCardDescription">{card.description}</div>
            <a href={card.linkHref} className="contactCardLink" target="_blank" rel="noreferrer">
              {card.linkText}
            </a>
          </div>
        ))}
      </div>

      <div className="faqSection">
        <h2 className="faqTitle">Frequently asked questions</h2>
        <div className="faqList">
          {faqs.map((faq, index) => (
            <div key={index} className="faqItem">
              <div className="faqQuestion" onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                {openIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>
              {openIndex === index && <div className="faqAnswer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
