"use client";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [downPayment, setDownPayment] = useState("");
  const [salary, setSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [tenure, setTenure] = useState("");
  const [interest, setInterest] = useState("");
  const [error, setError] = useState(false);

  return (
    <>
      <Box maxW="400px" m="auto" p="4">
        <form>
          <FormControl id="downPayment" mb="4">
            <FormLabel htmlFor="downPayment">Down Payment Amount</FormLabel>
            <Input
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              type="number"
              placeholder="Enter down payment amount"
            />
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
          </FormControl>
          <FormControl id="downPayment" mb="4">
            <FormLabel htmlFor="downPayment">
              Tenure of loan 36 months - 60 months
            </FormLabel>
            <Input
              value={tenure}
              onChange={(e) => {
                setTenure(e.target.value)
              }}
              type="number"
              placeholder="Enter tenure of loan in month"
            />
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
          </FormControl>
          <FormControl id="downPayment" mb="4">
            <FormLabel htmlFor="downPayment">You can afford it under</FormLabel>
            <Input type="number" placeholder="Enter down payment amount" />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
}
