import React from 'react';
import { Flex, Text, Link, Box } from '@chakra-ui/react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <Box
      bgImage="url('/images/image_2.jpg')"
      bgSize="cover"
      bgPosition="center"
      minHeight="400px"
      py="50px"
      px="20px"
      position="relative"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 46, 120, 0.900)"
      />
      <Flex
        maxW="1200px"
        mx="auto"
        justify="space-between"
        direction={['column', 'column', 'row']}
        align={['center', 'center', 'flex-start']}
        position="relative"
        zIndex="1"
        padding="70px 0"
      >
        <Flex direction="column" mb={['40px', '40px', '0']} justify="left" align="left">
          <Box maxW="285px" maxH="330px">
            <Text
              fontSize="16px"
              fontWeight="700"
              fontFamily="Nunito Sans, Arial, sans-serif"
              marginBottom="40px"
              position="relative"
              letterSpacing="4px"
              color="#f5e4c3"
              textTransform="uppercase"
            >
              Harbor Lights
            </Text>
            <Text color="white">
              Far far away, behind the word mountains, far from the countries Vokalia and
              Consonantia, there live the blind texts.
            </Text>
            <Flex mt="20px" justify="left" align="left">
              <Link
                as="a"
                href="https://www.facebook.com"
                color="white"
                mr="10px"
                marginRight="20px"
                _hover={{ color: '#f5e4c3', transform: 'scale(1.1)' }}
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                as="a"
                href="https://www.twitter.com"
                color="white"
                mr="10px"
                marginRight="20px"
                _hover={{ color: '#f5e4c3', transform: 'scale(1.1)' }}
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                as="a"
                href="https://www.instagram.com"
                color="white"
                _hover={{ color: '#f5e4c3', transform: 'scale(1.1)' }}
              >
                <FaInstagram size={20} />
              </Link>
            </Flex>
          </Box>
        </Flex>
        <Flex direction="column" mb={['40px', '40px', '0']} ml={['0', '0', '50px']} justify="center" align="center">
          <Box maxW="285px" maxH="330px">
            <Text
              fontSize="16px"
              fontWeight="700"
              fontFamily="Nunito Sans, Arial, sans-serif"
              marginBottom="40px"
              position="relative"
              letterSpacing="4px"
              color="#f5e4c3"
              textTransform="uppercase"
            >
              Useful Links
            </Text>
            <Flex direction="column" justify="left" align="left">
              <Link
                as="a"
                href="/home"
                color="white"
                mb="25px"
                _hover={{ color: '#f5e4c3', transform: 'scale(1.1)' }}
              >
                Home
              </Link>
              <Link
                as="a"
                href="/rooms"
                color="white"
                mb="25px"
                _hover={{ color: '#f5e4c3', transform: 'scale(1.1)' }}
              >
                Our Rooms
              </Link>
              <Link
                as="a"
                href="/restaurant"
                color="white"
                mb="25px"
                _hover={{ color: '#f5e4c3', transform: 'scale(1.1)' }}
              >
                Restaurant
              </Link>
              <Link
                as="a"
                href="/about"
                color="white"
                mb="25px"
                _hover={{ color: '#f5e4c3', transform: 'scale(1.1)' }}
              >
                About Us
              </Link>
              <Link
                as="a"
                href="/blog"
                color="white"
                mb="25px"
                _hover={{ color: '#f5e4c3', transform: 'scale(1.1)' }}
              >
                Blog
              </Link>
              <Link
                as="a"
                href="/contact"
                color="white"
                mb="25px"
                _hover={{ color: '#f5e4c3', transform: 'scale(1.1)' }}
              >
                Contact
              </Link>
            </Flex>
          </Box>
        </Flex>
        <Flex direction="column" mb={['40px', '40px', '0']} ml={['0', '0', '50px']} justify="center" align="center">
          <Box maxW="285px" maxH="330px">
            <Text
              fontSize="16px"
              fontWeight="700"
              fontFamily="Nunito Sans, Arial, sans-serif"
              marginBottom="40px"
              position="relative"
              letterSpacing="4px"
              color="#f5e4c3"
              textTransform="uppercase"
            >
              Privacy
            </Text>
            <Flex direction="column" justify="left" align="left">
              <Link
                as="a"
                href="/career"
                color="white"
                mb="25px"
                _hover={{ color: '#f5e4c3', transform: 'scale(1.1)' }}
              >
                Career
              </Link>
              <Link
                as="a"
                href="/about-us"
                color="white"
                mb="25px"
                _hover={{ color: '#f5e4c3', transform: 'scale(1.1)' }}
              >
                About Us
              </Link>
              <Link
                as="a"
                href="/contact-us"
                color="white"
                mb="25px"
                _hover={{ color: '#f5e4c3', transform: 'scale(1.1)' }}
              >
                Contact Us
              </Link>
              <Link
                as="a"
                href="/services"
                color="white"
                mb="25px"
                _hover={{ color: '#f5e4c3', transform: 'scale(1.1)' }}
              >
                Services
              </Link>
            </Flex>
          </Box>
        </Flex>
        <Flex direction="column" justify="left" align="left">
          <Box maxW="285px" maxH="330px">
            <Text
              fontSize="16px"
              fontWeight="700"
              fontFamily="Nunito Sans, Arial, sans-serif"
              marginBottom="40px"
              position="relative"
              letterSpacing="4px"
              color="#f5e4c3"
              textTransform="uppercase"
            >
              Have a Question?
            </Text>
            <Text color="white">
              203 Fake St. Mountain View, San Francisco, California, USA
              <br />
              +2 392 3929 210
              <br />
              info@yourdomain.com
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;