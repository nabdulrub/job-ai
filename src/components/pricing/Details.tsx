import React from "react"
import { Card } from "../ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Check, X } from "lucide-react"
import { PricingData } from "@/data/PricingData"
import { Button } from "../ui/button"
import StudentPlan from "./StudentPlan"
import CareerPlan from "./CareerPlan"

type DetailsProps = {
  isStudentPlan?: boolean
}

const Details = ({ isStudentPlan }: DetailsProps) => {
  return <>{isStudentPlan ? <StudentPlan /> : <CareerPlan />}</>
}

export default Details
