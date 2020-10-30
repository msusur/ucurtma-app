import React from 'react';
import { Heading, Flex, Box, Text, Button } from '@chakra-ui/core';
import { CheckCircle, ArrowRight } from 'react-feather';

function VerificationSettings({ withTitle, isVerified }) {
  return (
    <>
      {withTitle && (
        <Heading mb={4} mt={8} size="sm" color="gray.600">
          Verification
        </Heading>
      )}
      <Flex alignItems="center">
        <Box
          flexShrink={0}
          as={CheckCircle}
          size="24px"
          color={isVerified ? 'blue.400' : 'gray.600'}
        />
        <Text ml={4} color={isVerified ? 'blue.400' : 'gray.600'}>
          {isVerified
            ? 'Verificated User'
            : 'You’re not a verified user at the moment. To create a campaign, you should become a verified user.'}
        </Text>
      </Flex>
      {/* <Link href="/account/my-account/verification"> */}
      {!isVerified && (
        <Button
          mt={2}
          ml={4}
          rightIcon={ArrowRight}
          variant="ghost"
          color="blue.400"
        >
          Apply
        </Button>
      )}
      {/* </Link> */}
    </>
  );
}

VerificationSettings.defaultProps = {
  withTitle: true,
};

export default VerificationSettings;
