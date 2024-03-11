"use client";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [downPayment, setDownPayment] = useState();
  const [salary, setSalary] = useState();
  const [maxSalary, setMaxSalary] = useState();
  const [tenure, setTenure] = useState();
  const [interest, setInterest] = useState();
  const [totalInterestAmount, setTotalInterestAmount] = useState();
  const [loanAmount, setLoanAmount] = useState();
  const [affordableAmount, setAffordableAmount] = useState();
  const [error, setError] = useState(false);

  const calculateLoanAmount = (e) => {
    e.preventDefault();
    if (!downPayment) {
      setError(true);
    } else {
      setError(false);
    }
    if (!salary) {
      setError(true);
    } else {
      setError(false);
    }
    if (!maxSalary) {
      setError(true);
    } else {
      setError(false);
    }
    if (!tenure) {
      setError(true);
    } else {
      setError(false);
    }
    if (!interest) {
      setError(true);
    } else {
      setError(false);
    }
    var monthlyInterestRate = interest / 12 / 100;
    var amountWithoutInterest = Math.floor(
      (maxSalary * Math.pow(1 + monthlyInterestRate, tenure) - maxSalary) /
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure))
    );
    setLoanAmount(amountWithoutInterest);
    var totalInterestAmount = Math.floor(maxSalary * tenure);
    setTotalInterestAmount(totalInterestAmount - amountWithoutInterest);
    var payment = parseInt(downPayment);
    setAffordableAmount(payment + totalInterestAmount);
  };

  return (
    <>
      <Box maxW="400px" m="auto" p="4">
        <form onSubmit={calculateLoanAmount}>
          <FormControl id="downPayment" mb="4">
            <FormLabel htmlFor="downPayment">Down Payment Amount</FormLabel>
            <Input
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              type="number"
              placeholder="Enter down payment amount"
            />
            {error && !downPayment ? (
              <Text color={"red"}>Provide the value for above</Text>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl id="downPayment" mb="4">
            <FormLabel htmlFor="downPayment">Current Salary</FormLabel>
            <Input
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
                setMaxSalary(e.target.value / 10);
              }}
              type="number"
              placeholder="Enter your current salary"
            />
            {error && !salary ? (
              <Text color={"red"}>Provide the value for above</Text>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl id="downPayment" mb="4">
            <FormLabel htmlFor="downPayment">
              10% of your maximum salary
            </FormLabel>
            <Input
              value={maxSalary}
              onChange={(e) => {
                if (e.target.value <= salary / 10) {
                  setMaxSalary(e.target.value);
                }
              }}
              type="number"
              placeholder="Maximum of 10% of your salary"
            />
            {error && !maxSalary ? (
              <Text color={"red"}>Provide the value for above</Text>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl id="downPayment" mb="4">
            <FormLabel htmlFor="downPayment">
              Tenure of loan 36 months - 60 months
            </FormLabel>
            <Input
              value={tenure}
              onBlur={(e) => {
                if (e.target.value >= 36 && e.target.value <= 60) {
                  setTenure(e.target.value);
                } else {
                  setError(true);
                }
              }}
              type="number"
              placeholder="Enter tenure of loan in month"
            />
            {error && !tenure ? (
              <Text color={"red"}>Tenur should be in 36 month to 60 month</Text>
            ) : (
              ""
            )}
            {/* {error ? "The month should be from 36 to 60" : ""} */}
          </FormControl>
          <FormControl id="downPayment" mb="4">
            <FormLabel htmlFor="downPayment">Interest of Loan</FormLabel>
            <Input
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              type="number"
              placeholder="Enter interest of loan"
            />
            {error && !interest ? (
              <Text color={"red"}>Provide the value for above</Text>
            ) : (
              ""
            )}
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </form>
        <Flex flexDir={'column'} gap={3} pt={3}>
        {!error && !isNaN(loanAmount) && <Text>Loan Amount : {loanAmount}</Text>}
        {!error && !isNaN(totalInterestAmount) && (
          <Text>Interest on Loan Amount : {totalInterestAmount}</Text>
        )}
        {!error && !isNaN(loanAmount) && !isNaN(totalInterestAmount) && (
          <Text>
            Total Loan Amount with Interest : {loanAmount + totalInterestAmount}
          </Text>
        )}
        {!error && !isNaN(affordableAmount) && (
          <Text>Affordable Car under : {affordableAmount}</Text>
        )}
        </Flex>
      </Box>
    </>
  );
}
