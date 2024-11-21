"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", cone: 186, hair: 80 },
  { month: "February", cone: 305, hair: 200 },
  { month: "March", cone: 237, hair: 120 },
  { month: "April", cone: 73, hair: 190 },
  { month: "May", cone: 209, hair: 130 },
  { month: "June", cone: 214, hair: 140 },
];

const chartConfig = {
  cone: {
    label: "Cone",
    color: "hsl(var(--chart-1))",
  },
  hair: {
    label: "Hair",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function SellChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Items Selling</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="cone" fill="#729762" radius={4} />
            <Bar dataKey="hair" fill="#3E5C29" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total selling items for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
