import React from 'react';
import { Link } from '@chakra-ui/core';
import NextLink from 'next/link';
import WaitingForYou from '../../components/illustrations/waiting-for-you';
import Header from '../../components/header';
import Container from '../../components/ui/container';
import AccountFormTemplate from '../../components/ui/templates/account-form-template';
import ForgotPasswordForm from '../../components/forms/forgot-password-form';

function ForgotPassword() {
  return (
    <>
      <Header />
      <Container>
        <AccountFormTemplate
          form={<ForgotPasswordForm withTitle />}
          illustration={<WaitingForYou />}
        >
          Did you remember?
          <NextLink href="/account/login">
            <Link ml={1} color="linkBlue">
              Log in.
            </Link>
          </NextLink>
        </AccountFormTemplate>
      </Container>
    </>
  );
}

export default ForgotPassword;
