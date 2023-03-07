import React from 'react';
import logo from '../../assets/logo.png';

import { BsFillTelephoneFill } from 'react-icons/bs';
import { AiFillFacebook } from 'react-icons/ai';

import {
  FooterContainer,
  FooterLeft,
  FooterRight,
  FooterCopywriting,
  FooterWrap,
  FooterPhoneBtn,
  FooterLogoContainer,
  FooterBarrier,
  FooterLogo,
  FooterLinksContainer,
  FooterLinksFirst,
  FooterLink,
  FooterLinksSecound,
  FooterLinksThird,
  FooterPaymentImg,
  FooterPhones,
  FooterNames,
  FooterSupportName,
  FooterMainNumber,
  FooterFacebookLink,
  FooterAdress,
} from './FooterElements.js';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <FooterContainer>
        <FooterPhoneBtn>
          <BsFillTelephoneFill />
        </FooterPhoneBtn>
        <FooterWrap>
          <FooterLeft>
            <FooterLogoContainer>
              <FooterBarrier />
              <FooterLogo src={logo} />
            </FooterLogoContainer>
            <FooterLinksContainer>
              <FooterLinksFirst>
                <FooterLink to='/about'>{t('footer.about_us')}</FooterLink>
                <FooterLink to='/oferts'>{t('footer.discounts')}</FooterLink>
                <FooterLink to='/new_products'>
                  {t('footer.new_products')}
                </FooterLink>
                <FooterLink to='/news'>{t('footer.news')}</FooterLink>
                <FooterLink to='/support'>{t('footer.support')}</FooterLink>
                <FooterLink to='/portfolio'>{t('footer.portfolio')}</FooterLink>
              </FooterLinksFirst>
              <FooterLinksSecound>
                <FooterLink to='/contacts'>{t('footer.contacts')}</FooterLink>
                <FooterLink to='/services'>{t('footer.services')}</FooterLink>
                <FooterLink to='/brands'>{t('footer.brands')}</FooterLink>
                <FooterLink to='/cooperation'>
                  {t('footer.cooperation')}
                </FooterLink>
              </FooterLinksSecound>
              <FooterLinksThird>
                <FooterLink to='/payment'>{t('footer.pay')}</FooterLink>
                <FooterLink to='/delivery'>{t('footer.delivery')}</FooterLink>
                <FooterLink to='/guarantee'>{t('footer.guarantee')}</FooterLink>
              </FooterLinksThird>
              <FooterPaymentImg src='https://visit-alandalus.com/wp-content/uploads/2019/12/paypal-visa-mastercard-png.png' />
            </FooterLinksContainer>
          </FooterLeft>
          <FooterRight>
            <FooterMainNumber>
              <FooterFacebookLink>
                496 20 08
                <AiFillFacebook />
              </FooterFacebookLink>
            </FooterMainNumber>
            <FooterPhones>+38(044) 496-20-09</FooterPhones>
            <FooterPhones>
              +38(044) 407-17-67
              <FooterNames>{t('footer.faks')}</FooterNames>
            </FooterPhones>
            <FooterPhones>
              +38(067) 445-37-23
              <FooterNames>{t('footer.anton')}</FooterNames>
            </FooterPhones>
            <FooterPhones>
              +38(067) 404-50-80
              <FooterNames>{t('footer.Arkadij')} </FooterNames>
            </FooterPhones>
            <FooterPhones>
              +38(067) 445-37-24
              <FooterNames>{t('footer.Pavel')}</FooterNames>
            </FooterPhones>
            <FooterPhones>
              +38(097) 593-14-37
              <FooterSupportName>
                {t('footer.support_service')}
              </FooterSupportName>
            </FooterPhones>
          </FooterRight>
        </FooterWrap>
      </FooterContainer>
      <FooterAdress>
        <span>{t('footer.master-chp')}</span>
        <span>{t('footer.adres')}</span>
      </FooterAdress>
      <FooterCopywriting>
        © Copyright © 1993 - 2018 master-ua.com
      </FooterCopywriting>
    </>
  );
};

export default Footer;
