import React, { useState } from 'react';
import districtsData from '../data/districts.json';
import countriesData from '../data/countries.json'
import tehsilData from '../data/tehsilData.json'
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input'
import "./home.css"
import axios from "axios"
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    useToast,
    SimpleGrid,
    Select,
    Stack,
    Radio,
    RadioGroup,
    Text
} from '@chakra-ui/react';

const MyForm = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({
        fullName: '',
        relation: '',
        email: '',
        mobileNumber: '',
        gender: '',
        currentAddress: '',
        currentstate: '',
        currentdistrict: '',
        currentcountry: '',
        currentcountrystate: '',
        currentcountrycity: '',
        district: '',
        tehsil: '',
        village: '',
        occupation: '',
        consent: false,
        name: ''
    });

    const [addressValue, setaddressValue] = useState("")

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log(name, value, type, checked)
        const newValue = type === 'checkbox' ? checked : value;

        const updatedFormData = { ...formData };
        if (updatedFormData.hasOwnProperty(`${name}_error`)) {
            updatedFormData[`${name}_error`] = false;
        }

        setFormData({
            ...updatedFormData,
            [name]: newValue
        });
    };


    const handleSubmit = () => {

        if (!formData.consent) {
            toast({
                description: "Please give your consent to proceed",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const emptyFields = Object.keys(formData).filter(key => {

            if (addressValue === "India") {
                return (
                    key !== "currentcountry" &&
                    key !== "currentcountrystate" &&
                    key !== "currentcountrycity" &&
                    formData[key] === ''
                );
            } else if (addressValue === "Abroad") {
                return (
                    key !== "currentstate" &&
                    key !== "currentdistrict" &&
                    formData[key] === ''
                );
            }
            return formData[key] === '';
        });

        if (emptyFields.length > 0) {
            const updatedFormData = { ...formData };
            emptyFields.forEach(field => {
                updatedFormData[`${field}_error`] = true;
            });
            setFormData(updatedFormData);

            toast({
                description: "please enter all fields",
                status: "error",
                duration: 5000,
                isClosable: true,
            });

        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmailValid = emailRegex.test(formData.email);

            if (!isEmailValid) {
                toast({
                    description: "Please enter a valid email address",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
            const submitData = {
                fullName: formData.fullName,
                relation: formData.relation,
                email: formData.email,
                mobileNumber: formData.mobileNumber,
                gender: formData.gender,
                currentAddress: {
                    address: formData.currentAddress,
                    state: addressValue === 'India' ? formData.currentstate : formData.currentcountrystate,
                    city: addressValue === 'India' ? formData.currentdistrict : formData.currentcountrycity,
                    country: addressValue === 'India' ? 'India' : formData.currentcountry
                },
                district: formData.district,
                tehsil: formData.tehsil,
                village: formData.village,
                occupation: formData.occupation,
                name: formData.name
            };
            axios.post('http://localhost:3001/api/submit', submitData)
                .then(response => {
                    console.log('Form data saved:', response.data);
                    toast({
                        description: "Data saved successfully",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                    });
                })
                .catch(error => {
                    console.error('Error saving form data:', error);
                });
            console.log(submitData);

        }
    };


    const handleReset = () => {
        setFormData({
            fullName: '',
            relation: '',
            email: '',
            mobileNumber: '',
            gender: '',
            currentAddress: '',
            currentstate: '',
            currentdistrict: '',
            currentcountry: '',
            currentcountrystate: '',
            currentcountrycity: '',
            district: '',
            tehsil: '',
            village: '',
            occupation: '',
            consent: false,
            name: ''
        });
    };

    return (
        <div className='main-div'>
            <Box p={2}>
                <Stack spacing={4}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl isRequired isInvalid={formData.fullName_error}>
                            <FormLabel htmlFor="fullName">Full Name</FormLabel>
                            <Input
                                id="fullName"
                                placeholder="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl isRequired isInvalid={formData.relation_error}>
                            <FormLabel htmlFor="relation">S/o, W/o, D/o</FormLabel>
                            <Input
                                id="relation"
                                placeholder="S/o, W/o, D/o Name"
                                name="relation"
                                value={formData.relation}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl isRequired isInvalid={formData.email_error}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl isRequired isInvalid={formData.mobileNumber_error}>
                            <FormLabel htmlFor="mobileNumber">Mobile Number</FormLabel>
                            <PhoneInput
                                style={{
                                    padding: '0.5rem',
                                    border: '1px solid #CBD5E0',
                                    borderRadius: '0.375rem',
                                    fontSize: '1rem',
                                    lineHeight: '1.4',
                                    color: '#1A202C',
                                    backgroundColor: '#ffffff',
                                    "&:focus": {
                                        outline: "blue",
                                        borderColor: 'blue'
                                    }
                                }}
                                placeholder="Enter phone number"

                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={(value) => setFormData({
                                    ...formData,
                                    "mobileNumber": value
                                })}
                            />
                        </FormControl>

                        <FormControl isRequired isInvalid={formData.gender_error}>
                            <FormLabel htmlFor="gender">Gender</FormLabel>
                            <Select
                                id="gender"
                                placeholder="-- Select Gender --"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Select>
                        </FormControl>
                    </SimpleGrid>

                    {/* Current Address */}
                    <FormControl isRequired isInvalid={formData.currentAddress_error}>
                        <FormLabel>Current Address</FormLabel>
                        <RadioGroup
                            onChange={(value) => setaddressValue(value)}
                            value={addressValue}
                            name='addressValue'
                        >
                            <Stack direction="row">
                                <Radio value="India">India</Radio>
                                <Radio value="Abroad">Abroad</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>

                    {/* Current Address options for India */}
                    {addressValue === "India" && (
                        <>
                            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                                <FormControl isRequired isInvalid={formData.currentAddress_error}>
                                    <FormLabel htmlFor="relation">Address</FormLabel>
                                    <Input
                                        name="currentAddress"
                                        placeholder="Enter your address"
                                        value={formData.currentAddress}
                                        onChange={handleChange}
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel htmlFor="relation">State</FormLabel>
                                    <Select
                                        placeholder="Select state"
                                        value={formData.currentstate}
                                        name='currentstate'
                                        onChange={handleChange}
                                    >
                                        {Object.keys(districtsData)?.map((state) => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                                {formData.currentstate !== "" && (
                                    <FormControl isRequired isInvalid={formData.currentdistrict_error}>
                                        <FormLabel htmlFor="district">District</FormLabel>
                                        <Select
                                            placeholder="Select District"
                                            value={formData.currentdistrict}
                                            name="currentdistrict"
                                            onChange={handleChange}
                                        >
                                            {districtsData[formData.currentstate]?.map((district) => (
                                                <option key={district} value={district}>{district}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}

                            </SimpleGrid>
                        </>
                    )}

                    {/* Current Address options for Abroad*/}
                    {addressValue === "Abroad" && (
                        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
                            <FormControl isRequired isInvalid={formData.currentAddress_error}>
                                <FormLabel htmlFor="relation">Address</FormLabel>
                                <Input
                                    name="currentAddress"
                                    placeholder="Enter your address"
                                    value={formData.currentAddress}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl isRequired isInvalid={formData.currentcountry_error}>
                                <FormLabel htmlFor="relation">Country</FormLabel>
                                <Select
                                    placeholder="Select Country"
                                    value={formData.currentcountry}
                                    name='currentcountry'
                                    onChange={handleChange}
                                >
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Albania">Albania</option>
                                </Select>
                            </FormControl>
                            {formData.currentcountry && (
                                <FormControl isRequired isInvalid={formData.currentcountrystate_error}>
                                    <FormLabel htmlFor="state">State</FormLabel>
                                    <Select
                                        placeholder="Select State"
                                        value={formData.currentcountrystate}
                                        name="currentcountrystate"
                                        onChange={handleChange}
                                    >
                                        {countriesData[formData.currentcountry].states.map((state) => (
                                            <option key={state.name} value={state.name}>{state.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            {formData.currentcountrystate && (
                                <FormControl isRequired isInvalid={formData.currentcountrycity_error}>
                                    <FormLabel htmlFor="city">City</FormLabel>
                                    <Select
                                        placeholder="Select City"
                                        value={formData.currentcountrycity}
                                        name="currentcountrycity"
                                        onChange={handleChange}
                                    >
                                        {countriesData[formData.currentcountry].states.find((state) => state.name === formData.currentcountrystate).cities.map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </SimpleGrid>
                    )}



                    <Text fontWeight={1000} fontSize={19} align={'left'} marginTop={2}>NATIVE ADDRESS IN RAJASTHAN</Text>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                        <FormControl isRequired isInvalid={formData.district_error}>
                            <FormLabel htmlFor="district">District</FormLabel>
                            <Select
                                id="district"
                                placeholder="-- Select District --"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                            >
                                <option value="Ajmer">Ajmer</option>
                                <option value="Alwar">Alwar</option>
                                <option value="Anupgarh">Anupgarh</option>
                            </Select>
                        </FormControl>
                        {formData.district && (
                            <FormControl isRequired isInvalid={formData.tehsil_error}>
                                <FormLabel htmlFor="tehsil">Tehsil</FormLabel>
                                <Select
                                    placeholder="Select Tehsil"
                                    value={formData.tehsil}
                                    name="tehsil"
                                    onChange={handleChange}
                                >
                                    {tehsilData[formData.district]?.map((tehsil) => (
                                        <option key={tehsil} value={tehsil}>{tehsil}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        {formData.tehsil && (
                            <FormControl isRequired isInvalid={formData.village_error}>
                                <FormLabel htmlFor="village">Village</FormLabel>
                                <Input
                                    placeholder="Enter Village"
                                    value={formData.village}
                                    name="village"
                                    onChange={handleChange}
                                />
                            </FormControl>
                        )}
                    </SimpleGrid>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl isRequired isInvalid={formData.occupation_error}>
                            <FormLabel htmlFor="occupation">Occupation</FormLabel>
                            <Input
                                id="occupation"
                                placeholder="Occupation"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </SimpleGrid>
                    <Checkbox
                        name="consent"
                        isChecked={formData.consent}
                        onChange={handleChange}
                        isRequired
                        variant="outline"
                        colorScheme="green"
                        sx={{ borderColor: "black" }}
                    >
                        <Text fontWeight={600} fontSize={18} align={'left'}>  By submitting this form, I consent to Founder General Secretary of <i>MARWADI INTERNATIONAL FEDERATION (MIF)</i> for using my name and details for records of MIF and its office bearers list. I have read and understood all the terms and conditions of MIF. </Text>
                    </Checkbox>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl isRequired isInvalid={formData.name_error}>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input
                                id="name"
                                placeholder="Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </SimpleGrid>

                    <Stack direction="row" spacing={4}>
                        <Button colorScheme="blue" size="lg"
                            sx={{
                                fontSize: '1.1rem',
                                padding: '1.1rem 1.25rem',
                            }} onClick={handleSubmit}>Submit</Button>

                        <Button colorScheme="red"
                            size="lg"
                            sx={{
                                fontSize: '1.1rem',
                                padding: '1.1rem 1.25rem',
                            }} onClick={handleReset}>Reset</Button>
                    </Stack>
                </Stack>
            </Box>
        </div >
    );
};

export default MyForm;
