import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // ShadCN components

interface DashboardCardProps {
  cardName: string;
  number: number | string; // Accepts both numeric and formatted string values
  content: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ cardName, number, content }) => {
  return (
    <Card className="border border-accent hover:shadow-lg">
      <CardHeader>
        <CardTitle>{cardName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{number}</p>
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
