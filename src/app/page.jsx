"use client";
import { FormControl, FormLabel, Input, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [downPayment, setDownPayment] = useState();
  const [salary, setSalary] = useState();
  const [maxSalary, setMaxSalary] = useState();
  const [tenure, setTenure] = useState();
  const [interest, setInterest] = useState();
  const [totalInterestAmount, setTotalInterestAmount] = useState();
  const [loanAmount, setLoanAmount] = useState();
  const [error, setError] = useState(false);
  const calculateLoanAmount = (e) => {
    e.preventDefault();
    console.log(error);
    if (error) return;
    setError(false);
    if (!downPayment || !salary || !maxSalary || !tenure || !interest) {
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
  const reset = () => {
    setDownPayment("");
    setSalary("");
    setMaxSalary("");
    setTenure("");
    setInterest("");
    setTotalInterestAmount("");
    setLoanAmount("");
    setError(false);
  };
  return (
    <>
      <Flex m="auto" p="4" gap={"20px"} alignItems={"center"}>
        <form className="car-calculator">
          <FormControl id="downPayment" mb="4">
            <FormLabel htmlFor="downPayment">
              Enter down payment amount
            </FormLabel>
            <Input
              value={downPayment}
              onChange={(e) => {
                if (e.target.value > 0) setDownPayment(e.target.value);
                else setError(true);
              }}
              type="number"
              min={0} // Add min attribute to enforce non-negative values
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
                setSalary(Math.max(0, e.target.value));
                setMaxSalary(Math.max(0, e.target.value) / 10);
              }}
              type="number"
              min={0} // Add min attribute to enforce non-negative values
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
                  setMaxSalary(Math.max(0, e.target.value));
                }
              }}
              type="number"
              min={0} // Add min attribute to enforce non-negative values
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
                setTenure(Math.max(36, e.target.value));
              }}
              type="number"
              min={36} // Add min attribute to enforce minimum value of 36
              max={60} // Add max attribute to enforce maximum value of 60
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
              type="number"
              onChange={(e) => setInterest(Math.max(0, e.target.value))}
              value={interest}
              min={0}
              max={12}
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
          <Flex gap={"20px"}>
            <button onClick={calculateLoanAmount} type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
            <button type="reset" onClick={reset} className="reset">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Reset
            </button>
          </Flex>
        </form>
        {!error && downPayment && loanAmount ? (
          <Flex
            flexDir={"column"}
            gap={3}
            pt={3}
            backgroundColor={" rgba(0, 0, 0, 0.5)"}
            borderRadius={"10px"}
            p={"30px"}
          >
            {!error && loanAmount && (
              <Text color={"#fff"}>Loan Amount : {loanAmount}</Text>
            )}
            {!error && loanAmount && (
              <Text color={"#fff"}>
                Interest on Loan Amount : {totalInterestAmount}
              </Text>
            )}
            {!error && loanAmount && (
              <Text color={"#fff"}>
                Total Loan Amount with Interest :{" "}
                {loanAmount + totalInterestAmount}
              </Text>
            )}
            {!error && downPayment && loanAmount && (
              <Text color={"#fff"}>
                Affordable Car under :{" "}
                {loanAmount + totalInterestAmount + parseInt(downPayment)}
              </Text>
            )}
          </Flex>
        ) : (
          ""
        )}
      </Flex>
    </>
  );
}
