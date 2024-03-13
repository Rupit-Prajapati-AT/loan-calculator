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
    }
    if (!salary) {
      setError(true);
    }
    if (!maxSalary) {
      setError(true);
    }
    if (!tenure) {
      setError(true);
    }
    if (!interest) {
      setError(true);
    }
    var monthlyInterestRate = interest / 12 / 100;
    var amountWithoutInterest = Math.floor(
      (maxSalary * Math.pow(1 + monthlyInterestRate, tenure) - maxSalary) /
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure))
    );
    setLoanAmount(amountWithoutInterest);
    var totalInterestAmount = parseInt(Math.floor(maxSalary * tenure));
    setTotalInterestAmount(totalInterestAmount - amountWithoutInterest);
  };

  return (
    <>
      <Box maxW="400px" m="auto" p="4">
        <form onSubmit={calculateLoanAmount} className="car-calculator">
          <FormControl id="downPayment" mb="4">
            <FormLabel htmlFor="downPayment">
              Enter down payment amount
            </FormLabel>
            <Input
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              type="number"
            />
            {error && !downPayment ? (
              <Text color={"red"}>Provide the value for above</Text>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl id="downPayment" mb="4">
            <FormLabel htmlFor="downPayment">
              Enter your current salary
            </FormLabel>
            <Input
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
                setMaxSalary(e.target.value / 10);
              }}
              type="number"
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
            />
            {error && !maxSalary ? (
              <Text color={"red"}>Maximum of 10% of your salary</Text>
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
              onChange={(e) => {
                setTenure(e.target.value);
              }}
              type="number"
            />
            {error && !tenure ? (
              <Text color={"red"}>Enter tenure of loan in month</Text>
            ) : (
              ""
            )}
            {(tenure && tenure < 36) || tenure > 60 ? (
              <Text color={"red"}>The month should be from 36 to 60</Text>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl id="downPayment" mb="4">
            <FormLabel htmlFor="downPayment">Enter interest of loan</FormLabel>
            <Input
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              type="number"
            />
            {error && !interest ? (
              <Text color={"red"}>Provide the value for above</Text>
            ) : (
              ""
            )}
            {(interest && interest < 0) || interest > 12 ? (
              <Text color={"red"}>The interest should be from 0 to 12</Text>
            ) : (
              ""
            )}
          </FormControl>
          <button type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
        <Flex flexDir={"column"} gap={3} pt={3}>
          {!error && loanAmount && (
            <Text color={"#fff"}>Loan Amount : {loanAmount}</Text>
          )}
          {!error && totalInterestAmount && (
            <Text color={"#fff"}>
              Interest on Loan Amount : {totalInterestAmount}
            </Text>
          )}
          {!error && loanAmount && totalInterestAmount && (
            <Text color={"#fff"}>
              Total Loan Amount with Interest :{" "}
              {loanAmount + totalInterestAmount}
            </Text>
          )}
          {!error && downPayment && (
            <Text color={"#fff"}>
              Affordable Car under :{" "}
              {loanAmount + totalInterestAmount + parseInt(downPayment)}
            </Text>
          )}
        </Flex>
      </Box>
    </>
  );
}
